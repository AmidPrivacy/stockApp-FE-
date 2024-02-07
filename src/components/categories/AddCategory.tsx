import React, { useState, useEffect } from 'react'; 
import { Button, Modal, Input, message, Select } from 'antd';
import { addNewCategory, fetchCategoryList, fetchCategoryById } from "../../api/categories";    
import FormData from 'form-data'; 

const { TextArea } = Input;
 
const AddCategory: React.FC<{ setModalVisible: Function, modalVisible: boolean, 
   setSelectedObj: Function, getCategories: Function, selectedObj: any }> = 
  ({  setModalVisible, setSelectedObj, getCategories, modalVisible, selectedObj }) => {
 
  const [categories, setCategories] = useState([]);    
  const [loading, setLoading] = useState(false);   
 
 
  useEffect(()=> {
    fetchCategoryList().then((res:any)=>{
      setCategories(res.data.data);  
    })
  }, []);

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

        const form = new FormData();

        form.append('name', selectedObj.name);
        form.append('description', selectedObj.description);
        if(selectedObj.parentId){ form.append('parent_id', selectedObj.parentId) }

        addNewCategory(form).then((res: any) => { 
            if (res.data.error == null) {
              setModalVisible(false);
              setSelectedObj((prevState:any) => ({ ...prevState, rowId: null, name: "", description: "", parentId: "" }))
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
          ]} onCancel={() => setModalVisible(false)}>

          <Input placeholder="Kateqoriya adı daxil edin" value={selectedObj.name} className='inp-box' onChange={(e) =>  
              setSelectedObj((prevState:any) => ({ ...prevState,  name: e.target.value })) } key="full-name" /> 

          <TextArea rows={4} placeholder="Ətraflı məlumat(kateqoriya üçün)" className='inp-box' onChange={(e) => 
                          setSelectedObj((prevState:any) => ({ ...prevState,  description: e.target.value })) } />

          <Select 
            style={{ width: '100%' }}
            className='inp-box'
            placeholder="Kateqoriya seçin"
            value={selectedObj.category}
            onChange={(val:any)=>setSelectedObj((prevState:any) => ({ ...prevState, category: val }))} 
          >
            {categories.map((res:any) => <Select.Option value={res.id}>{res.name}</Select.Option>)}
          </Select>
      
        </Modal>);
}

export default AddCategory;