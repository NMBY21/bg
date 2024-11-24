import fetch from 'auth/FetchInterceptor'
import { API_IDENTITY_BASE_URL } from 'configs/AppConfig';

const getAll =async (payload)  => {
  return await  fetch({
     url: `v1/Image?recordStatus=2&pageSize=${payload.pageSize}&pageNumber=${payload.pageNumber}`,
     method: 'get'
   }).then(response => response)
};


const save =async (data)  => {
	return await fetch({
		url: 'v1/Image/Create',
		method: 'post',
		data: data,
		headers: { "Content-Type": "multipart/form-data" }
	})
}

const update =async (data)  => {
	return await fetch({
		url: 'v1/Image/Update',
		method: 'put',
		data: data
	})
}
const deleteMedia =async (id)  => {
	return fetch({
		url: `v1/Image/Delete/${id}`,
		method: 'delete'
	})
}
const MediaService = {
  save,
  getAll,
  deleteMedia,
  update
};

export default MediaService;