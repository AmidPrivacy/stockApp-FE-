import React, { useState } from 'react';
import { Button, Modal, Input, message, Card } from 'antd';
import FormData from 'form-data';  
import { offerOrder } from "../../api/orders"   

const orderObj = { 
  orderId: null, 
  isModalVisible: false,
  description: "", 
  offerPrice: "",  
  count: "",  
  price: "",   
}

const SendOffer: React.FC<{ order: any, setOrder: Function, getOrders: Function }> = ({ order, setOrder, getOrders }) => {
  
 
  const [loading, setLoading] = useState(false);  

 
  // Adjust datas for api  
  function orderEvent() { 
      if (order.count.length !== 0 && order.price.length !==0) {
        setLoading(true); 

        const form = new FormData();  
        form.append('count', order.count); 
        form.append('price', order.price); 

        offerOrder(form, order.orderId).then(_res=>{
          setLoading(false);
          if(_res !==undefined) {
            message.success("Təklif göndərildi");
            setOrder((prevState:any) => ({ ...prevState,  isModalVisible: false }));
            getOrders()
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

          <Card title={null} style={{ margin: "15px 0" }}> 
            <Card.Grid style={{ width: '25%' }}><b>Təklif qiyməti:</b> <div> {order.offerPrice}AZN</div></Card.Grid> 
            <Card.Grid style={{ width: '75%' }}><b>Sifariş rəyi:</b> <div  dangerouslySetInnerHTML={{__html: order.description}} /></Card.Grid>  
          </Card>
          <div style={{ marginBottom: "40px", height: "34px" }}>
            <Input addonBefore="Say:" value={order.count} style={{ width: "48%", float: "left" }}
              onChange={(e)=>onChange(e.target.value, "count")} key="product-count" />
    
            <Input addonBefore="Qiymət:" value={order.price} style={{ width: "48%", float: "left", marginLeft: "4%" }}
              onChange={(e)=>onChange(e.target.value, "price")} key="price" />  
          </div>
        </Modal>);
}

export default SendOffer;