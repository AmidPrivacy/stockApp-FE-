/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { ContainerOutlined } from '@ant-design/icons'; 

const sideImg = require("../../../../assets/sidebar-5.jpg");

const Menus: React.FC = () => {

	const [menus, setMenus] = useState([]);
	const [activeMenu, setActiveMenu] = useState("/");
 
 
	function changeMenu(path: string, id: number) {
		let subPath = (id === 0) ? "" : id;
		setActiveMenu(path + subPath);
	}

	const prepareTreeItems = (items: any[], parent: any = undefined): any => {
		return items?.map((i: any) => {
			return {
				value: parent ? parent.id + '_' + i.id : `${i.id}`,
				label: i.name,
				children: prepareTreeItems(i.subCategories, i)
			}
		});
	}

  
	return (
		<div style={{ height: "calc(100vh - 70px)", background: `url(${sideImg})`, backgroundSize: "cover" }}>

			<Menu
				defaultSelectedKeys={[activeMenu]}
				selectedKeys={[activeMenu]}
				mode="inline"
				theme="dark"
				style={{ background: "#0D47A1", height: "100%", opacity: "0.7", paddingTop: "10px" }}
			// inlineCollapsed={true}
			>
				<Menu.Item icon={<ContainerOutlined rev="label" />} onClick={() => changeMenu("/", 0)} key='/'>
					<Link to="/">
						Ana səhifə
					</Link>
				</Menu.Item>

				<Menu.Item icon={<ContainerOutlined rev="label" />} onClick={() => changeMenu("/admin/users", 0)} key='/admin/users'>
					<Link to="/admin/users">
						İstifadəçilər
					</Link>
				</Menu.Item>
 
				<Menu.Item icon={<ContainerOutlined rev="label" />} onClick={() => changeMenu("/admin/list/companies", 0)} key='/admin/list/companies'>
					<Link to="/admin/list/companies">
						Firmalar
					</Link>
				</Menu.Item> 
				
				<Menu.Item icon={<ContainerOutlined rev="label" />} onClick={() => changeMenu("/admin/list/products", 0)} key='/admin/list/products'>
					<Link to="/admin/list/products">
						Məhsullar
					</Link>
				</Menu.Item> 
			</Menu>
 
		</div>
	);
};

export default Menus;