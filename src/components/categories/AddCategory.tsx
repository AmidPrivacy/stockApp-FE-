import React, { useState, useEffect } from 'react'; 
import { Button, Modal, Input, message, Select } from 'antd';
import { addNewCategory, fetchCategoryList, fetchCategoryById } from "../../api/categories";    
 
let { Option } = Select;
 
const AddCategory: React.FC<{ setModalVisible: Function, modalVisible: boolean, 
   setSelectedObj: Function, getCategories: Function, selectedObj: any }> = 
  ({  setModalVisible, setSelectedObj, getCategories, modalVisible, selectedObj }) => {
 
  const [categories, setCategories] = useState([]);    
  const [loading, setLoading] = useState(false);   
 
 
  // When menu modal is open - call menus
  // useEffect(() => { 
  //   if(modalVisible.menu && menus.length===0) {
  //     fetchMenuList(0).then((res:any)=>{
  //       setMenus(res.data.data); 
  //     })
  //   }  
  // }, [modalVisible.menu]);

  useEffect(()=>{ 
    if(selectedObj.rowId && modalVisible) {
      fetchCategoryById(selectedObj.rowId).then((res:any) => { 
        setSelectedObj((prevState:any) => ({ ...prevState,  name: res.data.data.name }));   
      })
    }
   },[modalVisible]);

 

  // Create new row
  function createNewRow() { 
      if (selectedObj.name.length !== 0) {
        setLoading(true);
        addNewCategory(selectedObj).then((res: any) => { 
            if (res.data.error == null) {
              setModalVisible(false);
              setSelectedObj((prevState:any) => ({ ...prevState, rowId: null, name: "", parentId: "" }))
              getCategories(); 
            } else {
              message.error(res.data.error);
            }  
          setLoading(false);
        }).catch((err:any) => {
          console.log(err) 
          setLoading(false);
        });
      } else {
        message.warning("Zəhmət olmasa bütün sahələri doldurun")
      } 
  }
 
  return (<Modal title={"Kateqoriya məlumatlarının əlavəsi"} open={modalVisible}
          footer={[
            <Button key="back" onClick={() => setModalVisible(false)}>
              Ləğv et
            </Button>,
            <Button key="submit" type="primary" loading={loading} 
              onClick={createNewRow}>
              Yadda saxla
            </Button>,
          ]}
          onCancel={() => setModalVisible((prevState:any) => ({ ...prevState,  category: false, subCategory: false, menu: false }))}
        >
          <Input placeholder="Kateqoriya adı daxil edin" value={selectedObj.name} onChange={(e) =>  
              setSelectedObj((prevState:any) => ({ ...prevState,  name: e.target.value }))  
            } className="courier-offset" key="full-name" /> 
      
        </Modal>);
}

export default AddCategory;