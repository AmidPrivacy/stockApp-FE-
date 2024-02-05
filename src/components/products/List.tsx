import React from 'react';
import { Button, Table, Popconfirm, message } from 'antd'; 
import { deleteProduct } from '../../api/products';
   
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


  {/* <Column title="Firmalar" 
    render={(rec) => {
      return <>
      <div key={rec.id}>
        {rec.companies.map((res:any)=> <Popconfirm placement="top" 
          title="Firmanı məhsuldan çıxarmaq istəyirsinizmi?" onConfirm={() =>console.log(res.id)} 
          okText="Bəli" cancelText="Xeyr">
            <Tag key={res.id}>{res.name} {res.price+"AZN"}</Tag>
          </Popconfirm>)} 
      </div>
      <Button style={{ marginTop: "10px" }} onClick={() => {  
          setSettings((prevState:any) => ({ ...prevState,  firmVisible: true, id: rec.id })); 
        }}>Əlavə et</Button> </>
    }} key="company" />  */}

  
  {/* <Column title="Qiymət(AZN)" dataIndex="price" key="price" />   */}

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