import React from 'react';
import { Row, Col, Input } from 'antd';  
import { Search } from '../../types/search';
  
const btnStyle = { width: "100%", marginTop: "15px" }; 
 

const FilterByFields: React.FC<{ search: Search, setSearch: Function }> = ({ search, setSearch }) => {
 
  
  
  return (<div>
    <Row style={{
       width: "92%", borderRadius: "3px",
      margin: "15px auto 0", paddingBottom: "17px", paddingLeft: "6px"
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
        <Input placeholder="Məhsul adı" style={btnStyle} 
          value={search.name} 
          onChange={(e: any) => setSearch((prevState:Search) => ({
            ...prevState,
            name: e.target.value,
          }))} />
      </Col>   

  
      
    </Row>
  </div>);
}

export default FilterByFields;