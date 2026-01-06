#!/bin/bash
# Deployment script for Hostinger VPS
# Run this script on your VPS after initial setup

set -e

echo "🚀 Starting deployment of Sofol Hot Chocolate App..."

# Update system
echo "📦 Updating system packages..."
sudo apt update
sudo apt upgrade -y

# Install Node.js 20.x (LTS)
echo "📦 Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 globally
echo "📦 Installing PM2..."
sudo npm install -g pm2

# Install nginx
echo "📦 Installing nginx..."
sudo apt install -y nginx

# Create app directory
echo "📁 Creating app directory..."
sudo mkdir -p /var/www/sofol-chocolate
sudo chown -R $USER:$USER /var/www/sofol-chocolate

echo "✅ Server setup complete!"
echo ""
echo "Next steps:"
echo "1. Upload your app code to /var/www/sofol-chocolate"
echo "2. Run: cd /var/www/sofol-chocolate && npm install"
echo "3. Create .env.local file with your Stripe keys"
echo "4. Run: npm run build"
echo "5. Run: pm2 start npm --name 'sofol-app' -- start"
echo "6. Run: pm2 save && pm2 startup"
echo "7. Configure nginx (see nginx-config.txt)"
