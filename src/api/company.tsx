import axios from "axios";
import config from "../lib/config/app";
import { message } from 'antd';

export const fetchCompanyList = (page:any=null) => {
	const paging =  page !==null ? "?limit="+ page.pageSize + "&offset=" + (page.current - 1): "";
	return axios.get(config().apiUrl + "/api/companies"+paging, { headers: config().headers }).catch(err => {
		console.log(err);
		message.error("Sistem xətası");
	});
}; 

export const fetchStatusList = () => { 
	return axios.get(config().apiUrl + "/api/company/statuses", { headers: config().headers }).catch(err => {
		console.log(err);
		message.error("Sistem xətası");
	});
}; 
  
export const fetchOrderList = (page:any=null) => {
	const paging =  page !==null ? "?limit="+ page.pageSize + "&offset=" + (page.current - 1): "";
	return axios.get(config().apiUrl + "/api/company/orders", { headers: config().headers }).catch(err => {
		console.log(err);
		message.error("Sistem xətası");
	});
}; 

export const updateStatus = (body: Object) => {
	return axios.post(config().apiUrl + "/api/company/orders/set-status", body, { headers: config().headers }).catch(err => {
		console.log(err);
		message.error("Sistem xətası")
	});
};

export const addNewCompany = (body: Object) => {
	return axios.post(config().apiUrl + "/api/company", body, { headers: config().headers }).catch(err => {
		console.log(err);
		message.error("Sistem xətası")
	});
};

export const fetchCompanyById = (id:number) => {
	return axios.get(config().apiUrl + "/api/company/"+ id, 
	{ headers: config().headers }).catch(err => {
		console.log(err);
		message.error("Sistem xətası");
	});
}; 

export const deleteCompany = (body: Object) => {
	return axios.put(config().apiUrl + "/api/company-status", body, { headers: config().headers }).catch(err => {
		console.log(err);
		message.error("Sistem xətası")
	});
};  

export const deleteImage = (id: number) => {
	return axios.put(config().apiUrl + "/api/company-delete-image/"+id, {}, { headers: config().headers }).catch(err => {
		console.log(err);
		message.error("Sistem xətası")
	});
};  

export const AddNewImage = (body: Object) => {
	return axios.post(config().apiUrl + "/api/company-image", body, { headers: config().headers }).catch(err => {
		console.log(err);
		message.error("Sistem xətası")
	});
};

export const AddRelation = (body: Object) => {
	return axios.post(config().apiUrl + "/api/company-relation", body, { headers: config().headers }).catch(err => {
		console.log(err);
		message.error("Sistem xətası")
	});
};

export const DeleteRelation = (id: number) => {
	return axios.delete(config().apiUrl + "/api/company-relation/"+id, { headers: config().headers }).catch(err => {
		console.log(err);
		message.error("Sistem xətası")
	});
};