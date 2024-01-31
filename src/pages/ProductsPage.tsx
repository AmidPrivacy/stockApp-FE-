import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Breadcrumb, message } from 'antd'; 
import AddProduct from '../components/products/AddProduct';
import AddCompany from '../components/products/AddCompany';
import FilterByFields from '../components/products/FilterByFields';
import List from '../components/products/List';
import { fetchProductList } from '../api/products';
  

const Products: React.FC = () => {
  
  const [products, setProducts] = useState([]);   
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({ addVisible: false, imgVisible: false, id: null, firmVisible: false, menu: false });      
  const [pagination, setPagination] = useState({ pageSize: 10, current: 1, total: 0, });
  const [search, setSearch]=useState({
    id: "",
    name: "",   
    price: "",  
  });

  // Component didMount - call products
  useEffect(() => { getProducts(); setPagination({ pageSize: 10, current: 1, total: 0, }) }, [search]);

  // Fetch products
  function getProducts(page: any = pagination) {
    setLoading(true);
    fetchProductList(page, search).then((res:any)=>{ 
      setProducts(res.data.data); 
      // setPagination(prevState => ({ ...prevState,  total: res.data.data.totalCount }));
      setLoading(false);
    }).catch((_err:any) => {
      setLoading(false);
      message.error("Sistem xətası");
    });
  }
   
  // Pagination event
  function handleTableChange(page: any) { 
    setPagination(page);
    getProducts(page)
  };
  

  return (<div style={{ marginTop: "10px" }}> 
    <Row>

      {/************* Top of table ***********/}
      <Col span={7} offset={1}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href="/">Ana səhifə</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item> Məhsullar </Breadcrumb.Item>
        </Breadcrumb>
      </Col>
      <Col span={1} offset={14}>
        <Button type="primary" style={{ paddingRight: "15px" }} className="new-courier" 
          onClick={() => setSettings((prev)=>({ ...prev, addVisible: true })) } key="new-price">
            +Yeni
        </Button>
      </Col>
    </Row>
    {/* <FilterByFields search={search} setSearch={setSearch} /> */}
    <Row>
      {/************* Table row ***********/}
      <Col span={22} offset={1} style={{ marginTop: "10px" }}> 
        <List products={products??[]} setSettings={setSettings} handleTableChange={handleTableChange} 
          pagination={pagination} loading={loading} getProducts={getProducts} />
      </Col>
    </Row>

    <AddProduct settings={settings} setSettings={setSettings} getProducts={getProducts} />
   
    {/* <AddCompany resetRow={()=>setSettings({ addVisible: false, imgVisible: false, id: null, firmVisible: false, menu: false })} 
      fetchDatas={getProducts} settings={settings} /> */}
 
  </div>);
}

export default Products;