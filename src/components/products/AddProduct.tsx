import React, { useState, useEffect } from 'react';
import { Button, Modal, Input, message } from 'antd'; 
import { addProduct, fetchProductById } from "../../api/products";    
import Editor from './Editor';
import FormData from 'form-data';

const AddProduct: React.FC<{ settings: any, setSettings: Function, getProducts: Function }> = 
                          ({ settings, setSettings, getProducts }) => {
 
  const [selectedObj, setSelectedObj] = useState({ 
    name: "", 
    description: "", 
    barcode: "",  
  });   
  
  const [loading, setLoading] = useState(false);  

  // When modal is open - align edit or add mode   
  useEffect(() => { 
    if(settings.addVisible){ 
      if(settings.id) {
        fetchProductById(settings.id).then((res:any)=>{ 
          const data = res.data.data; 
          
          setSelectedObj({  
            name: data.name, 
            description: data.description,   
            barcode: ""
          });  
           
        })
      } 
    } else {
      setSelectedObj({ name: "", description: "", barcode: "" });  
    }
   
  }, [settings.id, settings.addVisible]);

  
  // Adjust datas for api - compare specifications and values
  function createNewRow() { 
      if (selectedObj.name.length !== 0 && selectedObj.description.length !==0) {
        setLoading(true);

        // const formData = new FormData();
        // fileList.forEach((file) => { formData.append('images[]', file) });
        // formData.append('rowId', settings.id);
 
        addProduct(selectedObj).then((res: any) => { 
          if (res.data.error == null) {
            setSettings({ addVisible: false, imgVisible: false, id: null });
            getProducts();
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

  const onChange = (val:any, type: string) => setSelectedObj(prevState => ({ ...prevState,  [type]: val }));

     
  return (<Modal title="Məhsul məlumatlarının əlavəsi" open={settings.addVisible} width={1200}
          footer={[
            <Button key="back" onClick={() => { setSettings((prev:any)=>({ ...prev, addVisible: false, id: null }))}}>
              Ləğv et
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={createNewRow}>
              Yadda saxla
            </Button>]}
          onCancel={() => { setSettings((prev:any)=>({ ...prev, addVisible: false, id: null })) }}> 
    
          <Input placeholder="Məhsul adı edin" value={selectedObj.name} 
            onChange={(e)=>onChange(e.target.value, "name")} key="product-name" /> 
  
          <Editor onChange={onChange} data={selectedObj.description} /> 

          <Input placeholder="Barkod" value={selectedObj.barcode} 
            onChange={(e)=>onChange(e.target.value, "barcode")} key="barcode" />   
   
        </Modal>);
}

export default AddProduct;