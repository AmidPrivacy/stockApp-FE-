import React, { useState } from 'react';  
import { Button, message } from 'antd';
import { signIn } from '../../../api/sign';  

export const LoginForm: React.FC = () => {  
  const [isLoading, setLoading] = useState(false); 
  const [user, setUser] = useState({ email: "", password: "" })
  

  const onSubmit = () => { 
    setLoading(true);
    signIn(user).then(res=> { 
      if(res && res.data) { 
          sessionStorage.setItem("token", res.data.access_token); 
          sessionStorage.setItem("full_name", res.data.user.first_name+" "+res.data.user.last_name);  
           
          window.location.assign("/admin/products"); 
      } else {
        message.error("Sistem xətası")
      }
      setLoading(false);
    })
  };




  return (
    <div className="container">
        <h1>SİSTEMƏ GİRİŞ</h1>
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
