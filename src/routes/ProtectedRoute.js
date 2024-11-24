import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { 
	AUTH_PREFIX_PATH, 
	UNAUTHENTICATED_ENTRY, 
	REDIRECT_URL_KEY 
} from 'configs/AppConfig'
import { ACCESS_TOKEN, ID_TOKEN } from 'constants/AuthConstant';

const ProtectedRoute = () => {
	
	// const { token } = useSelector(state => state.auth)
	const jwtToken = localStorage.getItem(ACCESS_TOKEN) || null;
	const IDToken = localStorage.getItem(ID_TOKEN) || null;

	const location = useLocation()

	// if (!token) {
		if(IDToken==null && jwtToken==null){
		return <Navigate to={`${AUTH_PREFIX_PATH}${UNAUTHENTICATED_ENTRY}?${REDIRECT_URL_KEY}=${location.pathname}`} replace />;
	}

	return <Outlet />
}

export default ProtectedRoute