import { z } from 'zod';

const createExperienceValidation = z.object({
  body: z.object({
    projectName: z.string({ required_error: 'Project Name is required' }),
    companyName: z.string({ required_error: 'Company Name is required' }),
    location: z.string({ required_error: 'Location is required' }),
    startDate: z.date({ required_error: 'Start Date is required' }),
    endDate: z.date({ required_error: 'End Date is required' }),
    description: z.string({ required_error: 'Description is required' }),
  }),
});

const updateExperienceValidation = z.object({
  body: z.object({
    projectName: z.string().optional(),
    companyName: z.string().optional(),
    location: z.string().optional(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    description: z.string().optional(),
  }),
});

export const ExperienceValidations = {
  createExperienceValidation,
  updateExperienceValidation,
};
