import React from 'react'; 
import { Row, Col, Input } from 'antd'; 
 
 
const Search: React.FC<{ search:any, setSearch: Function }> = ({ search, setSearch }) => { 
 
  const onSearch = (val:string, type: string) => { 
    setSearch((prevState:any) => ({
      ...prevState,
      [type]: val,
    }))
  }
 
  return (<div style={{ marginTop: "10px" }}> 
    <Row>  
      <Col span={5} offset={1}>
        <Input placeholder='Ad soyad' onChange={(e)=>onSearch(e.target.value, "name")} value={search.name} />
      </Col>
      <Col span={5} offset={1}>
        <Input placeholder='Nömrə' onChange={(e)=>onSearch(e.target.value, "number")} value={search.number} />
      </Col>
      <Col span={5} offset={1}>
        <Input placeholder='E-mail' onChange={(e)=>onSearch(e.target.value, "email")} value={search.email} />
      </Col> 
      {/* <Col span={5}>
        <Input placeholder='İcazələr' onChange={(e)=>onSearch(e.target.value, "role")} value={search.role} />
      </Col>  */}
    </Row>
 
  </div>);
}

export default Search;