import { z } from 'zod';

export const personalInfoSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  fatherName: z.string().min(2),
  phone: z.string().min(10, 'Занадто короткий номер').max(15, 'Занадто довгий номер').regex(/^\d+$/, 'Номер має містити лише цифри'),
  email: z.string().email(),
  isGift: z.boolean(),
});

export const deliveryInfoSchema = z.object({
  city: z.string().min(2).max(15),
  method: z.string(),
});

export const paymentInfoSchema = z.object({
  method: z.string(),
  cardType: z.string().optional(),
  cardData: z
    .object({
      number: z.string().optional().or(z.literal('')), 
      expiry: z.string().optional().or(z.literal('')),
      cvv: z.string().optional().or(z.literal('')),
    })
    .optional(),
}).refine(() => true);

export const checkoutSchema = z.object({
  personalInfo: personalInfoSchema,
  deliveryInfo: deliveryInfoSchema,
  paymentInfo: paymentInfoSchema,
});
