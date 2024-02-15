import React, { useState } from 'react';  
import { Button, message, Flex, Radio } from 'antd'; 
import { signIn } from '../../../api/sign';  

export const LoginForm: React.FC = () => {  
  const [isLoading, setLoading] = useState(false); 
  const [user, setUser] = useState({ email: "", password: "", auth: "admin" })
  

  const onSubmit = () => { 
    setLoading(true);
    signIn(user).then(res=> { 
      if(res && res.data) { 
          sessionStorage.setItem("token", res.data.access_token); 
          sessionStorage.setItem("full_name", user.auth==="seller" ? res.data.user.name : 
                                              res.data.user.first_name+" "+res.data.user.last_name);  
          sessionStorage.setItem("role", user.auth); 
          window.location.assign(user.auth==="seller" ? "/admin/orders" : "/admin/products"); 
      } else {
        message.error("Sistem xətası")
      }
      setLoading(false);
    })
  };




  return (
    <div className="container">
        <h1>SİSTEMƏ GİRİŞ</h1>
        <Flex vertical gap="middle" style={{ marginBottom: "55px" }}>
          <Radio.Group value={user.auth} buttonStyle="solid" 
            onChange={(e)=>setUser( prev => ({ ...prev, auth: e.target.value }))}
            style={{ display: "flex", justifyContent: "center" }}>
            <Radio.Button value="user" style={{ width: "32%" }}>İstifadəçi</Radio.Button>
            <Radio.Button value="admin" style={{ width: "32%" }}>Admin</Radio.Button>
            <Radio.Button value="seller" style={{ width: "32%" }}>Firma</Radio.Button> 
          </Radio.Group>
        </Flex>
        <form>
            <div className="form-control">
                <input type="text" required name="email" id='id_mail' value={user.email} 
                  onChange={(e)=>setUser( prev => ({ ...prev, email: e.target.value }) )} />
                <label>
                  <span>E</span>
                  <span>m</span>
                  <span>a</span>
                  <span>i</span>
                  <span>l</span> 
                </label>
            </div>
            <div className="form-control">
                <input type="password" required name="password" id='id_password' value={user.password} 
                  onChange={(e)=>setUser( prev => ({ ...prev, password: e.target.value }) )} />
                <label>
                  <span>P</span>
                  <span>a</span>
                  <span>s</span>
                  <span>s</span>
                  <span>w</span>
                  <span>o</span>
                  <span>r</span>
                  <span>d</span> 
                </label>
            </div>
            <Button className="btn" type='primary' loading={isLoading} disabled={user.email.length===0 
                                      || user.password.length===0} onClick={onSubmit}>Giriş et</Button>
            <p className="text">Enjoy your system and be happy :)</p>
        </form>
    </div>
  );
};
