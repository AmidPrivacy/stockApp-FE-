import React, { useEffect, useState } from 'react';
import { Select, Row, Col, Input, Checkbox } from 'antd';
import { fetchCategoryList, fetchSubCategoriesByParentId  } from "../../api/categories"
import { fetchCompanyList } from '../../api/company'; 
import { Search } from '../../types/search';
  
const btnStyle = { width: "100%", marginTop: "15px" };
const { Option } = Select; 
 

const FilterByFields: React.FC<{ search: Search, setSearch: Function }> = ({ search, setSearch }) => {

 
 
  const [parentCategories, setParentCategories] = useState([]);
  const [categories, setCategories] = useState([]); 
  const [companies, setCompanies] = useState([]); 
  const [menus, setMenus] = useState([]); 

 
  useEffect(() => {

    fetchCategoryList().then((res:any)=>{
      setParentCategories(res.data.data.categories) 
    });

    fetchCompanyList().then((res:any)=>{ 
      setCompanies(res.data.data.companies);  
    });

   
  }, []);
 
 
  function getCategoriesById(id: string) {
    setSearch((prevState:Search) => ({
      ...prevState,
      parentCategoryId: id,
      categoryId: id.length === 0 ? "" : search.categoryId
    }));

    fetchSubCategoriesByParentId(id).then((res:any)=>{
      setCategories(res.data.data);
    })
     
  }
 
  
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
      <Col span={6} offset={1} className="left-margin">
        <Select placeholder="Üst kateqoriya" value={search.parentCategoryId} style={btnStyle} 
          onChange={(e: string) => getCategoriesById(e)}
          showSearch
          notFoundContent="Məlumat tapılmadı"
          filterOption={(input, option: any) =>option.children[1].toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
          <Option value="" key="0"> Üst kateqoriya seçilməyib </Option>
          {parentCategories.length > 0 ? parentCategories.map((res: any) => {
            return (<Option value={res.id} key={res.id}> {res.name} </Option>);
          }) : null}
        </Select>
      </Col>
      <Col span={6} offset={1} className="left-margin">
        <Select placeholder="Alt kateqoriya"
          value={search.categoryId}
          showSearch
          filterOption={(input, option: any) =>option.children[1].toLowerCase().indexOf(input.toLowerCase()) >= 0}
          style={btnStyle}
          onChange={(e: any) => setSearch((prevState:Search) => ({
            ...prevState,
            categoryId: e,
          }))}
        >
          <Option value="" key="0"> Alt kateqoriya seçilməyib </Option>
          {categories.length > 0 ? categories.map((res: any) => {
            return (<Option value={res.id} key={res.id}> {res.name} </Option>);
          }) : null}
        </Select>
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

      <Col span={2} offset={1} className="left-margin">
        <Input style={btnStyle} placeholder="Endirim" 
          onChange={(e: any) => setSearch((prevState:Search) => ({
            ...prevState,
            discount: e.target.value,
          }))} />
      </Col>
      <Col span={3} offset={1} className="left-margin">
        <Input style={btnStyle} placeholder="Qiymət" 
          onChange={(e: any) => setSearch((prevState:Search) => ({
            ...prevState, price: e.target.value }))} />
      </Col>
      <Col span={3} offset={1} className="left-margin">
        <Checkbox onChange={(e: any) => setSearch((prevState:Search) => ({
            ...prevState, isEmptySp: e.target.checked ? e.target.checked : "",
          }))} style={{ marginLeft: "-17px", marginTop: "18px" }}>
            Xüsusiyyət olmayan</Checkbox>
      </Col>
   
      <Col span={3} className="left-margin">
        <Select value={search.menuId} style={btnStyle} 
          onChange={(e: any) => setSearch((prevState:Search) => ({
            ...prevState,
            menuId: e,
          }))} >
          <Option value="">Menu seçilməyib</Option>
          {menus.length > 0 ? menus.map((res: any) => {
            return (<Option value={res.id} key={res.id}> {res.name} </Option>);
          }) : null}
        </Select>
      </Col>
      <Col span={3} offset={1} className="left-margin">
        <Checkbox onChange={(e: any) => setSearch((prevState:Search) => ({
            ...prevState,
            isEmptyImg: e.target.checked ? e.target.checked : "",
          }))} style={{ marginLeft: "7px", marginTop: "18px" }}>Şəkilsiz</Checkbox>
      </Col>
      
    </Row>
  </div>);
}

export default FilterByFields;