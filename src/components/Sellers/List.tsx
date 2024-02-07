import React from 'react';
import { Table, Button, Popconfirm, message, Tag } from 'antd';
import { deleteSeller } from '../../api/user';
import FormData from 'form-data'; 

const { Column } = Table; 
 

const List: React.FC<{ users: any, handleTableChange: Function, pagination: any, getUserById: Function, getUsers: Function }> = 
            ({ users, handleTableChange, pagination, getUserById, getUsers }) => {
 

  function deleteUserEvent(id:number) {

    const formData = new FormData();
    formData.append('_method', "DELETE");
    deleteSeller(formData, id).then((res: any) => { 
        if (res.data.error == null) { 
          getUsers();
        } else {
          message.error(res.data.error);
        }  
    }).catch((err:any) => {
      console.log(err) 
      message.error("Sistem xətası");
    }); 
  }
 
  return (<Table dataSource={users} rowKey={(record: any) => record.id} pagination={pagination} locale={{ emptyText: "Məlumat tapılmadı" }}>
          <Column title="Firma" key="fullName" dataIndex="name" /> 
          <Column title="Nömrə" dataIndex="phone" key="phone" /> 
          <Column title="E-mail" key="email" dataIndex="email" />  
          <Column title="Məsul şəxs" key="contact_person" dataIndex="contact_person" />  
          <Column title="Ünvan" key="address" dataIndex="address" /> 
          <Column title="Kateqoriya(lar)" key="categories" render={(rec) => <>
            {rec.categories.map((res:any)=><Tag key={res.id}>{res.name}</Tag>)}
            </>} />  
          <Column title="" key="Actions" render={(rec) => <>
            <Button style={{ marginRight: "10px" }} onClick={()=>getUserById(rec.id)}> Düzəliş et </Button>
            <Popconfirm placement="top" title="İstifadəçini silmək istəyirsinizmi?" 
              onConfirm={() =>deleteUserEvent(rec.id)} okText="Bəli" cancelText="Xeyr">
                 <Button> Sil </Button>
            </Popconfirm> 
            </>} /> 
        </Table>);
}

export default List;