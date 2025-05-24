#!/bin/bash

# Check if sshpass is installed
if ! command -v sshpass &> /dev/null; then
    echo "sshpass is not installed. Install it with:"
    echo "brew install sshpass"
    echo "Note: You may need to install from source on macOS due to security restrictions"
    exit 1
fi

# Configuration
SERVER_IP="46.101.138.222"
SERVER_USER="root"
SERVER_PASS="#3uVbH3r0Kq!"
APP_NAME="3dpsh"
APP_DIR="/opt/3dpsh"

echo "🚀 Starting deployment process..."

# Build the application
echo "📦 Building Nuxt application..."
npm run build

# Create deployment archive
echo "📦 Creating deployment archive..."
tar -czf 3dpsh-deploy.tar.gz \
  .output \
  ecosystem.config.js \
  package.json \
  package-lock.json \
  public \
  nuxt.config.ts

# Upload to server
echo "📤 Uploading to server..."
sshpass -p "$SERVER_PASS" scp -o StrictHostKeyChecking=no 3dpsh-deploy.tar.gz $SERVER_USER@$SERVER_IP:/tmp/

# Execute deployment on server
echo "🔧 Executing deployment on server..."
sshpass -p "$SERVER_PASS" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP << ENDSSH
  cd /opt
  mkdir -p $APP_NAME
  cd $APP_NAME
  
  if [ -d ".output" ]; then
    echo "📦 Backing up current deployment..."
    mv .output .output.backup.\$(date +%Y%m%d-%H%M%S)
  fi
  
  echo "📂 Extracting new deployment..."
  tar -xzf /tmp/3dpsh-deploy.tar.gz
  
  echo "📥 Installing production dependencies..."
  npm install --production
  
  pm2 stop $APP_NAME 2>/dev/null || true
  pm2 delete $APP_NAME 2>/dev/null || true
  
  echo "🚀 Starting application with PM2..."
  pm2 start ecosystem.config.js
  pm2 save
  
  rm /tmp/3dpsh-deploy.tar.gz
  
  echo "✅ Deployment completed!"
ENDSSH

# Clean up
rm 3dpsh-deploy.tar.gz

echo "✅ Deployment process completed!"