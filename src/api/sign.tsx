import axios from "axios"; 
import config from "../lib/config/app";
import {  message } from 'antd';
 

export const signIn = (body: object) => {
	return axios.post(`${config().apiUrl}/auth/user/login`, body).catch(err=>{
		message.error("Sistem xətası");
		console.log(err);
	});
};
