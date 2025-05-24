#!/bin/bash

echo "Setting up SSH key authentication on your VPS..."
echo "================================================"
echo ""
echo "This script will add your SSH public key to the server."
echo "You'll need to enter your password once."
echo ""

# Your public key
PUBLIC_KEY="ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQD36WZtZG8LNdqMb51ldprHsNn2vKVymNHEt8zdQqsZnIPMa0wyJatMlAoNc9I9XLZTM/SbLS1htsp7jhTGi8yhpEAAz734kZSN2ZgicOpunUlwHhH48fMfXvMAH0oBGnMYjtOsNhzB4AM45nb2OGuM6oS0aidiq+3OM6zAIbh7uu83lOOVYet5EfE1KL14ttmZdo/z+JV04nbW7gRs/SAr9V/6EoUrAAlzs8cGqifYSyO/RtCvgGn5Ucu0hZ7sHLrElpKl086Qxw3i8zVEUkG8ZuyKdWXDnDQAAv89EI3mJzAfzg9hh0KqKy5RnOyoApm5X0O3mYMXZXm3Gf+FltuCSQqtTLQGsRwhCXOGymqKvirJYKxVOjDnEbZ2R9zLu7lInJdrJNyVjiXA16cq6zsQoJZyid7wesAd55SrN87+Z9IPg2f6BI2Jti8jGUvmAEf3kPhFrzrn1amr5rFUgeo54Jq3TFAUS6P5KHCDoeLqnQzUrg/N92tDwQ6eTqchtPBSotrdTwr5UKCdZfwiKdCtTzdW2oDvM5sBj8A25rsrpMdDsULoZppYCtfcRzjipKIWZNeZZ2fL5v8BQNueCJtCL3Tsyx+e6+pViEAaZS1XhFdRQxAwLMl2vC2ylmB0sv7v3KeecmsqAuDMam07NEt9FnaXmE+mjGt7oiY1qblFkQ== lasse.harm@di-unternehmer.com"

# Server details
SERVER="root@46.101.138.222"

echo "Adding your SSH key to the server..."
echo "When prompted, enter your password: #3uVbH3r0Kq!"
echo ""

# Use ssh to add the key
ssh $SERVER "mkdir -p ~/.ssh && chmod 700 ~/.ssh && echo '$PUBLIC_KEY' >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys && echo 'SSH key added successfully!'"

echo ""
echo "Testing passwordless connection..."
ssh -o PasswordAuthentication=no $SERVER "echo 'Success! Passwordless SSH is now configured.'" 2>/dev/null

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SSH key authentication is now set up!"
    echo "You can now deploy without entering a password."
else
    echo ""
    echo "⚠️  There might be an issue. Try connecting manually:"
    echo "ssh $SERVER"
fi