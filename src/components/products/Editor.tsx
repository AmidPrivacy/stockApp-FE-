import React from 'react'; 
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css'; 
   
const modules = {
  toolbar: [  
    [{ 'size': ['huge', 'large', false, 'small'] }],
    ['bold', 'italic', 'underline'], 
    [
      {  
        color: [],
      },
    ],
    [{ align: '' }, { align: 'center' }, { align: 'right' }],
    [{ list: "bullet" }, { list: "ordered" }],
    ['link'] 
  ],
  clipboard: {
    allowed: {
        tags: ['a', 'b', 'strong', 'p', 'br', 'ul', 'ol', 'li', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        attributes: ['href', 'target']
    },
    keepSelection: false,
    substituteBlockElements: true,
    magicPasteLinks: true,  
    
  },
}

const Editor: React.FC<{ data: string, onChange: Function }> = ({ data, onChange }) => {
  
  return (<ReactQuill theme="snow" placeholder='Təsvir daxil edin' value={data} 
            style={{ margin: "20px 0", height: "153px", paddingBottom: "42px" }}  
            onChange={(e:any)=>onChange(e, "description")}  modules={modules}  />);
}

export default Editor;