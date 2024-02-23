import Column from 'antd/es/table/Column';
import deliveryLogo from './logo2.png';
import './print.css';
import { Table } from "antd";

function PrintEnvelope() { 

  const products = JSON.parse(sessionStorage.getItem("saleProducts")??"[]");

  return ( <div className='Ticket' id='TicketQueue'>  
    <img src={deliveryLogo} alt='logo' id="logo" />
    {/* <h1>Sürpriz mağazası</h1> */}
    <p className='branch-name'>
      <b>Mağaza: </b>
      BAKI Ş, YASAMAL R. ŞƏRİFZADƏ K
    </p> 
    <p className='branch-name'>
      <b>Tarix: </b> {sessionStorage.getItem("saleDate")}
    </p> 
    <div className='ticket-content' key='1'> 

      <table>
        <thead>
          <tr>
            <td>Məhsul/Barkod</td>
            <td>Qiymət</td>
            <td>Ədəd</td>
            <td>Toplam</td>
          </tr>
        </thead>
        <tbody>
          {products.map((rec:any)=><tr>
            <td>
              {rec.name}<div>{rec.barcode}</div>
            </td>
            <td>{rec.price}</td>
            <td>{rec.count}</td>
            <td>{rec.count*rec.price}.00</td>
          </tr>)}
        </tbody>
        <tfoot>
          <tr>
          <div className='total-price'>
            <div>Toplam qiymət:</div> 
            <span>---------- </span>
            <b>
              {products.reduce((sum: number, current: any) => sum+current.count*current.price, 0)}.00
            </b>
          </div>
        </tr>
        </tfoot>
      </table> 
    </div> 
    <p className='branch-name' style={{ textAlign: "left", marginTop: "7px", marginLeft: "2px" }}>
      <b>Əlaqə: </b> +994 51 488 11 12
    </p> 
  </div>);
  }

  export default PrintEnvelope;