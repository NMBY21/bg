import fetch from 'auth/FetchInterceptor'
import { API_IDENTITY_BASE_URL } from 'configs/AppConfig';

const getAll =async (payload)  => {
  return await  fetch({
     url: `v1/Address?recordStatus=2&pageSize=${payload.pageSize}&pageNumber=${payload.pageNumber}`,
     method: 'get'
   }).then(response => response)
};

const getallactive =async (payload)  => {
	return await  fetch({
	   url: `v1/Address?recordStatus=2`,
	   method: 'get'
	 }).then(response => response)
  };
  
const save =async (data)  => {
	return await fetch({
		url: 'v1/Address/Create',
		method: 'post',
		data: data
	})
}

const update =async (data)  => {
	return await fetch({
		url: `v1/Address/Update/${data.id}`,
		method: 'put',
		data: data
	})
}
const deleteAddress =async (id)  => {
	return fetch({
		url: `v1/Address/Delete/${id}`,
		method: 'delete'
	})
}
const AssignAddressRole =async (id,roleid)  => {
	return fetch({
		url: `v1/Address/AssignRole?id=${id}&roleId=${roleid}`,
		method: 'put'
	})
}
const AddressService = {
  save,
  getAll,
  deleteAddress,
  AssignAddressRole,
  update,
  getallactive
};

export default AddressService;