import axios from "axios";
import config from "../lib/config/app";
import { message } from 'antd';
import { Search } from "../types/search";


export const fetchProductList = (page:any, search: Search) => {
	return axios.get(config().apiUrl + "/products?page=" +page.current, 
	{ headers: config().headers, params: search }).catch(err => {
		console.log(err);
		message.error("Sistem xətası");
	});
}; 

export const fetchProductById = (id:number) => {
	return axios.get(config().apiUrl + "/products/"+ id, 
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
	return axios.post(config().apiUrl + "/api/product-image/"+id, { headers: config().headers }).catch(err => {
		console.log(err);
		message.error("Sistem xətası");
	});
}; 
  
export const addProduct = (body: Object) => {
	return axios.post(config().apiUrl + "/products", body, { headers: config().headers }).catch(err => {
		console.log(err);
		message.error("Sistem xətası");
	});
};

export const updateProduct = (body: Object, id: number) => {
	return axios.post(config().apiUrl + "/products/"+id, body, { headers: config().headers }).catch(err => {
		console.log(err);
		message.error("Sistem xətası");
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
 

export const deleteProduct = (body: Object, id: number) => {
	return axios.post(config().apiUrl + "/products/"+id, body, { headers: config().headers }).catch(err => {
		console.log(err);
		message.error("Sistem xətası")
	});
};  

 