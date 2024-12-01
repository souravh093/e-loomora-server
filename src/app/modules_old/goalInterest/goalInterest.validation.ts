import { z } from 'zod';

const goalInterestValidationSchema = z.object({
  body: z.object({
    goal: z.string({ required_error: 'Goal is required' }),
  }),
});

export default goalInterestValidationSchema;
