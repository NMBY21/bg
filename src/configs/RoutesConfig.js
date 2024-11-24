import React from 'react'
import { AUTH_PREFIX_PATH, APP_PREFIX_PATH } from 'configs/AppConfig'

export const publicRoutes = [
    {
        key: 'login',
        path: `${AUTH_PREFIX_PATH}/login`,
        component: React.lazy(() => import('views/auth-views/authentication/login')),
    },
    {
        key: 'register',
        path: `${AUTH_PREFIX_PATH}/register`,
        component: React.lazy(() => import('views/auth-views/authentication/register')),
    },
    {
        key: 'forgot-password',
        path: `${AUTH_PREFIX_PATH}/forgot-password`,
        component: React.lazy(() => import('views/auth-views/authentication/forgot-password')),
    }
]

export const protectedRoutes = [
    // {
    //     key: 'dashboard.default',
    //     path: `${APP_PREFIX_PATH}/dashboard/default`,
    //     component: React.lazy(() => import('views/app-views/dashboards/default')),
    // },
    {
        key: 'medias',
        path: `${APP_PREFIX_PATH}/medias`,
        component: React.lazy(() => import('views/app-views/medias')),
    },
    {
        key: 'lookups',
        path: `${APP_PREFIX_PATH}/lookups`,
        component: React.lazy(() => import('views/app-views/lookups')),
    },
    {
        key: 'brands',
        path: `${APP_PREFIX_PATH}/brands`,
        component: React.lazy(() => import('views/app-views/brands')),
    },
    {
        key: 'categories',
        path: `${APP_PREFIX_PATH}/categories`,
        component: React.lazy(() => import('views/app-views/category')),
    },
    {
        key: 'manufacturers',
        path: `${APP_PREFIX_PATH}/manufacturers`,
        component: React.lazy(() => import('views/app-views/manufacturer')),
    },
    {
        key: 'products',
        path: `${APP_PREFIX_PATH}/products`,
        component: React.lazy(() => import('views/app-views/product')),
    },    {
        key: 'products/add-product',
        path: `${APP_PREFIX_PATH}/products/add-product`,
        component: React.lazy(() => import('views/app-views/product/add-product')),
    },
    // {
    //     key: 'products/edit-product',
    //     path: `${APP_PREFIX_PATH}/edit-product/:id`,
    //     component: React.lazy(() => import('views/app-views/product/edit-product')),
    // },
    {
        key: 'products/product-list',
        path: `${APP_PREFIX_PATH}/products/product-list`,
        component: React.lazy(() => import('views/app-views/product/product-list')),
    },
    {
        key: 'users',
        path: `${APP_PREFIX_PATH}/users`,
        component: React.lazy(() => import('views/app-views/users')),
    },
    {
        key: 'client',
        path: `${APP_PREFIX_PATH}/client`,
        component: React.lazy(() => import('views/app-views/client')),
    },
    {
        key: 'role',
        path: `${APP_PREFIX_PATH}/role`,
        component: React.lazy(() => import('views/app-views/role')),
    },
    {
        key: 'settings',
        path: `${APP_PREFIX_PATH}/setting/*`,
        component: React.lazy(() => import('views/app-views/setting')),
    },
]