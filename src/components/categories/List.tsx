import React from 'react';
import { Button, Table, Popconfirm, message } from 'antd'; 
import { deleteCategory } from '../../api/categories';
import FormData from 'form-data'; 

const { Column } = Table;   

 

const List: React.FC<{ categories: any, pagination:any, setModalVisible: Function, handleTableChange: Function, 
  loading: any, setSelectedObj: Function, getCategories: Function }> = 
  ({ categories, setModalVisible, setSelectedObj, pagination, handleTableChange, loading, getCategories }) => {
 
  



  function handleDelete(id: any): void {

    const formData = new FormData();
    formData.append('_method', "DELETE")
    deleteCategory(formData, id).then(_res=>{
      message.success("Kateqoriya silindi");
      getCategories();
    })

  }
 

  return (<Table dataSource={categories} rowKey={(record: any) => record.id} 
            onChange={(page:any)=>handleTableChange(page)} loading={loading}
            pagination={pagination} locale={{ emptyText: "Məlumat tapılmadı" }}>

  <Column title="Kateqoriya" dataIndex="name" key="name" />   

  {/* <Column title="Şəkil" 
    render={(rec) => {
      return <>
        {rec.image !==null ? <img src={rec.image.url} alt='' style={{ width: "60px", display: "block" }} /> : null} 
      </>
    }} key="picture" />  */}
 
  {/* Add new child and delete row - actions */}
  <Column title="" key="Actions" width={250} render={(rec) => <>
      <Button style={{ marginLeft: "5px", marginRight: "10px" }} key={rec.id} 
        onClick={()=>{ setModalVisible((prev:any)=>({ ...prev, category: true }));
                      setSelectedObj((prevState:any) => ({ ...prevState, rowId: rec.id })) }}> Düzəliş et </Button>
      <Popconfirm placement="top" title="Kateqoriyanı silmək istəyirsinizmi?" 
        onConfirm={() =>handleDelete(rec.id)} okText="Bəli" cancelText="Xeyr"> 
          <Button> Sil </Button>
      </Popconfirm> 
    </>} 
  /> 
</Table> );
}

export default List;