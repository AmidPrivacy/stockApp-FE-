import React, { useState } from 'react';
import { Table, Button, message, Tag } from 'antd'; 
import ShowProduct from '../Orders/ShowProduct';


const { Column } = Table; 
 

const List: React.FC<{ sales: any, handleTableChange: Function, pagination: any, getSales: Function }> = 
            ({ sales, handleTableChange, pagination, getSales }) => {
 
  const [product, setProduct] = useState({ isModalVisible: false, name: "", barcode: "", description: "", image: "" })
  
 
  const setterProduct = (obj:any) => {
    setProduct({ isModalVisible: true, 
      name: obj.name, barcode: obj.barcode, description: obj.description, image: obj.image.url })
  }

 
  return (<>
    <Table style={{ minWidth: "769px", marginBottom: "20px" }} dataSource={sales}  pagination={pagination}
      onChange={(e)=>handleTableChange(e)} rowKey={(record: any) => record.id} locale={{ emptyText: "Məlumat tapılmadı" }}>
      
      <Column title="Məsul" key="product-name" render={(rec) => <Button onClick={()=>setterProduct(rec.product)}> {rec.product.name} </Button>} />
      <Column title="Firma" key="firm-name" render={(rec) => <Tag> {rec.seller.name} </Tag>} />
      <Column title="Məhsul sayı" dataIndex="count" key="count" /> 
      <Column title="Qiymət(AZN)" key="price" dataIndex="price" /> 
      <Column title="Tarix" key="date" dataIndex="created_at" /> 

    </Table>

    <ShowProduct product={product} setProduct={setProduct} />
    
  </>);
}

export default List;