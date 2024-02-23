import React, { useState, useEffect } from 'react';
import { Row, Col, Breadcrumb, Button } from 'antd';
import { fetchSaleList } from "../api/user"; 
import List from '../components/Sales/List'; 
import AddSale from '../components/Sales/AddSale';
import FilterBySeller from '../components/common/FilterBySeller';
 
const SalesPage: React.FC = () => {
 
  const [sales, setSales] = useState([]);  
  const [pagination, setPagination] = useState({ pageSize: 10, current: 1, total: 0 }); 
  const [isVisible, setVisible] = useState(false);
  const [search, setSearch]=useState({  
    seller: ""
  });

  useEffect(() => { getSales() }, []);
  
  function getSales(page=pagination) {
    fetchSaleList(page, search).then((res:any)=>{  
      if(res !==undefined) { 
        setSales(res.data.data);
        setPagination(prev=> ({ ...prev, total: (res.data.meta.last_page*10) }));
      } 
    }).catch((err:any)=>{
      throw err;
    })
  } 

  // Pagination event
  function handleTableChange(page: any) { 
    setPagination(page);
    getSales(page)
  };
 
  return (<div style={{ marginTop: "30px" }}>

    <Row>

      {/************* Top of table ***********/}
      <Col span={7} offset={1}>
        <Breadcrumb>
         {sessionStorage.getItem("role")==="admin" ? 
          <Breadcrumb.Item>
              <a href="/">Ana səhifə</a>
            </Breadcrumb.Item> : null}
          <Breadcrumb.Item> Satışlar </Breadcrumb.Item>
        </Breadcrumb>
      </Col>  
      <FilterBySeller search={search} setSearch={setSearch} /> 
      <Col span={2} offset={7}>
        <Button type='primary' style={{ float: "right" }} onClick={()=>setVisible(true)}>Yeni satış</Button>
      </Col>
    </Row>

    
    {/************* Filter for columns ***********/}
    {/* <Search search={search} setSearch={setSearch} /> */}


    {/************* Add new user ***********/}
    <Row style={{ width: "100%", overflow: "auto" }}>
      
      <Col span={22} offset={1} style={{ marginTop: "10px" }}>

        <List sales={sales} getSales={getSales} pagination={pagination} handleTableChange={handleTableChange} />
 
      </Col>
    </Row>
    <AddSale isVisible={isVisible} setVisible={setVisible} getSales={getSales} />
  </div>);
}

export default SalesPage;