import React from 'react'
import { AUTH_PREFIX_PATH, APP_PREFIX_PATH } from 'configs/AppConfig'

export const publicRoutes = [
    {
        key: 'login',
        path: `${AUTH_PREFIX_PATH}/login`,
        component: React.lazy(() => import('views/auth-views/authentication/login')),
    },
]

export const protectedRoutes = [
    {
        key: 'dashboard-home',
        path: `${APP_PREFIX_PATH}/dashboards/home`,
        component: React.lazy(() => import('views/app-views/dashboards/default')),
    },
    {
        key: 'dashboard-default',
        path: `${APP_PREFIX_PATH}/dashboards/default`,
        component: React.lazy(() => import('views/app-views/landingPage')),
    },
    {
        key: 'dashboard-user-profile',
        path: `${APP_PREFIX_PATH}/dashboards/userProfile`,
        component: React.lazy(() => import('views/app-views/dashboards/users/view users/profile')),
    },
    {
        key: 'dashboard-course-newCourse',
        path: `${APP_PREFIX_PATH}/dashboards/course/new`,
        component: React.lazy(() => import('views/app-views/dashboards/courses/new courses')),
    },
]