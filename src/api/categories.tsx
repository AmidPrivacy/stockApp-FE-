import axios from "axios";
import config from "../lib/config/app";
import { message } from 'antd';

export const fetchCategoryList = (page:any=null, name:string="") => {  
	return axios.get(config().apiUrl + "/api/categories", { headers: config().headers, params: page === null ? {} : {
		limit: page.pageSize,
		offset: (page.current - 1), 
		name
	} }).catch(err => {
		console.log(err);
		message.error("Sistem xətası");
	});
};  

export const fetchCategoryById = (id: number, isParent:boolean) => { 
 
	return axios.get(config().apiUrl + "/api/category/"+id+"?isParent="+isParent, { headers: config().headers }).catch(err => {
		console.log(err);
		message.error("Sistem xətası");
	});
};

export const fetchSubCategories = () => {
	return axios.get(config().apiUrl + "/api/sub-categories", { headers: config().headers }).catch(err => {
		console.log(err);
		message.error("Sistem xətası");
	});
};

export const fetchSubCategoriesByParentId = (id:string) => {
	return axios.get(config().apiUrl + "/api/sub-categories/"+id, { headers: config().headers }).catch(err => {
		console.log(err);
		message.error("Sistem xətası");
	});
};

export const fetchValuesByCategoryId = (id:string) => {
	return axios.get(config().apiUrl + "/api/values/category/"+id, { headers: config().headers }).catch(err => {
		console.log(err);
		message.error("Sistem xətası");
	});
};
  
export const addNewCategory = (body: Object, isParent: boolean) => {
	const path = isParent ? "/api/category" : "/api/sub-category";
	return axios.post(config().apiUrl + path, body, { headers: config().headers }).catch(err => {
		console.log(err);
		message.error("Sistem xətası");
	});
};

export const deleteCategory = (body: Object, parentId: number | null) => {
	const path = parentId ? "/api/subcategory-status" : "/api/category-status"
	return axios.put(config().apiUrl + path, body, { headers: config().headers }).catch(err => {
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