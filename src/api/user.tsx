import axios from "axios";
import config from "../lib/config/app";
import { message } from 'antd';


export const fetchUserList = (search: any= { name: "", number: "", email: "", 
										role: "" }) => {
	return axios.get(config().apiUrl + "/users", { headers: config().headers, params: { ...search } }).catch(err => {
		console.log(err);
		message.error("Sistem xətası"); 
	});
};

export const fetcUserById = (id:any) => {
	return axios.get(config().apiUrl + "/user/"+id, { headers: config().headers }).catch(err => {
		console.log(err);
		message.error("Sistem xətası");
	});
};

export const fetcUserByRole = (role: string) => {
	return axios.get(config().apiUrl + "/users-with-role", { headers: config().headers, params: { role } }).catch(err => {
		console.log(err);
		message.error("Sistem xətası");
	});
};

export const fetchSellerList = () => {
	return axios.get(config().apiUrl + "/sellers", { headers: config().headers }).catch(err => {
		console.log(err);
		message.error("Sistem xətası");
	});
}; 

export const addNewUser = (body: any) => {
	return axios.post(config().apiUrl + "/users", body, { headers: config().headers }).catch(err => {
		console.log(err);
		message.error("Sistem xətası")
	});
};
 
export const updateUser = (body: any) => {
	return axios.put(config().apiUrl + "/user-update", body, { headers: config().headers }).catch(err => {
		console.log(err);
		message.error("Sistem xətası")
	});
};

  
export const addRoleToUser = (body: Object) => {
	return axios.put(config().apiUrl + "/user-role", body, { headers: config().headers }).catch(err => {
		console.log(err);
		message.error("Sistem xətası")
	});
};

export const fetchSellerById = (id:any) => {
	return axios.get(config().apiUrl + "/sellers/"+id, { headers: config().headers }).catch(err => {
		console.log(err);
		message.error("Sistem xətası");
	});
};

export const addNewSeller = (body: any) => {
	return axios.post(config().apiUrl + "/sellers", body, { headers: config().headers }).catch(err => {
		console.log(err);
		message.error("Sistem xətası")
	});
};

export const deleteUser = (body: Object) => {
	return axios.put(config().apiUrl + "/user-status", body, { headers: config().headers }).catch(err => {
		console.log(err);
		message.error("Sistem xətası");
	});
};  
