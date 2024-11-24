import fetch from 'auth/FetchInterceptor'
import { API_IDENTITY_BASE_URL } from 'configs/AppConfig';

const getAll =async (payload)  => {
  return await  fetch({
     url: `v1/Tax?recordStatus=2&pageSize=${payload.pageSize}&pageNumber=${payload.pageNumber}`,
     method: 'get'
   }).then(response => response)
};


const save =async (data)  => {
	return await fetch({
		url: 'v1/Tax/Create',
		method: 'post',
		data: data
	})
}

const update =async (data)  => {
	return await fetch({
		url: `v1/Tax/Update/${data.id}`,
		method: 'put',
		data: data
	})
}
const deleteTax =async (id)  => {
	return fetch({
		url: `v1/Tax/Delete/${id}`,
		method: 'delete'
	})
}
const AssignTaxRole =async (id,roleid)  => {
	return fetch({
		url: `v1/Tax/AssignRole?id=${id}&roleId=${roleid}`,
		method: 'put'
	})
}
const TaxService = {
  save,
  getAll,
  deleteTax,
  AssignTaxRole,
  update
};

export default TaxService;