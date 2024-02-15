import React, { useState } from 'react';
import { Table, Button, Popconfirm } from 'antd';
import { deleteOrder } from '../../api/orders'; 
import ShowProduct from './ShowProduct';

const { Column } = Table; 
 

const List: React.FC<{ orders: any, handleTableChange: Function, pagination: any, getOrders: Function }> = 
            ({ orders, handleTableChange, pagination, getOrders }) => {
 
  const [product, setProduct] = useState({ isModalVisible: false, name: "", barcode: "", description: "", image: "" })

  function CancelOrderEvent(id:number) {
 
    deleteOrder(id).then((res: any) => {  
        if (res  && res.data.error == null) { 
          getOrders();
        }  
    }) 

  }

  const setterProduct = (obj:any) => {
    setProduct({ isModalVisible: true, 
      name: obj.name, barcode: obj.barcode, description: obj.description, image: obj.image.url })
  }
 
  return (<>
    <Table dataSource={orders} rowKey={(record: any) => record.id} pagination={pagination} locale={{ emptyText: "Məlumat tapılmadı" }}>
      <Column title="Təklif qiyməti" key="buyer_price" render={(rec) => <> {rec.buyer_price}AZN </>} /> 
      <Column title="Satıcı qiyməti" key="seller_price" render={(rec) => <> {rec.buyer_price}AZN </>} /> 
      <Column title="Məhsul sayı" dataIndex="count" key="count" /> 
      <Column title="Sifariş rəyi" key="description" render={(rec) => <div  dangerouslySetInnerHTML={{__html: rec.description}} />} />   
      {sessionStorage.getItem("role") !=="seller" ?
        <Column title="Satıcı firma" key="seller-name" render={(rec) => <> {rec.seller.name} </>} /> : null} 
      <Column title="Məsul adı" key="product-name" render={(rec) => <Button onClick={()=>setterProduct(rec.product)}> {rec.product.name} </Button>} /> 
      <Column title="Sifariş statusu" key="status" render={(rec) => <> {rec.status.name} </>} />   
      <Column title="" key="Actions" render={(rec) => <>
        {/* <Button style={{ marginRight: "10px" }} onClick={()=>getUserById(rec.id)}> Düzəliş et </Button> */}
        {rec.status.name==="New" && sessionStorage.getItem("role")==="user" ? 
          <Popconfirm placement="top" title="Sifarişi silmək istəyirsinizmi?" 
            onConfirm={() =>CancelOrderEvent(rec.id)} okText="Bəli" cancelText="Xeyr">
              <Button> Sifarişi sil </Button>
          </Popconfirm> : null}
        </>} /> 
    </Table>
    <ShowProduct product={product} setProduct={setProduct} />
  </>);
}

export default List;