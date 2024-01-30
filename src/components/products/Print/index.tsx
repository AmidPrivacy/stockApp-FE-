import { message } from 'antd';
import React, { useEffect, useState } from 'react'; 
import { useParams } from 'react-router-dom';
// import QRCode from "react-qr-code";
import { fetchProductById } from "../../../api/products";  
 
import './print.css';

function PrintProduct() {
 
  let { id } = useParams<{ id: string }>();

  const [productInfo, setProductInfo] = useState({
    productName: "",
    mobileNumber: "050 522 17 86", 
    price: "", 
  }); 

  useEffect(() => {
    fetchProductById(Number(id)).then((res:any) => { 
      let data = res.data.data; 
      setProductInfo((prevState:any) => ({ ...prevState,  productName: data.name, price: data.price }))
    }); 
  }, []);

  return ( <div className='Ticket' id='TicketQueue'>  
      <div className='ticket-body'>
        <h4 className='ticket-name'>{productInfo.productName}</h4>
        {/* <QRCode value={id??""} size={54} style={{ float: "left", width: "28%" }} /> */}
        <h2 className='product-price'> {productInfo.price} AZN</h2>
        <p className='phone-number'>
          <b>Tel: </b> {productInfo.mobileNumber}
        </p> 
      </div>
  </div>);
  }

  export default PrintProduct;