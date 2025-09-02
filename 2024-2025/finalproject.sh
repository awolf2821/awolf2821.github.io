#!/bin/bash
# This script sets up the environment for the project by installing necessary dependencies.
HOMEBREWPATH = $HOME/homebrew
QEMUPATH = $HOME/qemu

# Check if Homebrew is installed/Install Homebrew
if [ -d "$HOMEBREWPATH" ]; then
    echo "Homebrew is already installed at $HOMEBREWPATH."
else
    echo "Homebrew is not installed. Attempting to install homebrew..."
    mkdir homebrew && curl -L https://github.com/Homebrew/brew/tarball/master | tar xz --strip 1 -C homebrew
    echo "Homebrew was installed successfully at $HOMEBREWPATH."
    echo "Adding homebrew to PATH..."
    export PATH="$HOMEBREWPATH/bin:$PATH"
fi

# Check if QEMU is installed/Install QEMU
if [-d "$QEMUPATH" ]; then
    echo "QEMU is already installed at $QEMUPATH."
else
    echo "QEMU is not installed. Installing QEMU Dependencies..."
    brew install python pkg-config glib gawk libffi gettext pixman
    echo "Dependencies for QEMU were installed successfully. installing QEMU..."
    git clone https://gitlab.com/qemu-project/qemu.git
    cd qemu
    ./configure
    make
    echo "QEMU was installed and built successfully at $QEMUPATH."
    echo "Adding QEMU to PATH..."
    export PATH="$QEMUPATH:$PATH"
fi

# Prompt user to set up a machine
read -p "Would you like to setup a machine now? (y/n): " user_input
if [[ "$user_input" == "y" || "$user_input" == "Y" ]]; then
    echo "Setting up the machine..."
    read -p "Enter the name for the virtual machine: " vm_name
    mkdir -p "$HOME/$vm_name"

    echo "Virtual machine directory created at $HOME/$vm_name."
    read -p "Enter the amount of RAM for the virtual machine (in MB): " vm_ram
    read -p "Enter the number of CPU cores for the virtual machine: " vm_cpus
    read -p "Enter the size of the hard disk for the virtual machine (GB): " vm_disk_size
    echo "Creating hard disk image for $vm_name with size $vm_disk_size GB..."
    qemu-img create -f qcow2 "$HOME/$vm_name/$vm_name.qcow2" "${vm_disk_size}G"
    echo "Hard disk image created successfully."
    echo "Creating Start and Stop scripts for the virtual machine..."
    cd "$HOME/$vm_name"
    echo "#!/bin/bash
    qemu-system-x86_64 \
        -enable-kvm \
        -cpu host \
        -m "$vm_ram" \
        -smp cpus="$vm_cpus" \
        -drive file="$HOME/$vm_name/$vm_name.qcow2",format=qcow2 \
        -vga virtio \
        -display gtk" > start.sh
    echo "#!/bin/bash
    pkill -f qemu-system-x86_64" > stop.sh
    chmod +x start.sh stop.sh
    echo "Start and Stop scripts created successfully."
    echo "Machine setup completed successfully."
    read -p "Machine setup completed. Would you like to continue with setup and start the VM? (y/n): " continue_setup
    if [[ "$continue_setup" == "y" || "$continue_setup" == "Y" ]]; then
        echo "Continuing with setup..."
        echo "Please provide a valid ISO file path to boot the VM."
        read -p "Enter the path to the ISO file: " iso_path
        if [[ -f "$iso_path" ]]; then
            echo "Starting the virtual machine with ISO: $iso_path"
            qemu-system-x86_64 \
                -enable-kvm \
                -cpu host \
                -m "$vm_ram" \
                -smp cpus="$vm_cpus" \
                -drive file="$HOME/$vm_name/$vm_name.qcow2",format=qcow2 \
                -cdrom "$iso_path" \
                -vga virtio \
                -display gtk
        else
            echo "Invalid ISO file path. Please check the path and try again."
        fi
    else
        echo "Setup aborted by user."
    fi
elif [[ "$user_input" == "n" || "$user_input" == "N" ]]; then
    echo "Machine setup skipped. You can set up a machine at any time by using setup.sh."
else
    echo "Invalid input. Please enter 'y' or 'n'."
fi

echo "Setup completed successfully. You can now use QEMU to run virtual machines."
echo "Restart the terminal or run 'source setup.sh' to apply the changes to your PATH."