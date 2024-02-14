import React, { useState, useEffect, useRef } from 'react';
import { message, Button, Modal, Divider, Popconfirm } from 'antd';   
import { DeleteOutlined } from '@ant-design/icons';
import FormData from 'form-data';
import type { UploadFile } from 'antd/es/upload/interface';
import { AddOrDeleteImage, deleteImage, fetchProductById } from "../../api/products"; 
import config from '../../lib/config/app';


const AddImage: React.FC<{ settings: any, resetRow: Function }> = ({ settings, resetRow }) => {

  const ref = useRef<HTMLInputElement>(null);
   
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [allFiles, setAllFiles] = useState([]);

  useEffect(() => { 
    if(settings.imgVisible && settings.id !==null) {
      getImages(); 
    } else {
      setFileList([])
      if(ref.current !==null)
        ref.current.value="";
    }
  },[settings])


  const getImages = () => {
    fetchProductById(settings.id).then((res:any)=>{ 
      setAllFiles(res.data.data.images);
    })
  }
  
   
  function handleUpload() {  
    if (settings !==null) {

      const formData = new FormData();
      fileList.forEach((file) => { formData.append('images[]', file) }); 
      formData.append('_method', "PUT")
      setUploading(true);  

      AddOrDeleteImage(formData, settings.id) 
        .then((_res:any) => { 
 
          setFileList([]);
          getImages(); 
          message.success('upload successfully.') 
          
        })
        .catch(() => { message.error('upload failed.') })
        .finally(() => { setUploading(false) });
  
    } else {
      message.warning("Zəhmət olmasa icazə seçin")
    }
  }


  function handleDelete(id: number) {

    const formData = new FormData();
    formData.append('deleted_images[]', id); 
    formData.append('_method', "PUT")
    AddOrDeleteImage(formData, settings.id).then((res:any)=>{
      getImages();
      message.success("Şəkil silindi");
    })
  }


  const handleFileChange = (e: any) => { 
    if(e.target.files.length>0)
      setFileList([...e.target.files]);
  };

  return (<div>
    <Modal open={settings.imgVisible}
      title="Şəkil əlavəsi"
      footer={[
        <Button key="back" onClick={() => resetRow()}>
          Ləğv et
        </Button>,
        <Button key="submit" type="primary" onClick={handleUpload}
         disabled={fileList.length === 0} loading={uploading}>
          Yadda saxla
        </Button>,
      ]}
      onCancel={() => resetRow()}
    > 
      <input type="file" ref={ref} onChange={handleFileChange} multiple style={{ width: "91px" }} />
     
      {fileList.length>0 ? fileList.map((file:any)=> <p>{file.name} </p>) : null}

      <Divider />

      <ul style={{ listStyle: "none", padding: 0, minHeight: "70px" }}>
        {allFiles.map((res:any)=>
          <li style={{ marginLeft: "10px", display: "inline-block" }}>

            <img src={res.url} style={{ height: "70px", display: "block", marginBottom: "10px", float: "left" }} 
               alt="" key={res.id} />

            <Popconfirm placement="top" okText="Bəli" cancelText="Xeyr" title="Şəkili silmək istəyirsinizmi?" onConfirm={() =>handleDelete(res.id)}>
                <DeleteOutlined rev="label" style={{ cursor: "pointer", position: "absolute", marginLeft: "-15px" }} />
            </Popconfirm>   
          </li>)}
      </ul>
    </Modal>
  </div>);
}

export default AddImage;