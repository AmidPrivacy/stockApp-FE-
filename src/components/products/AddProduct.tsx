import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal, Input, message, Card, UploadFile, Divider } from 'antd';
import FormData from 'form-data';  
import { addProduct, fetchProductById, updateProduct } from "../../api/products"  
import Editor from './Editor';


const AddProduct: React.FC<{ settings: any, setSettings: Function, getProducts: Function }> = 
                          ({ settings, setSettings, getProducts }) => {

  const ref = useRef<HTMLInputElement>(null);

 
  const [selectedObj, setSelectedObj] = useState({ 
    name: "", 
    description: "", 
    barcode: "",  
    groupCode: ""
  });    
  const [fileList, setFileList] = useState<UploadFile[]>([]); 
  const [uploadedFiles, setUploaded] = useState<any>([]);
  const [loading, setLoading] = useState(false);  


  // When modal is open - align edit or add mode   
  useEffect(() => { 
    if(settings.addVisible){ 
      if(settings.id) {
        fetchProductById(settings.id).then((res:any)=>{ 
          const data = res.data.data; 
          setUploaded(data.image !== null ? [data.image] : [])
          setSelectedObj({  
            name: data.name, 
            description: data.description,   
            barcode: data.barcode,
            groupCode: data.group_code??""
          });  
           
        })
      } 
    } else { setSelectedObj({ name: "", description: "", barcode: "", groupCode: "" }); setUploaded([]) }
    setFileList([]);
  }, [settings.id, settings.addVisible]);

  

  // Adjust datas for api  
  function createNewRow() { 
      if (selectedObj.name.length !== 0 && selectedObj.description.length !==0) {
        setLoading(true);

        const form = new FormData(); 
        if(fileList.length>0) { form.append('image', fileList[0]) } 
        form.append('name', selectedObj.name);
        form.append('description', selectedObj.description);
        form.append('barcode', selectedObj.barcode);
        form.append('group_code', selectedObj.groupCode);
        if(settings.id) { form.append('_method', "PUT") }
        
        (settings.id ? updateProduct(form, settings.id) : addProduct(form))
        .then((res: any) => { 
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
 
          <Input placeholder="Qrup kodu" value={selectedObj.groupCode} style={{ marginTop: "15px" }}
            onChange={(e)=>onChange(e.target.value, "groupCode")} key="groupCode" />  

          <Card style={{ marginTop: "20px" }}>

            <input type="file" ref={ref} onChange={handleFileChange} style={{ width: "91px", marginRight: "10px" }} />
            {fileList.length>0 ? <b>{fileList[0].name}</b> : null}

            <Divider />

            {uploadedFiles.length>0 ?
              <img src={uploadedFiles[0].url} alt="" 
                style={{ width: "70px", display: "block", marginBottom: "10px", float: "left", height: "83px" }} /> : null}

          
          </Card>
   
        </Modal>);
}

export default AddProduct;