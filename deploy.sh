#!/bin/bash

# Deployment script for 3D Print Shop Harm website
# This script builds the Nuxt app locally and deploys to VPS

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
scp 3dpsh-deploy.tar.gz root@46.101.138.222:/tmp/

# Execute deployment on server
echo "🔧 Executing deployment on server..."
ssh root@46.101.138.222 << 'ENDSSH'
  # Navigate to opt directory
  cd /opt
  
  # Create app directory if it doesn't exist
  mkdir -p 3dpsh
  cd 3dpsh
  
  # Backup current deployment if exists
  if [ -d ".output" ]; then
    echo "📦 Backing up current deployment..."
    mv .output .output.backup.$(date +%Y%m%d-%H%M%S)
  fi
  
  # Extract new deployment
  echo "📂 Extracting new deployment..."
  tar -xzf /tmp/3dpsh-deploy.tar.gz
  
  # Install dependencies
  echo "📥 Installing production dependencies..."
  npm install --production
  
  # Stop current PM2 process if running
  pm2 stop 3dpsh 2>/dev/null || true
  pm2 delete 3dpsh 2>/dev/null || true
  
  # Start application with PM2
  echo "🚀 Starting application with PM2..."
  pm2 start ecosystem.config.js
  pm2 save
  
  # Clean up
  rm /tmp/3dpsh-deploy.tar.gz
  
  echo "✅ Deployment completed on server!"
ENDSSH

# Clean up local archive
rm 3dpsh-deploy.tar.gz

echo "✅ Deployment process completed!"
echo "📝 Don't forget to configure Nginx for the domain!"