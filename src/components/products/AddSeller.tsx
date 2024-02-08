import React, { useEffect, useState } from 'react';
import { message, Button, Modal, Select, InputNumber, Input } from 'antd'; 
import { fetchSellerList } from '../../api/user';
import { attachSellerToProduct } from '../../api/products';
import FormData from 'form-data';  

let { Option } = Select;
const { TextArea } = Input;

const AddSeller: React.FC<{ settings: any, resetRow: Function, 
  fetchDatas: Function }> = ({ settings, resetRow, fetchDatas }) => {
 
  const [loading, setLoading] = useState(false);
  const [sellers, setSellers] = useState([]);
  const [selectedRow, setSelectedRow] = useState({
    id: null, 
    value: 0,
    description: "" 
  });


  useEffect(()=>{
    fetchSellerList().then((res:any)=>{  
      setSellers(res?.data?.data??[]) 
    }).catch((err:any)=>{
      throw err;
    })
  }, []);

   
  function connectSeller() { 

    const form = new FormData();
    form.append('seller_id', selectedRow.id??""); 
    form.append('price', selectedRow.value.toString());
    form.append('description', selectedRow.description);
    form.append('_method', "PUT");

    attachSellerToProduct(form, settings.id).then(_res=>{
      message.success("seçilən firma məhsula bağlandı");
      setSelectedRow({ id: null, value: 0, description: "" });
      fetchDatas();
    }).catch((err:any)=>{ throw err })
  }

  return (<div>
    <Modal open={settings.firmVisible}
      title="Firma əlavə edin"
      footer={[
        <Button key="back" onClick={() => { 
          setSelectedRow({ id: null, value: 0, description: "" });  resetRow()
        }}>
          Ləğv et
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={connectSeller}
          disabled={selectedRow.id ===null || selectedRow.value===0}>
          Yadda saxla
        </Button>,
      ]}
      onCancel={() => { setSelectedRow({ id: null, value: 0, description: "" });  resetRow() }}
    >
      <Select style={{ width: "100%" }} value={selectedRow.id} className='inp-box'
        onChange={(e: any) => setSelectedRow(prevState => ({ ...prevState,  id: e }))}  
        filterOption={(input, option: any) =>option.children[1].toLowerCase().indexOf(input.toLowerCase()) >= 0}>
        <Option value={null} key="0"> Firma seçin </Option>
        {sellers.length > 0 ? sellers.map((res: any) => {
          return (<Option value={res.id} key={res.id}> {res.name} </Option>)
        }) : null}
      </Select> 
 
      <InputNumber addonAfter="AZN" value={selectedRow.value} className='inp-box'
        onChange={(e:any)=> setSelectedRow(prevState => ({ ...prevState,  value: e }))}  />

      <TextArea rows={4} placeholder="Qeyd əlavə edin" value={selectedRow.description} className='inp-box'
        onChange={(e:any)=> setSelectedRow(prevState => ({ ...prevState,  description: e.target.value }))} />
    </Modal>
  </div>);
}

export default AddSeller;