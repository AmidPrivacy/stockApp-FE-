/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { ContainerOutlined } from '@ant-design/icons'; 

const sideImg = require("../../../../assets/sidebar-5.jpg");

const Menus: React.FC = () => {
 
	const [activeMenu, setActiveMenu] = useState("/admin/products");
 
	useEffect(()=> setActiveMenu(window.location.pathname), [])
 
	function changeMenu(path: string, id: number) {
		let subPath = (id === 0) ? "" : id;
		setActiveMenu(path + subPath);
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
				{sessionStorage.getItem("role")==="admin" ?
					<Menu.Item icon={<ContainerOutlined rev="label" />} onClick={() => changeMenu("/", 0)} key='/'>
						<Link to="/">
							Ana səhifə
						</Link>
					</Menu.Item> : null}
				{sessionStorage.getItem("role")==="admin" ?
					<Menu.Item icon={<ContainerOutlined rev="label" />} onClick={() => changeMenu("/admin/users", 0)} key='/admin/users'>
						<Link to="/admin/users">
							İstifadəçilər
						</Link>
					</Menu.Item> : null}
				{sessionStorage.getItem("role")==="admin" ?
					<Menu.Item icon={<ContainerOutlined rev="label" />} onClick={() => changeMenu("/admin/categories", 0)} key='/admin/categories'>
						<Link to="/admin/categories">
							Kateqoriyalar
						</Link>
					</Menu.Item> : null}
				{sessionStorage.getItem("role")==="admin" ?
					<Menu.Item icon={<ContainerOutlined rev="label" />} onClick={() => changeMenu("/admin/sellers", 0)} key='/admin/sellers'>
						<Link to="/admin/sellers">
							Firmalar
						</Link>
					</Menu.Item> : null}
				{sessionStorage.getItem("role") !=="seller" ?
					<Menu.Item icon={<ContainerOutlined rev="label" />} onClick={() => changeMenu("/admin/products", 0)} key='/admin/products'>
						<Link to="/admin/products">
							Məhsullar
						</Link>
					</Menu.Item> : null}
				{sessionStorage.getItem("role") !== "admin" ?
					<Menu.Item icon={<ContainerOutlined rev="label" />} onClick={() => changeMenu("/admin/orders", 0)} key='/admin/orders'>
						<Link to="/admin/orders">
							Sifarişlər
						</Link>
					</Menu.Item> : null}

				{sessionStorage.getItem("role") === "user" ?
					<Menu.Item icon={<ContainerOutlined rev="label" />} onClick={() => changeMenu("/admin/stock", 0)} key='/admin/stock'>
						<Link to="/admin/stock">
							Stok
						</Link>
					</Menu.Item> : null}

				{sessionStorage.getItem("role") === "user" ?
					<Menu.Item icon={<ContainerOutlined rev="label" />} onClick={() => changeMenu("/admin/sales", 0)} key='/admin/sales'>
						<Link to="/admin/sales">
							Satışlar
						</Link>
					</Menu.Item> : null}
			</Menu>
 
		</div>
	);
};

export default Menus;