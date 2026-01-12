import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOrderItem {
  size: string;
  milkType: string;
  sweetness: string;
  toppings: string[];
  flavorAddons: string[];
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  orderNumber: string;
  customerName: string;
  items: IOrderItem[];
  totalAmount: number;
  paymentMethod: 'zelle' | 'applepay';
  status: 'waiting' | 'ready' | 'pickedup';
  createdAt: Date;
  updatedAt: Date;
  readyAt?: Date;
  pickedUpAt?: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  size: { type: String, required: true },
  milkType: { type: String, required: true },
  sweetness: { type: String, required: true },
  toppings: [{ type: String }],
  flavorAddons: [{ type: String }],
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: { type: String, unique: true },
    customerName: { type: String, required: true },
    items: [OrderItemSchema],
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['zelle', 'applepay'], required: true },
    status: { type: String, enum: ['waiting', 'ready', 'pickedup'], default: 'waiting' },
    readyAt: { type: Date },
    pickedUpAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

// Generate order number before validation
OrderSchema.pre('validate', async function () {
  if (!this.orderNumber) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `HC-${String(count + 1).padStart(3, '0')}`;
  }
});

// Update timestamps when status changes
OrderSchema.pre('save', function () {
  if (this.isModified('status')) {
    if (this.status === 'ready' && !this.readyAt) {
      this.readyAt = new Date();
    } else if (this.status === 'pickedup' && !this.pickedUpAt) {
      this.pickedUpAt = new Date();
    }
  }
});

const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
