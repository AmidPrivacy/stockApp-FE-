import React, { useState } from 'react';
import { Table, Button, message, Tag } from 'antd'; 
import ShowProduct from '../Orders/ShowProduct';
import AddPrice from './AddPrice';

const { Column } = Table; 
 

const List: React.FC<{ orders: any, handleTableChange: Function, pagination: any, getStocks: Function }> = 
            ({ orders, handleTableChange, pagination, getStocks }) => {
 
  const [product, setProduct] = useState({ isModalVisible: false, name: "", barcode: "", description: "", image: "" })
  const [priceModal, setPrice] = useState({ isModalVisible: false, stockId: null,  price: null });
 
  const setterProduct = (obj:any) => {
    setProduct({ isModalVisible: true, 
      name: obj.name, barcode: obj.barcode, description: obj.description, image: obj.image.url })
  }
 
 
  return (<>
    <Table style={{ minWidth: "769px", marginBottom: "20px" }} dataSource={orders}  pagination={pagination}
      onChange={(e)=>handleTableChange(e)} rowKey={(record: any) => record.id} locale={{ emptyText: "Məlumat tapılmadı" }}>
      
      <Column title="Id" key="id" render={(rec) =><span>{rec.product.id}</span>} />
      <Column title="Məsul adı" key="product-name" render={(rec) => <Button onClick={()=>setterProduct(rec.product)}> {rec.product.name} </Button>} />
      <Column title="Məhsul sayı" dataIndex="count" key="count" /> 

      <Column title="Alış qiyməti(AZN)" key="buyer-price" render={(rec) => <Tag> {rec.orders[0].seller_price??rec.orders[0].buyer_price} </Tag>} /> 

      <Column title="Satış qiyməti(AZN)" key="seller-price" render={(rec) => 
        <Button onClick={()=>setPrice({ isModalVisible: true, stockId: rec.id,
                  price: rec.price??"" })}> {rec.price??"Əlavə et"} </Button>} /> 

      <Column title="Gəlir faizi" key="buyer-percentage" render={(rec) => rec.price ? 
        <Tag> {(100-(rec.orders[0].buyer_price*100)/rec.price).toFixed(2)} </Tag> : null} /> 

    </Table>

    <ShowProduct product={product} setProduct={setProduct} />
    <AddPrice obj={priceModal} setPrice={setPrice} getStocks={getStocks} />
  </>);
}

export default List;