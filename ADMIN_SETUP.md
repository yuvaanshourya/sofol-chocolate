# Admin Dashboard Setup Guide

## Overview
The admin dashboard allows store owners to manage hot chocolate orders in real-time.

## Required Environment Variables

Add these to your `.env.local` file:

```bash
# MongoDB Connection String
# Get this from MongoDB Atlas after creating a free cluster
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sofol-chocolate?retryWrites=true&w=majority

# Admin Dashboard Password
# Change this to a secure password
NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-password-here

# Tax Rate (already exists)
NEXT_PUBLIC_TAX_RATE=0.0725

# Stripe Keys (already exists)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-key
STRIPE_SECRET_KEY=your-key
```

## MongoDB Atlas Setup (Free Tier)

1. **Create Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free account
   - Create a new project (e.g., "Sofol Chocolate")

2. **Create Cluster**
   - Choose "M0 Free" tier
   - Select region closest to your VPS
   - Click "Create Cluster"

3. **Setup Database Access**
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create username and strong password
   - Set role to "Read and write to any database"
   - Click "Add User"

4. **Setup Network Access**
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Go back to "Database" (Clusters)
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `sofol-chocolate`

## Admin Dashboard Access

**URL**: `https://sofoleats.com/hot-chocolate-admin`

**Default Password**: `admin123` (change in production!)

## Features

### Order Management
- **View Active Orders**: All orders with status "waiting" or "ready"
- **Auto-refresh**: Updates every 5 seconds automatically
- **Status Updates**: 
  - Waiting → Ready → Picked Up
  - Click buttons to update order status

### Order Information Displayed
- Order number (e.g., HC-001)
- Customer name (from checkout)
- Order details (size, milk, toppings, etc.)
- Total amount
- Payment method
- Time since order placed

### Status Workflow
1. **🟡 Waiting** - Customer just ordered, being prepared
2. **🟢 Ready** - Order is ready for customer pickup
3. **⚪ Picked Up** - Order completed and archived

## Testing Locally

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` with MongoDB URI and admin password

3. Run development server:
```bash
npm run dev
```

4. Access admin at: `http://localhost:3000/admin`

5. Create test order by going through checkout flow

## Deployment to VPS

1. **Add Environment Variables on VPS**:
```bash
# SSH into your VPS
ssh root@your-vps-ip

# Navigate to app directory
cd /var/www/sofol-chocolate

# Edit .env.local file
nano .env.local

# Add the MONGODB_URI and NEXT_PUBLIC_ADMIN_PASSWORD
# Save with Ctrl+X, then Y, then Enter
```

2. **Pull Latest Code**:
```bash
git pull origin main
npm install
npm run build
pm2 restart sofol-app
```

3. **Update Nginx** (if needed):
The admin route `/admin` is automatically served by Next.js at `/hot-chocolate-admin`

## Security Notes

- Change the admin password from default
- Use a strong MongoDB password
- Keep environment variables secure
- Consider adding rate limiting for admin login
- HTTPS is required for production

## Troubleshooting

### Orders not appearing in admin
- Check MongoDB connection string is correct
- Verify database user has write permissions
- Check browser console for errors
- Ensure orders are being created at checkout

### Can't login to admin
- Verify `NEXT_PUBLIC_ADMIN_PASSWORD` is set
- Check localStorage is not cleared
- Try clearing browser cache

### Auto-refresh not working
- Check browser console for API errors
- Verify `/api/orders/active` endpoint is accessible
- Check if ad-blockers are interfering

## API Endpoints

- `POST /api/orders/create` - Create new order
- `GET /api/orders/active` - Get waiting/ready orders
- `PATCH /api/orders/:id/status` - Update order status

## Future Enhancements

- Sound notifications for new orders
- Order history and analytics
- Export orders to CSV
- Customer text notifications when ready
- Multiple admin users
- Order completion time tracking
