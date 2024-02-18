import React, { useEffect, useState } from 'react';
import { message, Button, Modal, Select, InputNumber, Input } from 'antd'; 
import { fetchSellerList } from '../../api/user';
import { attachSellerToProduct } from '../../api/products';
import FormData from 'form-data';  

let { Option } = Select;
const { TextArea } = Input;

const AddSeller: React.FC<{ settings: any, resetRow: Function,  pivot:any, setPivot:Function,
                      fetchDatas: Function }> = ({ settings, resetRow, fetchDatas, pivot, setPivot }) => {
 
  const [loading, setLoading] = useState(false);
  const [sellers, setSellers] = useState([]); 


  useEffect(()=>{
    fetchSellerList().then((res:any)=>{  
      setSellers(res?.data?.data??[]) 
    }).catch((err:any)=>{
      throw err;
    })
  }, []);

   
  function connectSeller() { 

    const form = new FormData();
    form.append('seller_id', pivot.id??""); 
    form.append('price', pivot.price.toString());
    form.append('description', pivot.description);
    form.append('_method', "PUT");

    attachSellerToProduct(form, settings.id).then(_res=>{
      message.success("seçilən firma məhsula bağlandı");
      setPivot({ id: null, price: 0, description: "" });
      fetchDatas();
    }).catch((err:any)=>{ throw err })
  }

  return (<div>
    <Modal open={settings.firmVisible}
      title="Firma əlavə edin"
      footer={[
        <Button key="back" onClick={() => { 
          setPivot({ id: null, price: 0, description: "" });  resetRow()
        }}>
          Ləğv et
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={connectSeller}
          disabled={pivot.id ===null || pivot.price===0}>
          Yadda saxla
        </Button>,
      ]}
      onCancel={() => { setPivot({ id: null, price: 0, description: "" });  resetRow() }}
    >
      <Select style={{ width: "100%" }} value={pivot.id} className='inp-box'
        onChange={(e: any) => setPivot((prevState:any) => ({ ...prevState,  id: e }))}  
        filterOption={(input, option: any) =>option.children[1].toLowerCase().indexOf(input.toLowerCase()) >= 0}>
        <Option value={null} key="0"> Firma seçin </Option>
        {sellers.length > 0 ? sellers.map((res: any) => {
          return (<Option value={res.id} key={res.id}> {res.name} </Option>)
        }) : null}
      </Select> 
 
      <InputNumber addonAfter="AZN" value={pivot.price} className='inp-box'
        onChange={(e:any)=> setPivot((prevState:any) => ({ ...prevState,  price: e }))}  />

      <TextArea rows={4} placeholder="Qeyd əlavə edin" value={pivot.description} className='inp-box'
        onChange={(e:any)=> setPivot((prevState:any) => ({ ...prevState,  description: e.target.value }))} />
    </Modal>
  </div>);
}

export default AddSeller;