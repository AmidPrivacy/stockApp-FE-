import axios from "axios";
import config from "../lib/config/app";
import { message } from 'antd';


  
export const createOrder = (body: Object) => {
	return axios.post(config().apiUrl + "/user/orders", body, { headers: config().headers }).catch(err => {
		console.log(err);
		message.error("Sistem xətası");
	});
};