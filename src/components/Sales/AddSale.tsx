import React, { useState } from 'react';
import { Button, Modal, Input, List, InputNumber } from 'antd'; 
 

const AddSale: React.FC<{ isVisible: boolean, setVisible: Function, getSales: Function }> = 
                                                    ({ isVisible, setVisible, getSales }) => {
   
  const [loading, setLoading] = useState(false);  
  const [barcode, setBarcode] = useState("");
  const [products, setProducts] = useState([{
    id: 5,
    name: "Oyuncaq Gəlincik (DJ 399-E) Model 1",
    barcode: "2323434",
    firm: "Smart toys",
    price: 15.00,
    count: 1
  }]);


  function checkingEvent() {
       
  }

  const setValue = (e: number|null, code: string) => { 
  
    const index = products.findIndex((obj:any) => obj.barcode===code);
    let arr = JSON.parse(JSON.stringify(products));
    arr[index].count = e??1;
    setProducts(arr); 

  }

 
  return (<Modal title="Satış pəncərəsi" open={isVisible}
          footer={null} width={1000}
          onCancel={() => { setVisible(false) }}
          >
 
          <Input placeholder="Barkod daxil edin" value={barcode} className='inp-box' key="barcode" onChange={(e) => 
            setBarcode(e.target.value)} style={{ width: "200px", float: "right", zIndex: "10", marginRight: "15px" }} />

          <List
            size="large"
            header={<div>Məhsullar</div>}
            footer={<div>Toplam qiymət: <b style={{ float: "right" }}>{products.reduce((sum, current))}AZN</b></div>}
            bordered
            dataSource={products}
            renderItem={(item) => <List.Item key={item.barcode}>
              <List.Item key={item.barcode+item.name}>{item.name}</List.Item>
              <List.Item key={item.barcode}>{item.barcode}</List.Item> 
              <List.Item key={item.barcode+item.firm}>{item.firm}</List.Item> 
              <List.Item key={item.barcode+item.price}>{item.price}AZN</List.Item> 
              <List.Item>
                <InputNumber value={item.count} onChange={(e)=>setValue(e, item.barcode)} />
              </List.Item> 
            </List.Item>}
          />
           
        </Modal>);
}

export default AddSale;