import axios from "axios";
import config from "../lib/config/app";
import { message } from 'antd';

export const fetchCategoryList = (page:any=null, name:string="") => {  
	return axios.get(config().apiUrl + "/categories", { headers: config().headers, params: page === null ? {} : {
		limit: page.pageSize,
		offset: (page.current - 1), 
		name
	} }).catch(err => {
		console.log(err);
		message.error("Sistem xətası");
	});
};  

export const fetchCategoryById = (id: number) => { 
 
	return axios.get(config().apiUrl + "/categories/"+id, { headers: config().headers }).catch(err => {
		console.log(err);
		message.error("Sistem xətası");
	});
};

 
 
  
export const addNewCategory = (body: Object) => {
	const path = "/categories";
	return axios.post(config().apiUrl + path, body, { headers: config().headers }).catch(err => {
		console.log(err);
		message.error("Sistem xətası");
	});
};


export const updateCategory = (body: Object, id: number) => { 
	return axios.post(config().apiUrl + "/categories/"+id, body, { headers: config().headers }).catch(err => {
		console.log(err);
		message.error("Sistem xətası");
	});
};

export const deleteCategory = (body: Object, id: number | null) => { 
	return axios.post(config().apiUrl + "/categories/"+id, body, { headers: config().headers }).catch(err => {
		console.log(err);
		message.error("Sistem xətası");
	});
};  

export const AddNewImage = (body: Object) => {
	return axios.post(config().apiUrl + "/api/category-image", body, { headers: config().headers }).catch(err => {
		console.log(err);
		message.error("Sistem xətası")
	});
};