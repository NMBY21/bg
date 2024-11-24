import fetch from 'auth/FetchInterceptor'
import { API_IDENTITY_BASE_URL } from 'configs/AppConfig';

const getAll =async ()  => {
  return await  fetch({
     url: API_IDENTITY_BASE_URL+'v1/User/GetAll',
     method: 'get'
   }).then(response => response)
};

const save =async (data)  => {
	return await fetch({
		url: API_IDENTITY_BASE_URL+'v1/User/Create',
		method: 'post',
		data: data
	})
}

const update =async (data)  => {
	return await fetch({
		url: API_IDENTITY_BASE_URL+'v1/User/Update',
		method: 'put',
		data: data
	})
}
const deleteUser =async (id)  => {
	return fetch({
		url: API_IDENTITY_BASE_URL+`v1/User/Delete?id=${id}`,
		method: 'delete'
	})
}
const AssignUserRole =async (id,roleid)  => {
	return fetch({
		url: API_IDENTITY_BASE_URL+`v1/User/AssignRole?id=${id}&roleId=${roleid}`,
		method: 'put'
	})
}
const UserService = {
  save,
  getAll,
  deleteUser,
  AssignUserRole,
  update
};

export default UserService;