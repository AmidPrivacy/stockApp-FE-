import React, { useEffect, useState } from 'react'; 
import Barcode from 'react-barcode';   
 
import './print.css';
import { Modal } from 'antd';

const PrintProduct: React.FC<{ data: {isModalVisible: boolean, productName: string, 
          barcode: string, price: string}, setData: Function }> =  ({ data, setData }) => {
   

  return ( <Modal title={null} open={data.isModalVisible} footer={null} width={450} 
          onCancel={() => { setData({ isModalVisible: false, productName: "", barcode: "", price: "" }) }}>
      <div className='Ticket' id='TicketQueue'>  
        <div className='ticket-body'>
          <h2 className='ticket-name'>{data.productName}</h2>
          <h4 className='product-price'> {data.price} AZN</h4>
          <Barcode value={data.barcode} /> 
        </div>
      </div>
  </Modal>);
  }

  export default PrintProduct;