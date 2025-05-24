# Deployment Guide for 3D Print Shop Harm Website

## Prerequisites
- SSH access to server: root@46.101.138.222
- Node.js installed on server
- PM2 installed on server
- Nginx installed on server

## Step 1: Build the application locally
```bash
npm run build
```

## Step 2: Create deployment archive
```bash
tar -czf 3dpsh-deploy.tar.gz \
  .output \
  ecosystem.config.js \
  package.json \
  package-lock.json \
  public \
  nuxt.config.ts
```

## Step 3: Upload to server
```bash
scp 3dpsh-deploy.tar.gz root@46.101.138.222:/tmp/
```
Password: #3uVbH3r0Kq!

## Step 4: SSH into server
```bash
ssh root@46.101.138.222
```
Password: #3uVbH3r0Kq!

## Step 5: Deploy on server
Run these commands on the server:

```bash
# Navigate to opt directory
cd /opt

# Create app directory
mkdir -p 3dpsh
cd 3dpsh

# Extract deployment
tar -xzf /tmp/3dpsh-deploy.tar.gz

# Install production dependencies
npm install --production

# Stop existing PM2 process if any
pm2 stop 3dpsh 2>/dev/null || true
pm2 delete 3dpsh 2>/dev/null || true

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# Clean up
rm /tmp/3dpsh-deploy.tar.gz
```

## Step 6: Configure Nginx
Create nginx configuration file:

```bash
nano /etc/nginx/sites-available/3dpsh
```

Add this configuration:
```nginx
server {
    server_name 3dps.space www.3dps.space;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml application/javascript;
    gzip_vary on;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    listen 80;
}
```

## Step 7: Enable site and reload Nginx
```bash
# Enable site
ln -s /etc/nginx/sites-available/3dpsh /etc/nginx/sites-enabled/

# Test nginx config
nginx -t

# Reload nginx
systemctl reload nginx
```

## Step 8: Setup SSL with Let's Encrypt
```bash
certbot --nginx -d 3dps.space -d www.3dps.space
```

## Step 9: Verify deployment
- Check PM2 status: `pm2 status`
- Check logs: `pm2 logs 3dpsh`
- Visit http://3dps.space

## Troubleshooting
- Check PM2 logs: `pm2 logs 3dpsh --lines 100`
- Check Nginx logs: `tail -f /var/log/nginx/error.log`
- Restart PM2: `pm2 restart 3dpsh`
- Check port 3000: `netstat -tlnp | grep 3000`