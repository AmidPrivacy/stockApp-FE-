import React from 'react';
import { Button, Table, Popconfirm, message, Tag } from 'antd'; 
import { deleteProduct, detachSellerToProduct } from '../../api/products';
import FormData from 'form-data';  

const { Column } = Table;   


 


const List: React.FC<{ products: any, pagination:any, setSettings: Function, handleTableChange: Function, loading: any, 
        getProducts: Function }> = ({ products, setSettings, pagination, handleTableChange, loading, getProducts }) => {
 
  



  function handleDelete(id: any): void {

    const formData = new FormData();
    formData.append('_method', "DELETE")
    deleteProduct(formData, id).then(_res=>{
      message.success("Məhsul silindi");
      getProducts();
    })

  }

  function deleteRelationEvent(productId: number, sellerId: number): void {
    
    const form = new FormData();
    form.append('seller_id', sellerId);  
    form.append('_method', "PUT");

    detachSellerToProduct(form, productId).then(_res=>{
      message.success("seçilən firma məhsula bağlandı");
      getProducts(); 
    }).catch((err:any)=>{ throw err })

  }
 

  return (<Table dataSource={products} rowKey={(record: any) => record.id} onChange={()=>handleTableChange()} loading={loading}
  className='product-table'  pagination={pagination} locale={{ emptyText: "Məlumat tapılmadı" }}>

  
  <Column title="Id" dataIndex="id" key="id" /> 

  <Column title="Məhsul"  dataIndex="name" key="name" /> 
  <Column title="Barkod"  dataIndex="barcode" key="barcode" /> 

  
  <Column title="Şəkil" 
    render={(rec) => {
      return <>
        {rec.image !==null ? <img src={rec.image.url} alt='' style={{ width: "60px", display: "block" }} /> : null}
        <Button onClick={() => {  
          setSettings((prevState:any) => ({ ...prevState,  imgVisible: true, id: rec.id })); 
        }}>Ətraflı</Button> 
      </>
    }} key="picture" /> 

 

    <Column title="Firmalar" 
      render={(rec) => { 
        return <> 
        <div key={rec.id}>
          {rec.sellers.map((res:any)=> <Popconfirm placement="top"  key={res.id}
            title="Firmanı məhsuldan ayırmaq istəyirsinizmi?" 
            onConfirm={() =>deleteRelationEvent(rec.id, res.id)} 
            okText="Bəli" cancelText="Xeyr">
              <Tag key={res.id}>{res.name} - <b>{res.price+"AZN"}</b> <br /> {res.description} </Tag>
            </Popconfirm>)} 
        </div>
        <Button style={{ marginTop: "10px" }} onClick={() => {  
            setSettings((prevState:any) => ({ ...prevState,  firmVisible: true, id: rec.id })); 
          }}>Əlavə et</Button> 
          </>
      }} key="company" />
 

  <Column title="" key="Actions" width={200} render={(rec) => <>
    <Popconfirm placement="top" title="Məhsulu silmək istəyirsinizmi?" 
      onConfirm={() =>handleDelete(rec.id)} okText="Bəli" cancelText="Xeyr">
        <Button> Sil </Button>
    </Popconfirm>
   
    <Button style={{ marginLeft: "5px" }} key={rec.id} 
      onClick={()=>setSettings((prev:any)=>({ ...prev, addVisible: true, id: rec.id }))}> Düzəliş et </Button>
  </>} /> 

</Table> );
}

export default List;