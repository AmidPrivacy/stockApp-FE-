import React, { useState, useEffect } from 'react';
import { Row, Col, Breadcrumb } from 'antd';
import { fetchStockList } from "../api/user"; 
import List from '../components/Stock/List'; 
import FilterBySeller from '../components/common/FilterBySeller';

const StockPage: React.FC = () => {
 
  const [stocks, setStocks] = useState([]);  
  const [pagination, setPagination] = useState({ pageSize: 10, current: 1, total: 0 }); 
  const [search, setSearch]=useState({  
    seller: ""
  });
  
  useEffect(() => { getStocks() }, []);
  
  function getStocks(page=pagination) {
    fetchStockList(page, search).then((res:any)=>{  
      if(res !==undefined){ 
        setStocks(res.data.data);
        setPagination(prev=> ({ ...prev, total: (res.data.meta.last_page*10) }));
      }
        
    }).catch((err:any)=>{
      throw err;
    })
  } 

  // Pagination event
  function handleTableChange(page: any) { 
    setPagination(page); 
    getStocks(page)
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
      <FilterBySeller search={search} setSearch={setSearch} /> 
    </Row>

    
    {/************* Filter for columns ***********/}
    {/* <Search search={search} setSearch={setSearch} /> */}


    {/************* Add new user ***********/}
    <Row style={{ width: "100%", overflow: "auto" }}>
      
      <Col span={22} offset={1} style={{ marginTop: "10px" }}>

        <List orders={stocks} getStocks={getStocks} pagination={pagination} handleTableChange={handleTableChange} />
 
      </Col>
    </Row>
   
  </div>);
}

export default StockPage;