import { SIDE_NAV_LIGHT, NAV_TYPE_SIDE, DIR_LTR } from 'constants/ThemeConstant';
import { env } from './EnvironmentConfig'

export const APP_NAME = 'GETNET ECOMMERCE';
export const IMAGE_FALLBACK_URL = 'https://static.thenounproject.com/png/2932881-200.png';
export const API_BASE_URL = env.API_ENDPOINT_URL;
export const API_IDENTITY_BASE_URL = env.API_IDENTITY_ENDPOINT_URL;
export const IMAGE_API_BASE_URL = 'http://getnetsoftsystems.com';
export const APP_PREFIX_PATH = 'getnet/ecommerce-management/system';
export const AUTH_PREFIX_PATH = '/auth';
export const REDIRECT_URL_KEY = 'redirect'
export const AUTHENTICATED_ENTRY = `${APP_PREFIX_PATH}/brands`;
export const UNAUTHENTICATED_ENTRY = '/login'

export const THEME_CONFIG = {
	navCollapsed: false,
	sideNavTheme: SIDE_NAV_LIGHT,
	locale: 'en',
	navType: NAV_TYPE_SIDE,
	topNavColor: '#3e82f7',
	headerNavColor: '',
	mobileNav: false,
	currentTheme: 'light',
	direction: DIR_LTR,
	blankLayout: false
};
