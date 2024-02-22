import React from 'react';
import { ConfigProvider } from 'antd';   
import { AppRouter } from './components/router/AppRouter';  
import "lightgallery.js/dist/css/lightgallery.css";
import { LightgalleryProvider } from "react-lightgallery";

const App: React.FC = () => { 
  
  return ( 
      <ConfigProvider>
        <LightgalleryProvider>
          <AppRouter />
        </LightgalleryProvider>
      </ConfigProvider> 
  );
};

export default App;
