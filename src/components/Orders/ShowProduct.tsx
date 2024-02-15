import React from 'react';
import { Modal, Card } from 'antd'; 
 

const ShowProduct: React.FC<{ product: any, setProduct: Function }> = ({ product, setProduct }) => {
   
  
  return (<Modal title="Məhsul məlumatları" open={product.isModalVisible}
          footer={null} width={800}
          onCancel={() => { setProduct({ isModalVisible: false, name: "", barcode: "", description: "", image: "" }) }}>
  
          <Card title={`${product.name}`} style={{ margin: "15px 0" }}>
            <Card.Grid style={{ width: '50%' }}><b>Barkod:</b> {product.barcode}</Card.Grid> 
            <Card.Grid style={{ width: '50%', textAlign: 'center' }}><img src={product.image} style={{ width: "100%" }} alt='' /></Card.Grid> 
            <Card.Grid style={{ width: '100%' }}> <div  dangerouslySetInnerHTML={{__html: product.description}} /></Card.Grid>  
          </Card>

        </Modal>);

}

export default ShowProduct;