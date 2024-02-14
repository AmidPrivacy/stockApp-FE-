import React, { useState } from 'react';
import { Button, Modal, Input, message } from 'antd';
import { addNewUser, updateUser } from "../../api/user"; 
 

const AddUser: React.FC<{ getUsers: Function, visible: boolean, setVisible: Function, selectedUser: any, 
      setSelectedUser: Function }> = ({ getUsers, visible, setVisible, selectedUser, setSelectedUser }) => {
   
  const [loading, setLoading] = useState(false); 
 
   
  function createNewUser() {
      
      if (selectedUser.firstName.length !== 0 && selectedUser.lastName.length !== 0 && 
          selectedUser.email.length !== 0 && (selectedUser.id || selectedUser.password)) {

        const form = new FormData();

        form.append('first_name', selectedUser.firstName);
        form.append('last_name', selectedUser.lastName);
        form.append('email', selectedUser.email);

        if(selectedUser.id !==null ) { 
          form.append('_method', "PUT"); 
          if(selectedUser.password !=="" ) { 
            form.append('password', selectedUser.password);
            form.append('password_confirmation', selectedUser.password); 
          }
        } 
        else { 
          form.append('password', selectedUser.password);
          form.append('password_confirmation', selectedUser.password); 
        }
 

        setLoading(true);


        addNewUser(form, selectedUser.id).then((res: any) => {
          if (res !== undefined) {
            if (res.data.error == null) {
              setVisible(false);
              getUsers();
            } else {
              message.error(res.data.error);
            }
          }
          setLoading(false);
        }).catch((err:any) => {
          console.log(err)
          setLoading(false);
        });
      } else {
        message.warning("Zəhmət olmasa bütün sahələri doldurun")
      }
  }
  
 

 
  return (<Modal title="İstifadəçi əlavəsi" open={visible}
          footer={[
            <Button key="back" onClick={() => { setVisible(false) }}>
              Ləğv et
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={createNewUser}>
              Yadda saxla
            </Button>,
          ]}
          onCancel={() => { setVisible(false) }}>
 
     
          <Input placeholder="Soyad daxil edin" value={selectedUser.firstName} className='inp-box' onChange={(e) => {
            setSelectedUser((prevState:any) => ({ ...prevState, firstName: e.target.value })) }} key="first_name" />
          
          <Input placeholder="Ad daxil edin" value={selectedUser.lastName} className='inp-box' onChange={(e) => {
            setSelectedUser((prevState:any) => ({ ...prevState, lastName: e.target.value })) }} key="last_name" />

          <Input placeholder="E-poçt" value={selectedUser.email} className='inp-box' onChange={(e) => {
            setSelectedUser((prevState:any) => ({ ...prevState, email: e.target.value })) }} />
      
          <Input placeholder="Şifrə" type="password" value={selectedUser.password} key="password" onChange={(e) => {
            setSelectedUser((prevState:any) => ({ ...prevState, password: e.target.value })) }} className='inp-box' />


        </Modal>);
}

export default AddUser;