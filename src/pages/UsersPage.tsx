import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Breadcrumb } from 'antd';
import { fetchUserList, fetcUserById } from "../api/user";
 
// import Search from '../components/Users/search';
import List from '../components/Users/List';
import AddUser from '../components/Users/AddUser'; 

let person = {
  id: null,
  firstName: "", 
  lastName: "", 
  password: "", 
  email: "",
  image: "", 
}

const UsersPage: React.FC = () => {

  const [search, setSearch] = useState({ name: "", number: "", email: "" });
  const [selectedUser, setSelectedUser] = useState(person);  
  const [users, setUsers] = useState([]); 
  const [visible, setVisible] = useState(false);  
  const [pagination, setPagination] = useState({ pageSize: 10, current: 1, total: 0 }); 

  useEffect(() => { getUsers() }, [search]);
  
  function getUsers() {
    fetchUserList(search).then((res:any)=>{  
      setUsers(res?.data?.data??[]) 
    }).catch((err:any)=>{
      throw err;
    })
  }
 
  

  function getUserById(id:number) {
    fetcUserById(id).then((res: any) => { 
      setVisible(true);
      setSelectedUser({
        id: res.data.data.id,
        firstName: res.data.data.first_name, 
        lastName: res.data.data.last_name, 
        password: "", 
        email: res.data.data.email,   
        image: res.data.data.image, 
      }); 
    })
  }
 

  // Pagination event
  function handleTableChange(page: any) { 
    setPagination(page);
    getUsers()
  };
 
  return (<div style={{ marginTop: "30px" }}>

    <Row>

      {/************* Top of table ***********/}
      <Col span={7} offset={1}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href="/">Ana səhifə</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item> İstifadəçilər </Breadcrumb.Item>
        </Breadcrumb>
      </Col>
      <Col span={2} offset={14}>
        <Button type="primary" style={{ paddingRight: "15px" }}
          onClick={() => { setVisible(true); setSelectedUser(person) }} key="new-price">Yeni +</Button>
      </Col>
    </Row>

    
    {/************* Filter for columns ***********/}
    {/* <Search search={search} setSearch={setSearch} /> */}


    {/************* Add new user ***********/}
    <Row>
      <Col span={22} offset={1} style={{ marginTop: "10px" }}>

        <List users={users} getUsers={getUsers} pagination={pagination} getUserById={getUserById} handleTableChange={handleTableChange} />

        <AddUser getUsers={getUsers} visible={visible} setVisible={setVisible} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      
      </Col>
    </Row>
   
  </div>);
}

export default UsersPage;