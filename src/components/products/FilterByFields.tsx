import React, { useEffect, useState } from 'react';
import { Select, Row, Col, Input } from 'antd'; 
import { fetchCompanyList } from '../../api/company'; 
import { Search } from '../../types/search';
  
const btnStyle = { width: "100%", marginTop: "15px" };
const { Option } = Select; 
 

const FilterByFields: React.FC<{ search: Search, setSearch: Function }> = ({ search, setSearch }) => {
 
  const [companies, setCompanies] = useState([]);  

 
  useEffect(() => {
 
    fetchCompanyList().then((res:any)=>{ 
      setCompanies(res.data.data.companies);  
    });
 
  }, []);
 
  
  
  return (<div>
    <Row style={{
      border: "solid 1px #ccc", width: "92%", borderRadius: "3px",
      margin: "15px auto 0", paddingBottom: "17px", paddingLeft: "5%"
    }}>

      <Col span={2} className="left-margin">
        <Input placeholder="id" style={btnStyle} 
          value={search.id} 
          onChange={(e: any) => setSearch((prevState:Search) => ({
            ...prevState,
            id: e.target.value,
          }))} />
      </Col>
 
      <Col span={5} offset={1} className="left-margin">
        <Input placeholder="Name" style={btnStyle} 
          value={search.name} 
          onChange={(e: any) => setSearch((prevState:Search) => ({
            ...prevState,
            name: e.target.value,
          }))} />
      </Col>   

      <Col span={5}>  
        <Select style={btnStyle}
          value={search.companyId}
          onChange={(e: any) => setSearch((prevState:Search) => ({
            ...prevState,
            companyId: e,
          }))}>
          <Option value="" key="0"> Firma seçilməyib </Option>
          {companies.length > 0 ? companies.map((res: any) => {
            return (<Option value={res.id} key={res.id}> {res.name} </Option>);
          }) : null}
        </Select>
      </Col> 

      <Col span={3} offset={1} className="left-margin">
        <Input style={btnStyle} placeholder="Qiymət" 
          onChange={(e: any) => setSearch((prevState:Search) => ({
            ...prevState, price: e.target.value }))} />
      </Col>  
      
    </Row>
  </div>);
}

export default FilterByFields;