import { z } from 'zod';

const createOrderValidation = z.object({
  body: z.object({
    userId: z.string({ required_error: 'User Id is required' }),
    shopId: z.string({ required_error: 'Shop Id is required' }),
    totalAmount: z.number({ required_error: 'Total Amount is required' }),
    orderItem: z.array(
      z.object({
        productId: z.string({ required_error: 'Product Id is required' }),
        quantity: z.number({ required_error: 'Quantity is required' }),
        price: z.number({ required_error: 'Price is required' }),
      }),
    ),
    shippingAddress: z.object({
      userId: z.string({ required_error: 'User Id is required' }),
      address: z.string({ required_error: 'Address is required' }),
      city: z.string({ required_error: 'City is required' }),
      state: z.string({ required_error: 'State is required' }),
      phone: z.string({ required_error: 'Phone is required' }),
      country: z.string({ required_error: 'Country is required' }),
      zip: z.string({ required_error: 'Zip is required' }),
    }),
  }),
});

export const OrderValidations = {
  createOrderValidation,
};
