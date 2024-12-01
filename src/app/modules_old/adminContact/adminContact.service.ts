import { ContactInfo } from '@prisma/client';
import prisma from '../../../db/db.config';

const createAdminContactIntoDB = async (payload: ContactInfo) => {
  const findAdminContact = await prisma.contactInfo.findFirst();

  let result;

  if (!findAdminContact) {
    result = await prisma.contactInfo.create({
      data: payload,
    });
  } else {
    result = await prisma.contactInfo.update({
      where: {
        id: findAdminContact.id,
      },
      data: payload,
    });
  }

  return {
    data: result,
    message: findAdminContact
      ? 'Admin contact updated successfully'
      : 'Admin contact created successfully',
  };
};

const getAdminContactFromDB = async () => {
  const result = await prisma.contactInfo.findFirst();

  return result;
};

export const AdminContactServices = {
  createAdminContactIntoDB,
  getAdminContactFromDB,
};
