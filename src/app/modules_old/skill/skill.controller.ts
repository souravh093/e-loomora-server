import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SkillService } from './skill.service';

const createSkill = catchAsync(async (req, res) => {
  const skill = await SkillService.createSkillIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Skill created successfully',
    data: skill,
  });
});

const getSkills = catchAsync(async (req, res) => {
  const skills = await SkillService.getSkillsFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Skills fetched successfully',
    data: skills,
  });
});

const getSkillById = catchAsync(async (req, res) => {
  const skill = await SkillService.getSkillByIdFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Skill fetched successfully',
    data: skill,
  });
});

const updateSkill = catchAsync(async (req, res) => {
  const skill = await SkillService.updateSkillIntoDB(req.params.id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Skill updated successfully',
    data: skill,
  });
});

const deleteSkill = catchAsync(async (req, res) => {
  await SkillService.deleteSkillFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Skill deleted successfully',
  });
});

export const SkillController = {
  createSkill,
  getSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
};
