import React  from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { AUTHENTICATED_ENTRY } from 'configs/AppConfig'
import { ACCESS_TOKEN, ID_TOKEN } from 'constants/AuthConstant';

const PublicRoute = () => {

	const { token } = useSelector(state => state.auth)
  
	const jwtToken = localStorage.getItem(ACCESS_TOKEN) || null;
	const IDToken = localStorage.getItem(ID_TOKEN) || null;

	// const location = useLocation()

	// if (!token) {
		// if(IDToken==null && jwtToken==null){

	return IDToken ? <Navigate to={AUTHENTICATED_ENTRY} /> : <Outlet/>
}

export default PublicRoute