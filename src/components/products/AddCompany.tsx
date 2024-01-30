import React, { useEffect, useState } from 'react';
import { message, Button, Modal, Select, Radio, Input, InputNumber } from 'antd'; 


let { Option } = Select;

const AddCompany: React.FC<{ settings: any, resetRow: Function, 
  fetchDatas: Function }> = ({ settings, resetRow, fetchDatas }) => {
 
  const [loading, setLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState({
    id: null,
    in_stock: 1,
    value: 0 
  });
  const [companies, setCompanies] = useState([]); 

   
  function connectCompany() { 
 
  }

  return (<div>
    <Modal open={settings.firmVisible}
      title="Firma əlavə edin"
      footer={[
        <Button key="back" onClick={() => { 
          setSelectedRow({ id: null, in_stock: 1, value: 0 });  resetRow()
        }}>
          Ləğv et
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={connectCompany}>
          Yadda saxla
        </Button>,
      ]}
      onCancel={() => { setSelectedRow({ id: null, in_stock: 1, value: 0 });  resetRow() }}
    >
      <Select style={{ width: "100%" }} value={selectedRow.id} 
        onChange={(e: any) => setSelectedRow(prevState => ({ ...prevState,  id: e }))}  
        filterOption={(input, option: any) =>option.children[1].toLowerCase().indexOf(input.toLowerCase()) >= 0}>
        <Option value={null} key="0"> Firma seçin </Option>
        {companies.length > 0 ? companies.map((res: any) => {
          return (<Option value={res.id} key={res.id}> {res.name} </Option>)
        }) : null}
      </Select> 

      <Radio.Group onChange={(e:any)=> setSelectedRow(prevState => ({ ...prevState,  in_stock: e.target.value }))} 
        value={selectedRow.in_stock} style={{ margin: "20px auto 30px", width: "245px", display: "block" }}>
        <Radio value={1}>Stokda var</Radio>
        <Radio value={0}>Stokda yoxdur</Radio> 
      </Radio.Group>
      <InputNumber addonAfter="AZN" value={selectedRow.value} 
        onChange={(e:any)=> setSelectedRow(prevState => ({ ...prevState,  value: e }))}  />
    </Modal>
  </div>);
}

export default AddCompany;