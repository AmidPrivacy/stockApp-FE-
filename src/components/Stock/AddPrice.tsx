import React, { useState } from 'react';
import { Button, Modal, Input, message } from 'antd';
import { addNewPrice } from "../../api/user";  
 

const AddPrice: React.FC<{ getStocks: Function, obj: { isModalVisible: boolean, price: string | null, 
    stockId: number | null }, setPrice: Function }> = ({ getStocks, obj, setPrice }) => {
   
  const [loading, setLoading] = useState(false);  
  
   
  function addPriceEvent() {
      
      if (obj.price?.length !== 0) {

        setLoading(true);

        const form = new FormData(); 
        form.append('price', obj.price??"");
        form.append('_method', "PUT"); 
          
        addNewPrice(form, obj.stockId??0).then((res: any) => {
          if (res !== undefined) { 
            setPrice({ isModalVisible: false, stockId: null,  price: null });
            getStocks(); 
          }
          setLoading(false);
        }).catch((err:any) => {
          console.log(err)
          setLoading(false);
        });

      } else {
        message.warning("Zəhmət olmasa qiymət daxil edin")
      }
  }
  
 

 
  return (<Modal title="Qiymət əlavəsi/dəyişdirilməsi" open={obj.isModalVisible}
          footer={[
            <Button key="back" onClick={() => { setPrice({ isModalVisible: false, stockId: null,  price: null }) }}>
              Ləğv et
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={addPriceEvent}>
              Yadda saxla
            </Button>,
          ]}
          onCancel={() => { setPrice({ isModalVisible: false, stockId: null,  price: null }) }}>
 
          <Input placeholder="Qiymət daxil edin" value={obj.price??""} className='inp-box' onChange={(e) => {
            setPrice((prevState:any) => ({ ...prevState, price: e.target.value })) }} key="name" />
           
        </Modal>);
}

export default AddPrice;