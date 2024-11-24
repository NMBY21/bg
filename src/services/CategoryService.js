import fetch from 'auth/FetchInterceptor'
import { API_IDENTITY_BASE_URL } from 'configs/AppConfig';

const getAll =async (payload)  => {
  return await  fetch({
     url: `v1/Category?recordStatus=2&pageSize=${payload.pageSize}&pageNumber=${payload.pageNumber}`,
     method: 'get'
   }).then(response => response)
};
const getForSelect =async (payload)  => {
  return await  fetch({
     url: `v1/Category?recordStatus=2`,
     method: 'get'
   }).then(response => response)
};

const getById =async (id)  => {
	return await  fetch({
	   url: `v1/Category/${id}`,
	   method: 'get'
	 }).then(response => response)
  };
  

const save =async (data)  => {
	return await fetch({
		url: 'v1/Category/Create',
		method: 'post',
		data: data
	})
}

const update =async (data)  => {
	return await fetch({
		url: `v1/Category/Update/${data.id}`,
		method: 'put',
		data: data.data.data
	})
}
const deleteCategory =async (id)  => {
	return fetch({
		url: `v1/Category/Delete/${id}`,
		method: 'delete'
	})
}
const CategoryService = {
  save,
  getById,
  getAll,
  deleteCategory,
  update,
  getForSelect,
};

export default CategoryService;