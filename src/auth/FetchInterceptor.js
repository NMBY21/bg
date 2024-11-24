import axios from 'axios';
import { API_BASE_URL } from 'configs/AppConfig';
import { signOut, signOutSuccess } from 'store/slices/authSlice';
import store from '../store';
import { ACCESS_TOKEN, AUTH_TOKEN, ID_TOKEN, REFRESH_TOKEN } from 'constants/AuthConstant';
import { notification } from 'antd';

const unauthorizedCode = [ 401, 403]

const service = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000
})


// API Request interceptor
service.interceptors.request.use(config => {
	const jwtToken = localStorage.getItem(ACCESS_TOKEN) || null;
	const IDToken = localStorage.getItem(ID_TOKEN) || null;
	 if (jwtToken && IDToken) {
		config.headers[ACCESS_TOKEN] = localStorage.getItem(ACCESS_TOKEN) || null;
		config.headers[ID_TOKEN] = localStorage.getItem(ID_TOKEN) || null;
		config.headers["Accept-Language"] = "en-GB";
		
	 }

  	return config
}, error => {
	// Do something with request error here
	notification.error({
		message: 'Error'
	})
	Promise.reject(error)
})

// API respone interceptor
service.interceptors.response.use( (response) => {
	return response.data
}, (error) => {

	let notificationParam = {
		message: error
	}
 
	//Remove token and redirect 
	if (unauthorizedCode.includes(error.response.status)) {
		notificationParam.message = 'Authentication Fail'
		notificationParam.description = 'Please login again'
		localStorage.removeItem("NAME")
		localStorage.removeItem(ID_TOKEN)
		localStorage.removeItem(REFRESH_TOKEN)
		localStorage.removeItem(ACCESS_TOKEN)
		localStorage.removeItem("USERNAME")
		localStorage.removeItem("ECOMMERCEADMINPortal")
		store.dispatch(signOut())
		// store.dispatch(signOutSuccess())
	}

	if (error.response.status === 404) {
		notificationParam.message = 'Not Found'
	}

	if (error.response.status === 500) {
		notificationParam.message = 'Internal Server Error'
	}
	
	if (error.response.status === 508) {
		notificationParam.message = 'Time Out'
	}

	if (error.response.status !== 400) {
		notification.error(notificationParam)
	  }

	return Promise.reject(error);
});

export default service