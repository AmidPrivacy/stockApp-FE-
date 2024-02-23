import React, { useState, useEffect } from 'react';
import { Col,  Select } from 'antd';   
import { fetchUserSellers } from '../../api/user';
   
let { Option } = Select;

const FilterBySeller: React.FC<{ search: any, setSearch: Function }> = ({ search, setSearch }) => {
 
  const [sellers, setSellers] = useState([]);
  
  useEffect(()=> {
    fetchUserSellers().then((res:any)=>{  
      if(res)
      setSellers(res?.data??[]) 
    }).catch((err:any)=>{
      throw err;
    })
  }, [])


  return (<Col span={5} offset={1} className="left-margin">
        <Select style={{ width: "100%" }} value={search.seller} className='inp-box' placeholder="Firma"
          onChange={(e: any) => setSearch((prevState:any) => ({ ...prevState,  seller: e }))}  
          filterOption={(input, option: any) =>option.children[1].toLowerCase().indexOf(input.toLowerCase()) >= 0}>
          <Option value={""} key="0"> Firma seçin </Option>
          {sellers.length > 0 ? sellers.map((res: any) => {
            return (<Option value={res.id} key={res.id}> {res.name} </Option>)
          }) : null}
        </Select> 
      </Col>);
}

export default FilterBySeller;