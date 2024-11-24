import fetch from 'auth/FetchInterceptor'
import { API_IDENTITY_BASE_URL } from 'configs/AppConfig';

const getAll =async ()  => {
  return await  fetch({
     url: `v1/Language?recordStatus=2`,
     method: 'get'
   }).then(response => response)
};


const save =async (data)  => {
	return await fetch({
		url: 'v1/Language/Create',
		method: 'post',
		data: data
	})
}

const update =async (data)  => {
	return await fetch({
		url: `v1/Language/Update/${data.id}`,
		method: 'put',
		data: data
	})
}
const deleteLanguage =async (id)  => {
	return fetch({
		url: `v1/Language/Delete/${id}`,
		method: 'delete'
	})
}
const AssignLanguageRole =async (id,roleid)  => {
	return fetch({
		url: `v1/Language/AssignRole?id=${id}&roleId=${roleid}`,
		method: 'put'
	})
}
const LanguageService = {
  save,
  getAll,
  deleteLanguage,
  AssignLanguageRole,
  update
};

export default LanguageService;