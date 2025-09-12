#!/bin/bash

echo "Setting up SSH key authentication for deployment..."

# Generate SSH key if it doesn't exist
if [ ! -f ~/.ssh/id_rsa ]; then
    echo "Generating SSH key..."
    ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa -N ""
fi

echo ""
echo "Copy this public key to your server:"
echo "========================================="
cat ~/.ssh/id_rsa.pub
echo "========================================="
echo ""
echo "To add it to your server, run this command and enter your password when prompted:"
echo "ssh-copy-id root@46.101.138.222"
echo ""
echo "Or manually add it by:"
echo "1. SSH into your server: ssh root@46.101.138.222"
echo "2. Run: mkdir -p ~/.ssh && chmod 700 ~/.ssh"
echo "3. Add the key above to: ~/.ssh/authorized_keys"
echo "4. Run: chmod 600 ~/.ssh/authorized_keys"