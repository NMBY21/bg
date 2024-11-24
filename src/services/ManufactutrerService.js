import fetch from 'auth/FetchInterceptor'
import { API_IDENTITY_BASE_URL } from 'configs/AppConfig';

const getAll =async (payload)  => {
  return await  fetch({
     url: `v1/Manufacturer?recordStatus=2&pageSize=${payload.pageSize}&pageNumber=${payload.pageNumber}`,
     method: 'get'
   }).then(response => response)
};

const getById =async (id)  => {
	return await  fetch({
	   url: `v1/Manufacturer/${id}`,
	   method: 'get'
	 }).then(response => response)
  };
  

const save =async (data)  => {
	return await fetch({
		url: 'v1/Manufacturer/Create',
		method: 'post',
		data: data
	})
}

const update =async (data)  => {
	return await fetch({
		url: `v1/Manufacturer/Update/${data.id}`,
		method: 'put',
		data: data.data.data
	})
}
const deleteManufacturer =async (id)  => {
	return fetch({
		url: `v1/Manufacturer/Delete/${id}`,
		method: 'delete'
	})
}
const ManufacturerService = {
  save,
  getById,
  getAll,
  deleteManufacturer,
  update
};

export default ManufacturerService;