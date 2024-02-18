import React, { useState, useEffect } from 'react';
import { Row, Col, Breadcrumb, Input } from 'antd';
import { fetchOrderList } from "../api/orders";
 
// import Search from '../components/Orders/search';
import List from '../components/Stock/List'; 

  
const StockPage: React.FC = () => {

  const [search, setSearch] = useState({ name: "", number: "", email: "" }); 
  const [orders, setOrders] = useState([]);  
  const [pagination, setPagination] = useState({ pageSize: 10, current: 1, total: 0 }); 

  useEffect(() => { getOrders() }, [search]);
  
  function getOrders() {
    fetchOrderList().then((res:any)=>{  
      if(res){
        const data = (res?.data?.data??[]).filter((item:any) =>  item.status.name !=="Cancelled" || sessionStorage.getItem("role") !=="seller" )

        setOrders(data) 
      }
        
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
         {sessionStorage.getItem("role")==="admin" ? 
          <Breadcrumb.Item>
              <a href="/">Ana səhifə</a>
            </Breadcrumb.Item> : null}
          <Breadcrumb.Item> Stok məhsullar </Breadcrumb.Item>
        </Breadcrumb>
      </Col> 
      <Col span={5} offset={10}>
        <Input placeholder="Barkod edin" />
      </Col>
    </Row>

    
    {/************* Filter for columns ***********/}
    {/* <Search search={search} setSearch={setSearch} /> */}


    {/************* Add new user ***********/}
    <Row style={{ width: "100%", overflow: "auto" }}>
      
      <Col span={22} offset={1} style={{ marginTop: "10px" }}>

        <List orders={orders} getOrders={getOrders} pagination={pagination} handleTableChange={handleTableChange} />
 
      </Col>
    </Row>
   
  </div>);
}

export default StockPage;