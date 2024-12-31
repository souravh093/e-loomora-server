"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_routes_1 = require("../modules/users/users.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const shop_routes_1 = require("../modules/shop/shop.routes");
const category_routes_1 = require("../modules/category/category.routes");
const product_routes_1 = require("../modules/product/product.routes");
const review_routes_1 = require("../modules/review/review.routes");
const coupon_routes_1 = require("../modules/coupon/coupon.routes");
const order_routes_1 = require("../modules/order/order.routes");
const payment_route_1 = require("../modules/payment/payment.route");
const shopFollow_routes_1 = require("../modules/shopFollow/shopFollow.routes");
const subscription_routes_1 = require("../modules/subscription/subscription.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/users',
        route: users_routes_1.UsersRoutes,
    },
    {
        path: '/auths',
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: '/shops',
        route: shop_routes_1.ShopRoutes,
    },
    {
        path: '/categories',
        route: category_routes_1.CategoriesRoutes,
    },
    {
        path: '/products',
        route: product_routes_1.ProductRoutes,
    },
    {
        path: '/reviews',
        route: review_routes_1.ReviewRoutes,
    },
    {
        path: '/coupons',
        route: coupon_routes_1.CouponRoutes,
    },
    {
        path: '/orders',
        route: order_routes_1.OrderRoutes,
    },
    {
        path: '/payments',
        route: payment_route_1.paymentRoutes,
    },
    {
        path: '/follows-shops',
        route: shopFollow_routes_1.ShopFollowRoutes,
    },
    {
        path: '/subscriptions',
        route: subscription_routes_1.SubscriptionRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
