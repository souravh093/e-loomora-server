import { z } from 'zod';

const createProjectValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    clientName: z.string({ required_error: 'Client name is required' }),
    location: z.string({ required_error: 'Location is required' }),
    locationUrl: z.string({ required_error: 'Location URL is required' }),
    firstDescription: z.string({
      required_error: 'First description is required',
    }),
    secondDescription: z.string({
      required_error: 'Second description is required',
    }),
    thirdDescription: z.string({
      required_error: 'Third description is required',
    }),
    categoryId: z.string({ required_error: 'Category ID is required' }),
  }),
});

const updateProjectValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    clientName: z.string().optional(),
    location: z.string().optional(),
    locationUrl: z.string().optional(),
    firstDescription: z.string().optional(),
    secondDescription: z.string().optional(),
    thirdDescription: z.string().optional(),
  }),
});

export const ProjectValidation = {
  createProjectValidationSchema,
  updateProjectValidationSchema,
};
