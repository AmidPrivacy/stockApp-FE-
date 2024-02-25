import React from 'react'; 
import Barcode from 'react-barcode';   
import './print.css';

import { Modal } from 'antd';

const PrintBarcode: React.FC<{ data: { isModalVisible: boolean, id: number, barcode: string, 
                    price: string }, setData: Function }> =  ({ data, setData }) => {

  return ( <Modal title={null} open={data.isModalVisible} footer={null} style={{     width: "42mm" }}
          onCancel={() => { setData({ isModalVisible: false, productName: "", barcode: "", price: "" }) }}>
      <div className='Ticket' id='TicketQueue'>  
        <div className='ticket-body'> 
          <h4 className='product-price'> {data.price} AZN / {data.id}</h4>
          {data.barcode.length>0 ? <Barcode value={data.barcode} /> : null}
        </div>
      </div>
  </Modal>);
  }

  export default PrintBarcode;