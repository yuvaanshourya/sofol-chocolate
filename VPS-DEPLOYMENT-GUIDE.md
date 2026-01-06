# Hostinger VPS Deployment Guide - Sofol Hot Chocolate App

## Step 1: VPS Setup on Hostinger

**Choose:**
- **OS:** Ubuntu 22.04 LTS (or Ubuntu 24.04 LTS)
- **Control Panel:** None (select plain Ubuntu)
- **Application:** None needed

Click "Continue" and wait for VPS provisioning.

---

## Step 2: Connect to Your VPS

Once provisioned, you'll get:
- IP Address
- Root password
- SSH access

Connect via terminal:
```bash
ssh root@YOUR_VPS_IP
```

---

## Step 3: Initial Server Setup

Run these commands on your VPS:

```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 20.x LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Verify installation
node -v  # Should show v20.x.x
npm -v

# Install PM2 (process manager)
npm install -g pm2

# Install nginx (web server)
apt install -y nginx

# Install git (to clone your code)
apt install -y git
```

---

## Step 4: Upload Your Application

**Using Git (Recommended)**
```bash
# Create app directory
mkdir -p /var/www/sofol-chocolate
cd /var/www/sofol-chocolate

# Clone your repository
git clone https://github.com/yuvaanshourya/sofol-chocolate.git .
```

---

## Step 5: Configure Environment Variables

On your VPS:
```bash
cd /var/www/sofol-chocolate

# Create environment file
nano .env.local
```

Add these variables:
```env
# Stripe Keys (get from stripe.com dashboard)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here

# App URL (replace with your domain)
NEXT_PUBLIC_APP_URL=http://your-domain.com
```

Save and exit (Ctrl+X, then Y, then Enter)

---

## Step 6: Build and Start Application

```bash
cd /var/www/sofol-chocolate

# Install dependencies
npm install

# Build the application
npm run build

# Start with PM2
pm2 start npm --name "sofol-app" -- start

# Save PM2 configuration
pm2 save

# Set PM2 to start on boot
pm2 startup
# Copy and run the command that PM2 outputs

# Check if app is running
pm2 status
pm2 logs sofol-app
```

Your app should now be running on http://localhost:3000

---

## Step 7: Configure Nginx (Reverse Proxy)

```bash
# Create nginx configuration
nano /etc/nginx/sites-available/sofol-chocolate
```

Paste this configuration (replace YOUR_DOMAIN with your actual domain):
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

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
}
```

Enable the site:
```bash
# Create symbolic link
ln -s /etc/nginx/sites-available/sofol-chocolate /etc/nginx/sites-enabled/

# Test nginx configuration
nginx -t

# Restart nginx
systemctl restart nginx
```

---

## Step 8: Configure Firewall

```bash
# Allow HTTP and HTTPS
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 22/tcp  # SSH

# Enable firewall
ufw enable
```

---

## Step 9: Point Domain to VPS

In Hostinger control panel:
1. Go to your domain's DNS settings
2. Add/Edit A record:
   - Type: A
   - Name: @ (for root domain)
   - Points to: YOUR_VPS_IP
3. Add A record for www:
   - Type: A
   - Name: www
   - Points to: YOUR_VPS_IP

Wait 5-30 minutes for DNS propagation.

---

## Step 10: Install SSL Certificate (HTTPS)

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get SSL certificate
certbot --nginx -d your-domain.com -d www.your-domain.com

# Follow prompts, enter your email
# Choose option to redirect HTTP to HTTPS
```

Certbot will auto-renew certificates.

---

## Useful PM2 Commands

```bash
pm2 list              # View all apps
pm2 logs sofol-app    # View logs
pm2 restart sofol-app # Restart app
pm2 stop sofol-app    # Stop app
pm2 delete sofol-app  # Remove app
pm2 monit             # Monitor resources
```

---

## Updating Your App

```bash
cd /var/www/sofol-chocolate

# Pull latest code
git pull

# Reinstall dependencies if package.json changed
npm install

# Rebuild
npm run build

# Restart app
pm2 restart sofol-app
```

---

## Troubleshooting

**App won't start:**
```bash
pm2 logs sofol-app  # Check logs
pm2 restart sofol-app
```

**Port 3000 already in use:**
```bash
lsof -i :3000
kill -9 PID_NUMBER
pm2 restart sofol-app
```

**Nginx issues:**
```bash
nginx -t  # Test configuration
systemctl status nginx
journalctl -xe
```

**Can't access site:**
- Check firewall: `ufw status`
- Check nginx: `systemctl status nginx`
- Check PM2: `pm2 status`
- Check DNS: Wait 30 min after DNS changes

---

## Security Recommendations

1. **Change root password** after first login
2. **Create non-root user** for app management
3. **Set up SSH keys** instead of password auth
4. **Enable automatic security updates:**
   ```bash
   apt install unattended-upgrades
   dpkg-reconfigure -plow unattended-upgrades
   ```
5. **Regular backups** of /var/www/sofol-chocolate

---

## Production Environment Variables

Don't forget to update `.env.local` with:
- Production Stripe keys (replace `pk_test_` with `pk_live_`)
- Actual domain URL
- Any other production configs

---

Your app should now be live at https://your-domain.com! 🎉
