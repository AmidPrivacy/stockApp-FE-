import React, { useState, useEffect } from 'react'; 
import { Row, Col, Button, Breadcrumb } from 'antd';
import { fetchCategoryList } from "../api/categories";    
import List from '../components/categories/List';
import AddCategory from '../components/categories/AddCategory'; 
 
const CategoriesPage: React.FC = () => {

  const [selectedObj, setSelectedObj] = useState({ parentId: "", name: "", description: "", image: "", rowId: null });  
  const [categories, setCategories] = useState([]);   
  const [modalVisible, setModalVisible] = useState(false);  
  const [loading, setLoading] = useState(false);  
  const [pagination, setPagination] = useState({
          pageSize: 10, current: 1, total: 0, });

  // Component didMount - call categories
  useEffect(() => { getCategories() }, []);
 
 
  // Fetch categories
  function getCategories(page: any = pagination) {
    setLoading(true);
    fetchCategoryList(page, "").then((res:any)=>{
      setCategories(res.data.data); 
      setLoading(false); 
    })
  }
   
  // Pagination event
  function handleTableChange(page: any) { 
    setPagination(page);
    getCategories(page)
  };
 
   
  return (<div style={{ marginTop: "30px" }}> 
    <Row>

      {/************* Top of table ***********/}
      <Col span={3} offset={1}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href="/">Ana səhifə</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item> Kateqoriyalar </Breadcrumb.Item>
        </Breadcrumb>
      </Col>
 
      <Col span={3} offset={16}>
        <Button type="primary" style={{ float: "right" }}
          onClick={() => setModalVisible(true) } 
          key="new-roomId">+Yeni kateqoriya</Button>
      </Col> 

      {/************* Table row ***********/}
      <Col span={22} offset={1} style={{ marginTop: "10px" }}> 

        <List categories={categories} getCategories={getCategories} setModalVisible={setModalVisible} 
          pagination={pagination} loading={loading} setSelectedObj={setSelectedObj} handleTableChange={handleTableChange} />
 
      </Col>
    </Row>
 
    <AddCategory getCategories={getCategories} setModalVisible={setModalVisible} setSelectedObj={setSelectedObj}
          modalVisible={modalVisible} selectedObj={selectedObj} />
  </div>);
}

export default CategoriesPage;