import Column from 'antd/es/table/Column';
import deliveryLogo from './print-logo.svg';
import './print.css';
import { List, Table, Tag } from "antd";

function PrintEnvelope() { 

  const products = JSON.parse(sessionStorage.getItem("saleProducts")??"[]");

  return ( <div className='Ticket' id='TicketQueue'>  
    <img src={deliveryLogo} alt='logo' style={{ width: "200px", marginTop: "18px" }} />
    <h1>Sürpriz mağazası</h1>
    <p className='branch-name'>
      <b>Mağaza: </b>
      BAKI Ş, YASAMAL R. ŞƏRİFZADƏ K
    </p> 
    <div className='ticket-content' key='1'> 
    <Table dataSource={products} size="small"  rowKey={(record: any) => record.name} 
      pagination={false} footer={() => <div>Toplam qiymət: <b style={{ float: "right", marginRight: "80px" }}>
      {products.reduce((sum: number, current: any) => sum+current.count*current.price, 0)}.00 AZN</b></div>}>
      <Column title="Məhsul"  dataIndex="name" key="name" width={150} /> 
      <Column title="Barkod"  dataIndex="barcode" key="barcode" /> 
      <Column title="Miqdar(ədəd)"  dataIndex="count" key="count" /> 
      <Column title="Qiymət" dataIndex="price" key="price" render={(rec)=><>{rec} AZN</>} /> 
      <Column title="Toplam" key="price" render={(rec) => {
        return <>{rec.count*rec.price}.00 AZN</>  }} /> 
    </Table>
      {/* <List
        size="large"
        header={null}
        footer={products.length>0 ? <div>Toplam qiymət: <b style={{ float: "right", marginRight: "80px" }}>
                {products.reduce((sum: number, current: any) => sum+current.count*current.price, 0)}AZN</b></div> : null}
        bordered
        dataSource={products}
        renderItem={(item:any) => <List.Item key={item.barcode} style={{ padding: "10px" }}>
          <div key={item.barcode+item.name}>{item.name}</div>
          <div key={item.barcode} style={{ padding: "0 2px", borderLeft: "solid 1px #ccc",
                                            borderRight: "solid 1px #ccc", margin: "0 4px" }} >
            {item.barcode}
          </div> 
          <div key={item.barcode+item.count}> <Tag>{item.count}</Tag> </div> 
          <div key={item.barcode+item.price}>{item.price}AZN</div>
        </List.Item>}
      /> */}
    </div>
    <div className='ticket-footer'>
      <h6>ALDIĞINIZ MƏHSULU 14 GÜN ƏRZİNDƏ QAYTARA BİLƏRSİNİZ!</h6>
    </div>
  </div>);
  }

  export default PrintEnvelope;