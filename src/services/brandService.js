import fetch from 'auth/FetchInterceptor'
import { API_IDENTITY_BASE_URL } from 'configs/AppConfig';

const getAll =async (payload)  => {
  return await  fetch({
     url: `v1/Brand?recordStatus=2&pageSize=${payload.pageSize}&pageNumber=${payload.pageNumber}`,
     method: 'get'
   }).then(response => response)
};


const save =async (data)  => {
	return await fetch({
		url: 'v1/Brand/Create',
		method: 'post',
		data: data
	})
}

const update =async (data)  => {
	return await fetch({
		url: `v1/Brand/Update/${data.id}`,
		method: 'put',
		data: data
	})
}
const deleteBrand =async (id)  => {
	return fetch({
		url: `v1/Brand/Delete/${id}`,
		method: 'delete'
	})
}
const AssignBrandRole =async (id,roleid)  => {
	return fetch({
		url: `v1/Brand/AssignRole?id=${id}&roleId=${roleid}`,
		method: 'put'
	})
}
const BrandService = {
  save,
  getAll,
  deleteBrand,
  AssignBrandRole,
  update
};

export default BrandService;