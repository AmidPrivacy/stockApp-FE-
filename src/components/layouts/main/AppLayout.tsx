
import { Layout, Menu, Dropdown  } from 'antd';
import { Outlet } from "react-router-dom";  
import Menus from "./sider/index";
import { DownOutlined } from '@ant-design/icons'; 

const { Header, Footer, Sider, Content } = Layout; 

const AppLayout: React.FC = (props) => {
  
  function logout(e: any) {
    e.preventDefault(); 
    sessionStorage.clear();

    window.location.href =
      '/';
  }
 
  const menu = (
    <Menu> 
      <Menu.Item key='3'>
        <a target='_blank' rel='noopener noreferrer' href='/' onClick={logout}>
          Çıxış
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Header style={{
        width: "100%", height: "40px", lineHeight: "40px", padding: "0 5px", 
        textAlign: "center", backgroundColor: "#fff", color: "#000",
        fontSize: "25px", fontWeight: "bold", letterSpacing: "1px"
      }}>
        {sessionStorage.getItem("role") !=="seller" ? <>
          <span style={{ float: 'left', paddingLeft: '3px' }}>MENU</span>
          ONLINE SHOP
        </> : null}

        <Dropdown overlay={menu}>
          <a
            href="/"
            className='ant-dropdown-link'
            style={{ color: '#000', float: 'right', marginRight: '1%' }}
            onClick={(e) => e.preventDefault()}
          >
            {sessionStorage.getItem("full_name") !== undefined ? sessionStorage.getItem("full_name") : ""}
            <DownOutlined rev="label" style={{ width: "14px" }} />
          </a>
        </Dropdown>

      </Header>
      <Layout>
        {sessionStorage.getItem("role") !=="seller" ? <Sider><Menus /></Sider> : null}
        <Content><Outlet /></Content>
      </Layout> 

      {sessionStorage.getItem("role") !=="seller" ? 
        <Footer style={{ height: "30px", padding: 0, lineHeight: "30px", paddingLeft: "10px" }}>Footer</Footer> : null}
    </Layout>
  );
};

export default AppLayout;