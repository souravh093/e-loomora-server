import { Router } from 'express';
import { UsersRoutes } from '../modules/users/users.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { ShopRoutes } from '../modules/shop/shop.routes';
import { CategoriesRoutes } from '../modules/category/category.routes';
import { ProductRoutes } from '../modules/product/product.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UsersRoutes,
  },
  {
    path: '/auths',
    route: AuthRoutes,
  },
  {
    path: '/shops',
    route: ShopRoutes,
  },
  {
    path: '/categories',
    route: CategoriesRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
