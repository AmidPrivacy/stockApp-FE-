import React, { useState, useEffect } from 'react';
import { Row, Col, Breadcrumb } from 'antd';
import { fetchOrderList } from "../api/orders";
 
// import Search from '../components/Orders/search';
import List from '../components/Orders/List'; 

  
const OrdersPage: React.FC = () => {

  const [search, setSearch] = useState({ name: "", number: "", email: "" }); 
  const [orders, setOrders] = useState([]);  
  const [pagination, setPagination] = useState({ pageSize: 10, current: 1, total: 0 }); 

  useEffect(() => { getOrders() }, [search]);
  
  function getOrders() {
    fetchOrderList().then((res:any)=>{  
      if(res)
        setOrders(res?.data?.data??[]) 
    }).catch((err:any)=>{
      throw err;
    })
  }
  
 

  // Pagination event
  function handleTableChange(page: any) { 
    setPagination(page);
    getOrders()
  };
 
  return (<div style={{ marginTop: "30px" }}>

    <Row>

      {/************* Top of table ***********/}
      <Col span={7} offset={1}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href="/">Ana səhifə</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item> Sifarişlər </Breadcrumb.Item>
        </Breadcrumb>
      </Col> 
    </Row>

    
    {/************* Filter for columns ***********/}
    {/* <Search search={search} setSearch={setSearch} /> */}


    {/************* Add new user ***********/}
    <Row>
      <Col span={22} offset={1} style={{ marginTop: "10px" }}>

        <List orders={orders} getOrders={getOrders} pagination={pagination} handleTableChange={handleTableChange} />
 
      </Col>
    </Row>
   
  </div>);
}

export default OrdersPage;