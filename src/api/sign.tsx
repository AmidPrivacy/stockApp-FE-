import axios from "axios"; 
import config from "../lib/config/app";
// import {  message } from 'antd';
 

export const signIn = (body: any) => {
	return axios.post(`${config().apiUrl}/auth/${body.auth}/login`, body).catch(err=>{ 
		console.log(err);
	});
};
