import React, { useState, useEffect } from 'react';
import { Row, Col, Breadcrumb, Select } from 'antd';
import { fetchOrderList, fetchStatusList } from "../api/orders";
 
// import Search from '../components/Orders/search';
import List from '../components/Orders/List'; 
import FilterBySeller from '../components/common/FilterBySeller';
let { Option } = Select;

enum statuses {
  New = "Yeni",
  Completed = "Tamamlanıb",
  Rejected = "Geri qaytarılıb",
  Pending = "Gözləmədə",
  Cancelled = "Ləğv edilib",
}
  
const OrdersPage: React.FC = () => {

  const [search, setSearch]=useState({  
    seller: "",
    status: ""
  });
  const [orders, setOrders] = useState([]);  
  const [statusList, setStatuses] = useState([]);  
  const [pagination, setPagination] = useState({ pageSize: 10, current: 1, total: 0 }); 

  useEffect(() => { 
    fetchStatusList().then((res:any)=> {
      if(res !== undefined) {
        setStatuses(res.data.data);
      }
    })
   }, []);

  useEffect(() => { getOrders() }, [search]);
  
  function getOrders(page=pagination) {
    fetchOrderList(page, search).then((res:any)=>{  
      if(res){
        const data = (res?.data?.data??[]).filter((item:any) =>  item.status.name !=="Cancelled" || sessionStorage.getItem("role") !=="seller" )
        setPagination(prev=> ({ ...prev, total: (res.data.meta.last_page*10) }));
        setOrders(data) 
      }
        
    }).catch((err:any)=>{
      throw err;
    })
  }
   

  // Pagination event
  function handleTableChange(page: any) { 
    setPagination(page); 
    getOrders(page)
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
          <Breadcrumb.Item> Sifarişlər </Breadcrumb.Item>
        </Breadcrumb>
      </Col> 
      <FilterBySeller search={search} setSearch={setSearch} /> 
      <Col span={5} offset={1} className="left-margin">
        <Select style={{ width: "100%" }} value={search.status} className='inp-box' placeholder="Firma"
          onChange={(e: any) => setSearch((prevState:any) => ({ ...prevState,  status: e }))}  
          filterOption={(input, option: any) =>option.children[1].toLowerCase().indexOf(input.toLowerCase()) >= 0}>
          <Option value={""} key="0"> Status seçin </Option>
          {statusList.length > 0 ? statusList.map((res: any) => {
            return (<Option value={res.value} key={res.value}> {statuses[res.name]} </Option>)
          }) : null}
        </Select> 
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

export default OrdersPage;