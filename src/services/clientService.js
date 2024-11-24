import fetch from 'auth/FetchInterceptor'
import { API_IDENTITY_BASE_URL } from 'configs/AppConfig';

const getAll =async (status)  => {
  return await  fetch({
     url: API_IDENTITY_BASE_URL+`v1/Client/GetAll?recordstatus=${status}`,
     method: 'get'
   }).then(response => response)
};

const getbyID =async (id)  => {
  return await  fetch({
     url: API_IDENTITY_BASE_URL+`v1/Client/GetById?id=${id}`,
     method: 'get'
   }).then(response => response)
};

const getAllApiClaims =async ()  => {
  return await  fetch({
     url: API_IDENTITY_BASE_URL+`v1/ApiClaim/GetAll`,
     method: 'get'
   }).then(response => response)
};
const getAllRolebyId =async (id)  => {
  return await  fetch({
     url: API_IDENTITY_BASE_URL+`v1/Role/GetById?id=${id}`,
     method: 'get'
   }).then(response => response)
};

const save =async (data)  => {
	return fetch({
		url: API_IDENTITY_BASE_URL+'v1/Client/Create',
		method: 'post',
		data: data
	})
}

const update =(data,id)  => {
	return fetch({
		url:  API_IDENTITY_BASE_URL+`v1/Client/Update?id=${id}`,
		method: 'patch',
		data: data
	})
}

const deleteClient =async (id)  => {
	return fetch({
		url: API_IDENTITY_BASE_URL+`v1/Client/Delete?id=${id}`,
		method: 'delete'
	})
}
const ClientService = {
  save,
  getAll,
  deleteClient,
  getAllApiClaims,
  getbyID,
  update,
  getAllRolebyId
};

export default ClientService;