import { SIDE_NAV_LIGHT, NAV_TYPE_SIDE, DIR_LTR, SIDE_NAV_DARK } from 'constants/ThemeConstant';

export const APP_NAME = 'Nasa Info';
export const API_BASE_URL = "http://localhost:8085";
export const API_AUTH_URL = "http://localhost:8085"
export const NASA_API_KEY = "xiI0NGe0SyLL2z8X1jRfAL4fjQHC3WcsamBvuoAi"
export const APP_PREFIX_PATH = '/app';
export const AUTH_PREFIX_PATH = '/auth';
export const AUTH_COOKIE = "AUTH_COOKIE";
export const REDIRECT_URL_KEY = 'redirect';
export const AUTHENTICATED_ENTRY = `${APP_PREFIX_PATH}/dashboards/default`;
export const UNAUTHENTICATED_ENTRY = '/login';
export const GOOGLE_BUCKET_NAME = "prescriptions_bucket_3";
export const GOOGLE_BUCKET_URL = 'https://storage.googleapis.com/prescriptions_bucket_3';

export const THEME_CONFIG = {
	navCollapsed: false,
	sideNavTheme: SIDE_NAV_LIGHT,
	locale: 'en',
	navType: NAV_TYPE_SIDE,
	topNavColor: '#3e82f7',
	headerNavColor: '',
	mobileNav: false,
	currentTheme: 'dark',
	direction: DIR_LTR,
	blankLayout: false
};
