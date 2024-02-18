import React, { useState } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import { deleteOrder, acceptOrder, rejectOrder } from '../../api/orders'; 
import ShowProduct from './ShowProduct';
import SendOffer from './SendOffer';

const { Column } = Table; 
 
enum statuses {
  New = 1,
  Completed = 2,
  Rejected = 3,
  Pending = 4,
  Cancelled = 5,
}

const List: React.FC<{ orders: any, handleTableChange: Function, pagination: any, getOrders: Function }> = 
            ({ orders, handleTableChange, pagination, getOrders }) => {
 
  const [product, setProduct] = useState({ isModalVisible: false, name: "", barcode: "", description: "", image: "" });
  const [order, setOrder] = useState({ orderId: null, isModalVisible: false, description: "", 
                                        offerPrice: "", count: "", price: "" });

  const CancelOrderEvent = (id:number) => { 
    deleteOrder(id).then((res: any) => {  
        if (res  && res.data.error == null) { 
          getOrders();
          message.success("Sifariş silindi");
        }  
    })  
  }

  const AcceptOrderEvent = (id:number) => { 
    acceptOrder(id).then((res: any) => {  
        if (res  && res.data.error == null) { 
          getOrders();
          message.success("Sifariş təsdiqləndi");
        }  
    })  
  }

  const RejectOrderEvent = (id:number) => { 
    rejectOrder(id).then((res: any) => {  
        if (res  && res.data.error == null) { 
          getOrders();
          message.success("Sifariş imtina edildi");
        }  
    })  
  }

  const setterProduct = (obj:any) => {
    setProduct({ isModalVisible: true, 
      name: obj.name, barcode: obj.barcode, description: obj.description, image: obj.image.url })
  }
 
  return (<>
    <Table style={{ minWidth: "769px", marginBottom: "20px" }}
      dataSource={orders} rowKey={(record: any) => record.id} pagination={pagination} locale={{ emptyText: "Məlumat tapılmadı" }}>
      <Column title="Təklif qiyməti" key="buyer_price" render={(rec) => <> {rec.buyer_price}AZN </>} /> 
      <Column title="Satıcı qiyməti" key="seller_price" render={(rec) => <> {rec.product_price??0}AZN </>} /> 
      <Column title="Məhsul sayı" dataIndex="count" key="count" /> 
      <Column title="Sifariş rəyi" key="description" render={(rec) => <div  dangerouslySetInnerHTML={{__html: rec.description}} />} />   
      {sessionStorage.getItem("role") !=="seller" ?
        <Column title="Satıcı firma" key="seller-name" render={(rec) => <> {rec.seller.name} </>} /> : null} 
      <Column title="Məsul adı" key="product-name" render={(rec) => <Button onClick={()=>setterProduct(rec.product)}> {rec.product.name} </Button>} /> 
      <Column title="Sifariş statusu" key="status" render={(rec) => <> {rec.status.name} </>} />   
      <Column title="Firma təklifi" key="seller-offer" render={(rec) => rec.seller_price !==null ? <> 
        <p><b>Qiymət:</b> {rec.seller_price} AZN</p>  
        <p><b>Say:</b> {rec.seller_count}</p>   
        </>: <></>} />   
      <Column title="" key="Actions" render={(rec) => <>
        
        {(rec.status.value===statuses.New && sessionStorage.getItem("role")==="seller") ||
          (rec.status.value===statuses.Pending && sessionStorage.getItem("role")==="user") ? <>

          <Popconfirm placement="top" title="Sifarişi təsdiqləmək istəyirsinizmi?" 
            onConfirm={() =>AcceptOrderEvent(rec.id)} okText="Bəli" cancelText="Xeyr">
            <Button style={{ marginRight: "10px" }}> Təsdiq </Button>
          </Popconfirm>
 
          <Popconfirm placement="top" title="Sifarişi imtina etmək istəyirsinizmi?" 
            onConfirm={() =>RejectOrderEvent(rec.id)} okText="Bəli" cancelText="Xeyr">
            <Button style={{ margin: "10px 10px 10px 0" }}> Imtina </Button>
          </Popconfirm>
          
          </>   : null}

          {rec.status.value===statuses.New && sessionStorage.getItem("role")==="seller" ?
            <Button style={{ margin: "10px 10px 10px 0" }} onClick={()=>{
            setOrder({ orderId: rec.id, isModalVisible: true, description: rec.description, 
                      offerPrice: rec.buyer_price, count: rec.buyer_count, price: rec.product_price })
          }}> Xüsusi təklif </Button> : null}

        {rec.status.value===statuses.New && sessionStorage.getItem("role")==="user" ? 
          <Popconfirm placement="top" title="Sifarişi silmək istəyirsinizmi?" 
            onConfirm={() =>CancelOrderEvent(rec.id)} okText="Bəli" cancelText="Xeyr">
              <Button> Sifarişi sil </Button>
          </Popconfirm> : null}
 
        </>} /> 
    </Table>
    <ShowProduct product={product} setProduct={setProduct} />
    <SendOffer order={order} setOrder={setOrder} getOrders={getOrders} />
  </>);
}

export default List;