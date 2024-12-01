import { Prisma, Project } from '@prisma/client';
import prisma from '../../../db/db.config';
import fs from 'fs';
import { getImagePathToUnlink } from '../../utils/getFilePathToUnlink';
import AppError from '../../errors/AppError';
import { buildPrismaQuery } from '../../builder/prismaBuilderQuery';

const createProjectIntoDB = async (payload: Project, images: string[]) => {
  const result = await prisma.$transaction(async (prisma) => {
    const project = await prisma.project.create({
      data: {
        name: payload.name,
        clientName: payload.clientName,
        location: payload.location,
        locationUrl: payload.locationUrl,
        firstDescription: payload.firstDescription,
        secondDescription: payload.secondDescription,
        thirdDescription: payload.thirdDescription,
        firstImage: payload.firstImage,
        secondImage: payload.secondImage,
        thirdImage: payload.thirdImage,
        categoryId: payload.categoryId,
        ProjectImages: {
          create: images.map((image) => ({
            image: image,
          })),
        },
      },
      include: {
        ProjectImages: true,
      },
    });

    return project;
  });

  return result;
};

const updateProjectIntoDB = async (id: string, payload: Project) => {
  const existingProject = await prisma.project.findUnique({
    where: { id },
  });

  if (!existingProject) {
    throw new AppError(404, 'Project not found');
  }

  const result = await prisma.project.update({
    where: {
      id: id,
    },
    data: payload,
  });

  if (existingProject && payload.firstImage) {
    const imageToUnlink = getImagePathToUnlink(existingProject.firstImage);
    if (fs.existsSync(imageToUnlink)) {
      fs.unlinkSync(imageToUnlink);
    }
  }

  if (existingProject && payload.secondImage) {
    const imageToUnlink = getImagePathToUnlink(existingProject.secondImage);
    if (fs.existsSync(imageToUnlink)) {
      fs.unlinkSync(imageToUnlink);
    }
  }

  if (existingProject && payload.thirdImage) {
    const imageToUnlink = getImagePathToUnlink(existingProject.thirdImage);
    if (fs.existsSync(imageToUnlink)) {
      fs.unlinkSync(imageToUnlink);
    }
  }

  return result;
};

const getProjectsFromDB = async (query: any) => {
  const projectQuery = buildPrismaQuery<
    Prisma.ProjectWhereInput,
    Prisma.ProjectOrderByWithRelationInput
  >({
    searchFields: ['name', 'clientName', 'location'],
    searchQuery: query.searchQuery,
    filter: query.filter,
    orderBy: query.orderBy ? JSON.parse(query.orderBy) : {},
    page: query.page,
    pageSize: query.pageSize,
  });

  const totalItems = await prisma.project.count({
    where: projectQuery.where,
  });

  const totalPages = Math.ceil(totalItems / projectQuery.take);
  const currentPage = Number(query.page || 1);

  const result = await prisma.project.findMany({
    ...projectQuery,
    include: {
      ProjectImages: true,
      category: true,
    },
  });

  return {
    meta: {
      totalItems,
      totalPages,
      currentPage,
    },
    result,
  };
};

const getProjectFromDB = async (id: string) => {
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      ProjectImages: true,
    },
  });

  if (!project) {
    throw new AppError(404, 'Project not found');
  }

  return project;
};

const deleteProjectFromDB = async (id: string) => {
  const existingProject = await prisma.project.findUnique({
    where: { id },
    include: {
      ProjectImages: true,
    },
  });

  if (!existingProject) {
    throw new AppError(404, 'Project not found');
  }

  await prisma.project.delete({
    where: { id },
  });

  if (existingProject.firstImage) {
    const imageToUnlink = getImagePathToUnlink(existingProject.firstImage);
    if (fs.existsSync(imageToUnlink)) {
      fs.unlinkSync(imageToUnlink);
    }
  }

  if (existingProject.secondImage) {
    const imageToUnlink = getImagePathToUnlink(existingProject.secondImage);
    if (fs.existsSync(imageToUnlink)) {
      fs.unlinkSync(imageToUnlink);
    }
  }

  if (existingProject.thirdImage) {
    const imageToUnlink = getImagePathToUnlink(existingProject.thirdImage);
    if (fs.existsSync(imageToUnlink)) {
      fs.unlinkSync(imageToUnlink);
    }
  }

  if (existingProject.ProjectImages.length > 0) {
    existingProject.ProjectImages.forEach((image) => {
      const imageToUnlink = getImagePathToUnlink(image.image);
      if (fs.existsSync(imageToUnlink)) {
        fs.unlinkSync(imageToUnlink);
      }
    });
  }
};

export const ProjectServices = {
  createProjectIntoDB,
  updateProjectIntoDB,
  getProjectsFromDB,
  deleteProjectFromDB,
  getProjectFromDB,
};
