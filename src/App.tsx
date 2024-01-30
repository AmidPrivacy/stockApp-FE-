import React from 'react';
import { ConfigProvider } from 'antd';   
import { AppRouter } from './components/router/AppRouter';  

const App: React.FC = () => { 
  
  return ( 
      <ConfigProvider>
        <AppRouter />
      </ConfigProvider> 
  );
};

export default App;
