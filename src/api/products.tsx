import axios from "axios";
import config from "../lib/config/app";
import { message } from 'antd';
import { Search } from "../types/search";


export const fetchProductList = (page:any, search: Search) => {
	return axios.get(config().apiUrl + "/products?limit="+ page.pageSize + "&offset=" + (page.current - 1), 
	{ headers: config().headers, params: search }).catch(err => {
		console.log(err);
		message.error("Sistem xətası");
	});
}; 

export const fetchProductById = (id:number) => {
	return axios.get(config().apiUrl + "/api/product/"+ id, 
	{ headers: config().headers }).catch(err => {
		console.log(err);
		message.error("Sistem xətası");
	});
}; 

export const fetchImageList = (id:number) => {
	return axios.get(config().apiUrl + "/api/product-images/"+id, { headers: config().headers }).catch(err => {
		console.log(err);
		message.error("Sistem xətası");
	});
}; 

export const deleteImage = (id:number) => {
	return axios.delete(config().apiUrl + "/api/product-image/"+id, { headers: config().headers }).catch(err => {
		console.log(err);
		message.error("Sistem xətası");
	});
}; 
  
export const addProduct = (body: Object) => {
	return axios.post(config().apiUrl + "/api/product", body, { headers: config().headers }).catch(err => {
		console.log(err);
		message.error("Sistem xətası");
	});
};

export const AddMenuRelation = (body: Object) => {
	return axios.put(config().apiUrl + "/api/product-menu", body, { headers: config().headers }).catch(err => {
		console.log(err);
		message.error("Sistem xətası")
	});
};

export const AddNewImage = (body: Object) => {
	return axios.post(config().apiUrl + "/api/product-image", body, { headers: { 
		Authorization: 'Bearer ' + sessionStorage.getItem('token'),
		'Access-Control-Allow-Origin': '*', 
	 } }).catch(err => {
		console.log(err);
		message.error("Sistem xətası")
	});
};

export const copyProduct = (id:number) => {
	return axios.get(config().apiUrl + "/api/product-dublicate/"+id, { headers: config().headers }).catch(err => {
		console.log(err);
		message.error("Sistem xətası");
	});
}; 

export const deleteProduct = (body: Object) => {
	return axios.put(config().apiUrl + "/api/product-status", body, { headers: config().headers }).catch(err => {
		console.log(err);
		message.error("Sistem xətası")
	});
};  

export const setHomeStatus = (body: Object) => {
	return axios.put(config().apiUrl + "/api/product-home-status", body, { headers: config().headers }).catch(err => {
		console.log(err);
		message.error("Sistem xətası")
	});
}; 