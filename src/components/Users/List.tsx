import React from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import { deleteUser } from '../../api/user';
 
const { Column } = Table; 
 

const List: React.FC<{ users: any, handleTableChange: Function, pagination: any, getUserById: Function, getUsers: Function }> = 
            ({ users, handleTableChange, pagination, getUserById, getUsers }) => {
 

  function deleteUserEvent(id:number) {
    deleteUser({ userId: id, status: 0 }).then((res: any) => { 
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
          <Column title="Ad soyad" key="fullName" dataIndex="name" />
          <Column title="Şəkil" render={(rec) => { return <img src={rec.picture} alt="" /> }} key="picture" /> 
          <Column title="Nömrə" dataIndex="number" key="number" /> 
          <Column title="E-mail" key="email" dataIndex="email" />  
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