import Column from 'antd/es/table/Column';
import deliveryLogo from './logo.png';
import './print.css';
import { Table } from "antd";

function PrintEnvelope() { 

  const products = JSON.parse(sessionStorage.getItem("saleProducts")??"[]");

  return ( <div className='Ticket' id='TicketQueue'>  
    <img src={deliveryLogo} alt='logo' style={{ width: "70px", marginTop: "18px" }} id="logo" />
    <h1>Sürpriz mağazası</h1>
    <p className='branch-name'>
      <b>Mağaza: </b>
      BAKI Ş, YASAMAL R. ŞƏRİFZADƏ K
    </p> 
    <p className='branch-name'>
      <b>Tarix: </b> {sessionStorage.getItem("saleDate")}
    </p> 
    <div className='ticket-content' key='1'> 
    <Table dataSource={products} size="small"  rowKey={(record: any) => record.name} 
      pagination={false} footer={() => <div>Toplam qiymət: <b style={{ float: "right", marginRight: "80px" }}>
      {products.reduce((sum: number, current: any) => sum+current.count*current.price, 0)}.00</b></div>}>
      <Column title="Məhsul/Barkod" key="name" width={150} render={(rec)=><>{rec.name}/{rec.barcode}</>} />  
      <Column title="Qiymət" dataIndex="price" key="price" render={(rec)=><>{rec}</>} /> 
      <Column title="Ədəd"  dataIndex="count" key="count" />  
      <Column title="Toplam" key="price" render={(rec) => {
        return <>{rec.count*rec.price}.00</>  }} /> 
    </Table> 
    </div> 
  </div>);
  }

  export default PrintEnvelope;