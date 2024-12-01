import { z } from 'zod';

const metaDataValidation = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }).optional(),
    description: z
      .string({ required_error: 'Description is required' })
      .optional(),
  }),
});

export default metaDataValidation;