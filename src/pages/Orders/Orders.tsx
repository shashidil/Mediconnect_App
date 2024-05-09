import React from 'react'
import { Card } from 'antd';
import payment from '../../assets/payment.png'
import { Button } from 'antd';
import { Divider, Table } from 'antd';
import type { TableColumnsType } from 'antd';

interface DataType {
    key: React.Key;
    itm: string;
    qty: number;
    price: string;
  }

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Item',
      dataIndex: 'itm',
    },
    {
      title: 'Quantity',
      dataIndex: 'qty',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      itm: 'Paracitamol',
      qty: 10,
      price: '2000',
    }
  ];

const Orders = () => {
  return (
    <>
    <div>
        <Card style={{ width: 500,textAlign:'start' }}>
            <h2>Medicare - Galle</h2>
            <Table columns={columns} dataSource={data} size="small" />
            <h3>Total: 2000.00 LKR</h3>
        </Card>
        <div style={{width: 500}}>
            <h4 style={{textAlign:'start'}}>PAYMENT METHOD</h4> 
            <form action="" style={{border:'1px solid #a9a9fd',padding:'20px'}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <div style={{display:'flex'}}> 
                        <input type="checkbox" />
                        <label htmlFor="">Credit Card Details</label>
                    </div>
                    <img style={{width:'70px'}} src={payment} alt="" />
                </div>
                <div style={{marginTop:'20px'}}>
                    <input placeholder='Card Number' style={{outline:'none',width:'70%',padding:'10px'}} type="text" />
                    <input placeholder='MM' style={{borderTop:'2px solid #ccc',borderBottom:'2px solid #ccc',outline:'none',width:'10%',padding:'10px',borderRight:'none',borderLeft:'1px solid #ccc'}} type="text" />
                    <input placeholder='YY' style={{borderTop:'2px solid #ccc',borderBottom:'2px solid #ccc',outline:'none',width:'10%',padding:'10px',borderRight:'none',borderLeft:'none'}} type="text" />
                    <input placeholder='CVC' style={{borderTop:'2px solid #ccc',borderRight:'2px solid #ccc',borderBottom:'2px solid #ccc',outline:'none',width:'10%',padding:'10px',borderLeft:'none'}} type="text" />
                </div>
            </form>
            <Button style={{display:'flex',alignItems:'center',marginTop:'30px',background:'#2e384d',padding:'25px 50px',color:'white',borderRadius:'20px'}}>Pay</Button>
        </div>
    </div>
    </>
  )
}

export default Orders