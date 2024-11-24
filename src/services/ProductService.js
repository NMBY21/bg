import fetch from 'auth/FetchInterceptor'
import { API_IDENTITY_BASE_URL } from 'configs/AppConfig';

const getAll =async (payload)  => {
  return await  fetch({
     url: `v1/Product/GetAll?recordStatus=2&pageSize=${payload.pageSize}&pageNumber=${payload.pageNumber}`,
     method: 'get'
   }).then(response => response)
};

const getById =async (id)  => {
	return await  fetch({
	   url: `v1/Product/${id}`,
	   method: 'get'
	 }).then(response => response)
  };
  

const save =async (data)  => {
	return await fetch({
		url: 'v1/Product/Create',
		method: 'post',
		data: data
	})
}

const update =async (data)  => {
	return await fetch({
		url: `v1/Product/Update/${data.id}`,
		method: 'put',
		data: data.data.data
	})
}
const deleteProduct =async (id)  => {
	return fetch({
		url: `v1/Product/Delete/${id}`,
		method: 'delete'
	})
}
const ProductService = {
  save,
  getById,
  getAll,
  deleteProduct,
  update
};

export default ProductService;