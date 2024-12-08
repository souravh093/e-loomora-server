export type TOrder = {
  userId: string;
  shopId: string;
  totalAmount: number;
  orderItem: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  shippingAddress: {
    userId: string;
    address: string;
    city: string;
    state: string;
    phone: string;
    country: string;
    zip: string;
  };
};
