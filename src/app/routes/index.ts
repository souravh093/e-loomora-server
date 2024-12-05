import { Router } from 'express';
import { UsersRoutes } from '../modules/users/users.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { ShopRoutes } from '../modules/shop/shop.routes';
import { CategoriesRoutes } from '../modules/category/category.routes';
import { ProductRoutes } from '../modules/product/product.routes';
import { ReviewRoutes } from '../modules/review/review.routes';
import { CouponRoutes } from '../modules/coupon/coupon.routes';
import { OrderRoutes } from '../modules/order/order.routes';
import { paymentRoutes } from '../modules/payment/payment.route';
import { ShopFollowRoutes } from '../modules/shopFollow/shopFollow.routes';

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
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
  {
    path: '/coupons',
    route: CouponRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
  {
    path: '/payments',
    route: paymentRoutes,
  },
  {
    path: '/follows-shops',
    route: ShopFollowRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
