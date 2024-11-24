import fetch from 'auth/FetchInterceptor'
import { API_IDENTITY_BASE_URL } from 'configs/AppConfig';

const getAll =async (status,clientid)  => {
  var clienID=clientid==null? "":`&clientid=${clientid}`;
  return await  fetch({
     url: API_IDENTITY_BASE_URL+`v1/Role/GetAll?recordstatus=${status}${clienID}`,
     method: 'get'
   }).then(response => response)
};

const getbyID =async (id)  => {
  return await  fetch({
     url: API_IDENTITY_BASE_URL+`v1/Role/GetById?id=${id}`,
     method: 'get'
   }).then(response => response)
};

const getAllApiClaims =async ()  => {
  return await  fetch({
     url: API_IDENTITY_BASE_URL+`v1/ApiClaim/GetAll`,
     method: 'get'
   }).then(response => response)
};

const save =async (data)  => {
	return fetch({
		url: API_IDENTITY_BASE_URL+'v1/Role/Create',
		method: 'post',
		data: data
	})
}

const update =(data,id)  => {
	return fetch({
		url:  API_IDENTITY_BASE_URL+`v1/Role/Update?id=${id}`,
		method: 'put',
		data: data
	})
}

const deleteRole =async (id)  => {
	return fetch({
		url: API_IDENTITY_BASE_URL+`v1/Role/Delete?id=${id}`,
		method: 'delete'
	})
}
const ClientService = {
  save,
  getAll,
  deleteRole,
  getAllApiClaims,
  getbyID,
  update
};

export default ClientService;