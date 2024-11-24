import fetch from 'auth/FetchInterceptor'
import { API_IDENTITY_BASE_URL } from 'configs/AppConfig'
import { ACCESS_TOKEN } from 'constants/AuthConstant'

const AuthService = {}

AuthService.clientlogin = function (data) {
	return fetch({
		url: API_IDENTITY_BASE_URL+'v1/Client/Login',
		method: 'post',
		data: data
	})
}


AuthService.login = function (data) {
	return fetch({
		url: API_IDENTITY_BASE_URL+'v1/User/Login',
		method: 'post',
		data: data,
		headers:{
			"accessToken":localStorage.getItem(ACCESS_TOKEN)
		}
	})
}

AuthService.register = function (data) {
	return fetch({
		url: API_IDENTITY_BASE_URL+'/auth/register',
		method: 'post',
		data: data
	})
}

AuthService.logout = function () {
	return fetch({
		url: API_IDENTITY_BASE_URL+'/auth/logout',
		method: 'post'
	})
}

AuthService.loginInOAuth = function () {
	return fetch({
		url: API_IDENTITY_BASE_URL+'/auth/loginInOAuth',
		method: 'post'
	})
}

export default AuthService;