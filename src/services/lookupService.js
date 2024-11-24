import fetch from 'auth/FetchInterceptor'
import { API_IDENTITY_BASE_URL } from 'configs/AppConfig';

const getAll =async (payload)  => {
  return await  fetch({
     url: `v1/Lookup?recordStatus=2&pageSize=${payload.pageSize}&pageNumber=${payload.pageNumber}`,
     method: 'get'
   }).then(response => response)
};


const save =async (data)  => {
	return await fetch({
		url: 'v1/Lookup/Create',
		method: 'post',
		data: data
	})
}

const update =async (data)  => {
	return await fetch({
		url: `v1/Lookup/Update/${data.id}`,
		method: 'put',
		data: data
	})
}
const deleteLookup =async (id)  => {
	return fetch({
		url: `v1/Lookup/Delete/${id}`,
		method: 'delete'
	})
}
const AssignLookupRole =async (id,roleid)  => {
	return fetch({
		url: `v1/Lookup/AssignRole?id=${id}&roleId=${roleid}`,
		method: 'put'
	})
}
const LookupService = {
  save,
  getAll,
  deleteLookup,
  AssignLookupRole,
  update
};

export default LookupService;