import React, { useState, useEffect } from 'react';
import { Button, Modal, Input, message, Select } from 'antd';
import { addNewSeller } from "../../api/user"; 
import { fetchCategoryList } from '../../api/categories';
 

const AddSeller: React.FC<{ getUsers: Function, visible: boolean, setVisible: Function, selectedUser: any, 
      setSelectedUser: Function }> = ({ getUsers, visible, setVisible, selectedUser, setSelectedUser }) => {
   
  const [loading, setLoading] = useState(false); 
  const [categories, setCategories] = useState([]); 
 

  useEffect(()=> {
    fetchCategoryList().then((res:any)=>{
      setCategories(res.data.data);  
    })
  }, []);

   
  function createNewUser() {
      
      if (selectedUser.name.length !== 0 && selectedUser.contactPerson.length !== 0 && 
          selectedUser.email.length !== 0 && (selectedUser.id || selectedUser.password)) {

        const form = new FormData();

        form.append('name', selectedUser.name);
        form.append('contact_person', selectedUser.contactPerson);
        form.append('email', selectedUser.email);
        form.append('phone', selectedUser.phone);
        form.append('address', selectedUser.address);
        selectedUser.categories.forEach((category:number) => {
          form.append('categories[]', category.toString());
        });
        

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


        addNewSeller(form, selectedUser.id).then((res: any) => {
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
 
     
          <Input placeholder="Firma daxil edin" value={selectedUser.name} className='inp-box' onChange={(e) => {
            setSelectedUser((prevState:any) => ({ ...prevState, name: e.target.value })) }} key="name" />
          
          <Input placeholder="Məsul şəxs" value={selectedUser.contactPerson} className='inp-box' onChange={(e) => {
            setSelectedUser((prevState:any) => ({ ...prevState, contactPerson: e.target.value })) }} key="contact_person" />

          <Input placeholder="Mob nömrə" value={selectedUser.phone} className='inp-box' onChange={(e) => {
            setSelectedUser((prevState:any) => ({ ...prevState, phone: e.target.value })) }} />

          <Input placeholder="E-poçt" value={selectedUser.email} className='inp-box' onChange={(e) => {
            setSelectedUser((prevState:any) => ({ ...prevState, email: e.target.value })) }} />

          <Input placeholder="Ünvan daxil edin" value={selectedUser.address} className='inp-box' onChange={(e) => {
            setSelectedUser((prevState:any) => ({ ...prevState, address: e.target.value })) }} key="address" />

          <Select
            mode="multiple" 
            style={{ width: '100%' }}
            placeholder="Kateqoriya seçin"
            value={selectedUser.categories}
            onChange={(val:any)=>setSelectedUser((prevState:any) => ({ ...prevState, categories: val }))} 
          >
            {categories.map((res:any) => <Select.Option value={res.id} key={res.id}>{res.name}</Select.Option>)}
          </Select>
      
          <Input placeholder="Şifrə" type="password" value={selectedUser.password} key="password" onChange={(e) => {
            setSelectedUser((prevState:any) => ({ ...prevState, password: e.target.value })) }} className='inp-box' />


        </Modal>);
}

export default AddSeller;