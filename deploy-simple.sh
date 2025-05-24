#!/bin/bash

# Simple deployment script that uses SSH key authentication

SERVER="root@46.101.138.222"
APP_NAME="3dpsh"
APP_DIR="/opt/3dpsh"

echo "🚀 Starting deployment to $SERVER..."

# Build the application
echo "📦 Building Nuxt application..."
npm run build

# Create deployment archive
echo "📦 Creating deployment archive..."
tar -czf deploy.tar.gz .output ecosystem.config.js package.json package-lock.json public nuxt.config.ts

# Upload to server
echo "📤 Uploading to server..."
scp deploy.tar.gz $SERVER:/tmp/

# Deploy on server
echo "🔧 Deploying on server..."
ssh $SERVER << 'ENDSSH'
  cd /opt
  mkdir -p 3dpsh
  cd 3dpsh
  
  # Backup if exists
  [ -d ".output" ] && mv .output .output.backup.$(date +%Y%m%d-%H%M%S)
  
  # Extract
  tar -xzf /tmp/deploy.tar.gz
  
  # Install dependencies
  npm install --production
  
  # Restart with PM2
  pm2 stop 3dpsh 2>/dev/null || true
  pm2 delete 3dpsh 2>/dev/null || true
  pm2 start ecosystem.config.js
  pm2 save
  
  # Cleanup
  rm /tmp/deploy.tar.gz
  
  echo "✅ Deployment complete!"
ENDSSH

# Local cleanup
rm deploy.tar.gz

echo "✅ Deployment finished! Check: http://3dps.space"