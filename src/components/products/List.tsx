import React from 'react';
import { Button, Tag, Table, Popconfirm } from 'antd'; 
   
const { Column } = Table;   


 


const List: React.FC<{ products: any, pagination:any, setSettings: Function, handleTableChange: Function, loading: any }> = 
                          ({ products, setSettings, pagination, handleTableChange, loading }) => {
 
  



    function handleDelete(id: any): void {
      throw new Error('Function not implemented.');
    }
 

  return (<Table dataSource={products} rowKey={(record: any) => record.id} onChange={()=>handleTableChange()} loading={loading}
  className='product-table'  pagination={pagination} locale={{ emptyText: "Məlumat tapılmadı" }}>

  
  <Column title="Id" dataIndex="id" key="id" /> 

  <Column title="Məhsul"  dataIndex="name" key="name" /> 
  <Column title="Barkod"  dataIndex="barcode" key="barcode" /> 

  
  <Column title="Şəkil" 
    render={(rec) => {
      return <Button onClick={() => {  
          setSettings((prevState:any) => ({ ...prevState,  imgVisible: true, id: rec.id })); 
        }}>Ətraflı</Button> 
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