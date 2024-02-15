import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal, Input, message, Card, Divider } from 'antd';
import FormData from 'form-data';  
import { createOrder } from "../../api/orders"  
import Editor from './Editor';

const orderObj = { 
  pivotId: null, 
  isModalVisible: false,
  pivotPrice: "", 
  seller: "",
  orderPrice: "", 
  count: "", 
  pivotDesc: "", 
  description: "" 
}

const OrderProduct: React.FC<{ order: any, setOrder: Function }> = ({ order, setOrder }) => {
  
 
  const [loading, setLoading] = useState(false);  

 
  // Adjust datas for api  
  function orderEvent() { 
      if (order.count.length !== 0 && order.orderPrice.length !==0) {
        setLoading(true);

        const form = new FormData(); 
        form.append('pivot_id', order.pivotId);
        form.append('count', order.count);
        form.append('description', order.description);
        form.append('price', order.orderPrice); 

        createOrder(form).then(_res=>{
          setLoading(false);
          if(_res !==undefined) {
            message.success("Sifariş tamamlandı");
            setOrder((prevState:any) => ({ ...prevState,  isModalVisible: false }));
          }
        }).catch((err:any)=>{ throw err })

      } else {
        message.warning("Zəhmət olmasa bütün sahələri doldurun")
      } 
  }

 
  const onChange = (val:any, type: string) => setOrder((prevState:any) => ({ ...prevState,  [type]: val })); 
 

  return (<Modal title="Sifariş məlumatlarının əlavəsi" open={order.isModalVisible} width={1200}
          footer={[
            <Button key="back" onClick={() => setOrder(orderObj)}>
              Ləğv et
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={orderEvent}>
              Yadda saxla
            </Button>]}
          onCancel={() => setOrder(orderObj) }>  

          <Card title={`Firma: ${order.seller}`} style={{ margin: "15px 0" }}>
            <Card.Grid style={{ width: '25%', textAlign: 'center' }}>{order.pivotPrice}AZN</Card.Grid> 
            <Card.Grid style={{ width: '75%' }}>{order.pivotDesc}</Card.Grid>  
          </Card>
    
          <Input placeholder="Məhsul sayı" value={order.count} 
            onChange={(e)=>onChange(e.target.value, "count")} key="product-count" />
  
          <Editor onChange={onChange} data={order.description} />

          <Input placeholder="Təklif olunan qiymət" value={order.orderPrice} 
            onChange={(e)=>onChange(e.target.value, "orderPrice")} key="orderPrice" />  
 
        </Modal>);
}

export default OrderProduct;