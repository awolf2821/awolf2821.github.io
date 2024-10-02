# Encryption Activity
## In this file, use Markdown to answer these prompts:

##  What is the difference between symmetric and asymmetric encryption?

Symmetric encryption uses a pre-shared code that is the same for both\
the sender and the recipient, this is why it is called symmetric Encryption\
A good example of this is a Ceasar cipher, which shifts the letters in the\
message by a predetermined amount. Without the original shift, you cannot\
decode the message. However, it is extremely easy to automate this process\
and decode the message.Aasymmetric encyption uses unuiqe mathematical\
properties that ensure a message encoded using the public key on your computer\
cannot be decoded by that same public key. a related private key is required\
to decode the message. These keys are NOT the same, which is why it is called
Asymmetric Encryption. The private key is stored locally on the computer and NEVER\
on the internet.

## Explain the steps of the encryption and decryption process.

The sending computer encrypts the packet using the public key for\
the recipient computer. The packet is then sent over the internet, where\
it can be seen in it's encrypted form by every stop along the way,\
However, it cannot be decrypted by any of these computers, because they\
do not have the private key required to decrypt the message properly\
one the packet arrives at the destination, the computer can decrypt\
the contents using the locally stored private key offline\
and the original message is restored\
 
## Why is it important that you never share your secret key?

The private key is the ONE key that can decrypt messages sent to you. it should\
only stay locally on your computer. if it is publicly available, any computer along\
the route could decrypt the contents, and load them. this is especially dangerous if\
transmitting sensitive information over the internet, such as credit card numbers,\
etc, becuase it could be easily read by other computers on the network. making identity\
theft extremely easy. Most people would likely not know if there was an extra\
point between them and the website they were looking at. This is why the private key should\
NEVER be shared.
