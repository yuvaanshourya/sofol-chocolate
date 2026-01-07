# Admin Dashboard Architecture

## Overview
Admin dashboard for managing hot chocolate orders in real-time at `sofoleats.com/hot-chocolate-admin`

## Database Schema (MongoDB)

### Orders Collection
```typescript
{
  _id: ObjectId,
  orderNumber: string,           // "HC-001", "HC-002", etc.
  customerName: string,           // From checkout
  items: [
    {
      size: string,
      milkType: string,
      sweetness: string,
      toppings: string[],
      flavorAddons: string[],
      quantity: number,
      price: number
    }
  ],
  totalAmount: number,
  paymentMethod: 'zelle' | 'applepay',
  status: 'waiting' | 'ready' | 'pickedup',
  createdAt: Date,
  updatedAt: Date,
  readyAt?: Date,               // When marked ready
  pickedUpAt?: Date,            // When marked picked up
}
```

## Tech Stack
- **Database**: MongoDB Atlas (free tier)
- **ORM**: Mongoose
- **Real-time**: Auto-refresh every 5 seconds
- **Authentication**: Simple password protection for admin route

## API Endpoints

### POST /api/orders/create
Create new order after payment confirmation
- Request: { customerName, items, totalAmount, paymentMethod }
- Response: { orderId, orderNumber }

### GET /api/orders/active
Get all active orders (waiting + ready)
- Response: { orders: Order[] }

### GET /api/orders/all
Get all orders with pagination
- Query: { status?, limit, skip }
- Response: { orders: Order[], total: number }

### PATCH /api/orders/:id/status
Update order status
- Request: { status: 'waiting' | 'ready' | 'pickedup' }
- Response: { order: Order }

## Admin Dashboard Features

### Main View
- **Active Orders Grid** - Cards showing waiting and ready orders
- **Status Indicators** - Color-coded badges
- **Customer Names** - Large, prominent display
- **Order Details** - Expandable to see customization details
- **Quick Actions** - Buttons to change status

### Order Card Design
```
┌─────────────────────────────────┐
│ #HC-042          🟡 WAITING     │
│                                  │
│ 👤 JOHN DOE                     │
│                                  │
│ 2x Medium Hot Chocolate          │
│ • Oat Milk • Medium Sweet       │
│ • Marshmallows                   │
│                                  │
│ $15.50 • Zelle • 2 min ago      │
│                                  │
│ [Mark as Ready]                  │
└─────────────────────────────────┘
```

### Status Colors
- 🟡 **Waiting** - Yellow (order received, being prepared)
- 🟢 **Ready** - Green (ready for pickup)
- ⚪ **Picked Up** - Gray (completed, archived)

### Auto-refresh
- Polls API every 5 seconds for new orders
- Sound notification for new orders
- Flash animation on status changes

## File Structure
```
app/
  admin/
    page.tsx              # Admin dashboard main page
    layout.tsx            # Admin-specific layout
  api/
    orders/
      create/
        route.ts          # Create order endpoint
      active/
        route.ts          # Get active orders
      [id]/
        status/
          route.ts        # Update order status
lib/
  mongodb.ts              # MongoDB connection
  models/
    Order.ts              # Mongoose Order model
components/
  admin/
    OrderCard.tsx         # Individual order display card
    OrdersGrid.tsx        # Grid layout for orders
    AdminAuth.tsx         # Simple password protection
```

## Deployment
- Same VPS, same Next.js app
- Route: `/admin` (protected)
- No separate deployment needed
- Nginx serves at `/hot-chocolate-admin` -> app `/admin`

## Security
- Environment variable for admin password
- Simple password prompt on admin page
- Session stored in localStorage
- HTTPS required

## Next Steps
1. Setup MongoDB Atlas account
2. Install mongoose dependency
3. Create database connection utility
4. Build Order model
5. Create API endpoints
6. Build admin UI components
7. Add real-time order creation to checkout
8. Test end-to-end flow
9. Deploy

## Environment Variables Needed
```
MONGODB_URI=mongodb+srv://...
ADMIN_PASSWORD=your-secure-password
```
