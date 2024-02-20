import React, { useState } from 'react';
import { Button, Modal, Input, List, InputNumber, Popconfirm, message } from 'antd'; 
import { DeleteOutlined } from '@ant-design/icons'; 
import { addNewSale, checkBarcode } from '../../api/user';
import FormData from 'form-data';  

const AddSale: React.FC<{ isVisible: boolean, setVisible: Function, getSales: Function }> = 
                                                    ({ isVisible, setVisible, getSales }) => {
   
  const [loading, setLoading] = useState(false);  
  const [barcode, setBarcode] = useState("");
  const [products, setProducts] = useState<{ id: number, price: number, count: number,
                                            name: string, firm: string, barcode: string, maxCount: number }[]>([]);


  function checkingEvent(event: any) { 
    if(barcode.length>0 && event.keyCode === 13)
      checkBarcode(barcode).then((res:any)=>{ 
        if(res !==undefined) {
          const index = products.findIndex((item:any)=>item.id===res.data.id);

          if(index>=0) {
            let newArr = JSON.parse(JSON.stringify(products));
            newArr[index].count +=1;
            setProducts(newArr)
          } else {
            const obj = {
              id: res.data.id,
              price: res.data.price,
              count: 1,
              name: res.data.product.name,
              firm: res.data.seller.name,
              barcode: res.data.barcode,
              maxCount: res.data.available_count
            }
            setProducts([ ...products, obj ])
          }
        }
      }).catch(err => message.error(err.message))
  }

  const setValue = (e: number|null, code: string) => { 
  
    const index = products.findIndex((obj:any) => obj.barcode===code);
    let arr = JSON.parse(JSON.stringify(products));
    arr[index].count = e??1;
    setProducts(arr); 

  }

 
  const handleDelete = (code: string) => {
    const index = products.findIndex((obj:any) => obj.barcode===code);
    let arr = JSON.parse(JSON.stringify(products)); 
    arr.splice(index, 1) 
    setProducts(arr); 
  }

  const submitEvent = () => {

    const form = new FormData();
 
    products.forEach((item:any, index: number)=>{
      form.append(`id[${index}]`, item.id); 
      form.append(`count[${index}]`, item.count);  
    })

    setLoading(true);
    addNewSale(form).then(res => { 
      if(res !== undefined) {
        setLoading(false);
        setProducts([]);
        getSales();
      }
    }).catch(err => {
      setLoading(false);
      message.error(err.message)
    })
  }

  return (<Modal title="Satış pəncərəsi" open={isVisible}
          footer={null} width={1000}
          onCancel={() => { setVisible(false) }}>
 
          <Input placeholder="Barkod daxil edin" value={barcode} className='inp-box' key="barcode" 
            onKeyUp={checkingEvent} onChange={(e) => 
            setBarcode(e.target.value)} style={{ width: "200px", float: "right", zIndex: "10", marginRight: "15px" }} />

          <List
            size="large"
            header={<div>Məhsullar</div>}
            footer={products.length>0 ? <div>Toplam qiymət: <b style={{ float: "right", marginRight: "80px" }}>
                    {products.reduce((sum, current)=>sum+current.count*current.price, 0)}AZN</b></div> : null}
            bordered
            dataSource={products}
            renderItem={(item) => <List.Item key={item.barcode}>
              <div key={item.barcode+item.name}>{item.name}</div>
              <div key={item.barcode}>{item.barcode}</div>
              <div key={item.barcode+item.firm}>{item.firm}</div> 
              <div key={item.barcode+item.count}>
                <InputNumber value={item.count} onChange={(e)=>setValue(e, item.barcode)} min={1} max={item.maxCount} />
              </div> 
              <div key={item.barcode+item.price}>{item.price}AZN</div>
              <div key={item.id}>
                <Popconfirm placement="top" title="Məhsulu satışdan çıxarmaq istəyirsinizmi?" 
                  onConfirm={() =>handleDelete(item.barcode)} okText="Bəli" cancelText="Xeyr">
                  <DeleteOutlined style={{ cursor: "pointer" }} />
                </Popconfirm>
              </div>
            </List.Item>}
          />
          {products.length>0 ? <div style={{ height: "45px" }}>
            <Button style={{ float: "right", marginTop: "15px" }} type='primary' onClick={submitEvent}>Təsdiq</Button>
          </div> : null}
           
        </Modal>);
}

export default AddSale;