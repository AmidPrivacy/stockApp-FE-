import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal, Input, message, Card, UploadFile, Divider, Popconfirm } from 'antd'; 
import { addProduct, fetchProductById } from "../../api/products";   
import { DeleteOutlined } from '@ant-design/icons'; 
import Editor from './Editor';
import FormData from 'form-data';
import config from '../../lib/config/app';

const AddProduct: React.FC<{ settings: any, setSettings: Function, getProducts: Function }> = 
                          ({ settings, setSettings, getProducts }) => {

  const ref = useRef<HTMLInputElement>(null);

 
  const [selectedObj, setSelectedObj] = useState({ 
    name: "", 
    description: "", 
    barcode: "",  
  });    
  const [fileList, setFileList] = useState<UploadFile[]>([]); 
  const [uploadedFiles, setUploaded] = useState([]);
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
            barcode: data.barcode
          });  
           
        })
      } 
    } else {
      setSelectedObj({ name: "", description: "", barcode: "" });  
    }
   
  }, [settings.id, settings.addVisible]);

  

  // Adjust datas for api  
  function createNewRow() { 
      if (selectedObj.name.length !== 0 && selectedObj.description.length !==0) {
        setLoading(true);

        const formData = new FormData();
        fileList.forEach((file) => { formData.append('images[]', file) });
        formData.append('name', selectedObj.name);
        formData.append('description', selectedObj.description);
        formData.append('barcode', selectedObj.barcode);
 
        addProduct(formData).then((res: any) => { 
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
  const handleFileChange = (e: any) => { if(e.target.files.length>0) setFileList([...e.target.files]) };

     
  function handleDelete(id: any): void {
    throw new Error('Function not implemented.');
  }

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

            <Card style={{ marginTop: "20px" }}>

              <input type="file" multiple ref={ref} onChange={handleFileChange} style={{ width: "91px", marginRight: "10px" }} /> 
              {fileList.map(file=> <b>{"["+file.name+"]  "}</b>)}

              <Divider />

              <ul style={{ listStyle: "none", padding: 0, minHeight: "70px" }}>
                {uploadedFiles.map((res:any)=>
                  <li style={{ marginLeft: "10px", display: "inline-block" }}>

                    <img src={config().apiUrl+"/uploads/products/"+res.path} alt="" 
                              style={{ width: "70px", display: "block", marginBottom: "10px", float: "left", height: "83px" }} />

                    <Popconfirm placement="top" okText="Bəli" cancelText="Xeyr" title="Şəkili silmək istəyirsinizmi?" onConfirm={() =>handleDelete(res.id)}>
                        <DeleteOutlined rev="label" style={{ cursor: "pointer", position: "absolute", marginLeft: "-15px" }} />
                    </Popconfirm>   
                  </li>)}
              </ul>

            </Card>
   
        </Modal>);
}

export default AddProduct;