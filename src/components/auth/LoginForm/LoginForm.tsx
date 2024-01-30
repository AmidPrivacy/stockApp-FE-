import React, { useEffect, useState } from 'react';  
import { Button, message } from 'antd';
import { signIn } from '../../../api/sign';  

export const LoginForm: React.FC = () => {  
  const [isLoading, setLoading] = useState(false);
  const [isActiveSubmit, setActiveSubmit] = useState(true);
  const [user, setUser] = useState({ email: "", password: "" })
 
  useEffect(()=> { 
    setTimeout(()=>{
      const userName:any = document.getElementById('id_mail');
      const password:any = document.getElementById('id_password');

      if(userName && userName.matches(':-internal-autofill-selected') &&
          password && password.matches(':-internal-autofill-selected')) {
        setActiveSubmit(false);
      }
        
    }, 1000) 
  }, [])


  const onSubmit = () => { 
    setLoading(true);
    signIn(user).then(res=> { 
      if(res && res.data) { 
          sessionStorage.setItem("token", res.data.access_token); 
          sessionStorage.setItem("full_name", res.data.user); 
          sessionStorage.setItem("role", res.data.role); 
          sessionStorage.setItem("referral_code", res.data.referral_code); 
           
          window.location.assign(res.data.role===5 ? "admin/company-orders" : "/"); 
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
            <Button className="btn" type='primary' loading={isLoading} disabled={isActiveSubmit || 
              user.email.length===0 || user.password.length===0} onClick={onSubmit}>Giriş et</Button>
            <p className="text">Enjoy your system and be happy :)</p>
        </form>
    </div>
  );
};
