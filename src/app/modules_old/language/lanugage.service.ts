import { Language } from '@prisma/client';
import prisma from '../../../db/db.config';

const createLanguageIntoDB = async (payload: Language) => {
  const result = await prisma.language.create({ data: payload });

  return result;
};

const getLanguagesFromDB = async () => {
  const result = await prisma.language.findMany();

  return result;
};

const getLanguageFromDB = async (id: string) => {
  const result = await prisma.language.findUnique({ where: { id } });

  return result;
};

const updateLanguageIntoDB = async (id: string, payload: Language) => {
  const result = await prisma.language.update({ where: { id }, data: payload });

  return result;
};

const deleteLanguageFromDB = async (id: string) => {
  const result = await prisma.language.delete({ where: { id } });

  return result;
};


export const LanguageService = {
  createLanguageIntoDB,
  getLanguagesFromDB,
  getLanguageFromDB,
  updateLanguageIntoDB,
  deleteLanguageFromDB,
};