import prisma from '../../db/db.config';
import config from '../config';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';

const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req, res, next) => {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      return res.status(401).json({
        statusCode: 401,
        success: false,
        message: 'You are not authorized to access this route',
      });
    }

    const token = bearerToken.split(' ')[1];

    const decoded = jwt.verify(token, config.jwtSecret as string) as JwtPayload;

    const { role, email } = decoded;

    await prisma.user.findFirstOrThrow({
      where: {
        email,
      },
    });

    if (requiredRoles && !requiredRoles.includes(role)) {
      return res.status(403).json({
        statusCode: 403,
        success: false,
        message: 'You are not authorized to access this route',
      });
    }

    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
