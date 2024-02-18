import React, { useState } from 'react';
import { Table, Button, message } from 'antd'; 
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
                                rowKey={(record: any) => record.id} locale={{ emptyText: "Məlumat tapılmadı" }}>
      
      <Column title="Məsul adı" key="product-name" render={(rec) => <Button onClick={()=>setterProduct(rec.product)}> {rec.product.name} </Button>} />
      <Column title="Məhsul sayı" dataIndex="count" key="count" /> 
      <Column title="Qiymət(AZN)" key="price" render={(rec) => 
        <Button onClick={()=>setPrice({ isModalVisible: true, stockId: rec.id,
                  price: rec.price??"" })}> {rec.price??"Əlavə et"} </Button>} /> 

    </Table>

    <ShowProduct product={product} setProduct={setProduct} />
    <AddPrice obj={priceModal} setPrice={setPrice} getStocks={getStocks} />
  </>);
}

export default List;