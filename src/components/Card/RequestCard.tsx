import React ,{ useState } from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';




import { Avatar, Card,Button } from 'antd';
import { url } from 'inspector';

const { Meta } = Card;

export interface RequestData {
  patientName: string;
  medicationName: string;
  medicationDosage: string;
  medicationQuantity: number;
  amount: number;
  additionalNotes: string;
  city: string;
  distance: string;
  price: string;
  drug: string;
  address: string;
}
interface RequestCardProps{
  data: RequestData;
  buttonTexts?: { Order: string; Contact: string };
}

export const RequestCard:React.FC<RequestCardProps> = ({data, buttonTexts }) =>{
  const orderText = buttonTexts?.Order || 'Order';
  const contactext = buttonTexts?.Contact || 'Contact';
  const [showMap, setShowMap] = useState(false);
    return(
        <>
          <Card
            style={{ width: "100%"}}
            // cover={
            //   <img
            //     alt="example"
            //     src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            //   />
            // }
            // actions={[
            //   <Button>{orderText} </Button>,
            //   <Button>{contactext}</Button>,
              
            // ]}
          >
    
          {/* <Meta
              avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${data.patientName}`} />}
              title={data.medicationName}
              description={`Quantity: ${data.medicationQuantity}, Dosage: ${data.medicationDosage}`}
            /> */}
            <div style={{display:'flex',textAlign:'start',fontWeight:'500',flexDirection:'column'}}>
              <h1>{data.patientName}</h1>
              <h4 style={{margin:'0',fontWeight:'400'}}>Medicine name - {data.drug}</h4>
              <h4 style={{margin:'0',fontWeight:'400'}}>Qty - {data.medicationQuantity}</h4>
              <h4 style={{margin:'0',fontWeight:'400'}}>Address - {data.address}</h4>
              <a style={{margin:'10px 0',position:'absolute',top:'170px'}} href="">See more</a>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',width:'35%',float:'right'}}>
              <button style={{background:'#2e384d',padding:'12px',color:'white',width:'140px',borderRadius:'5px',fontWeight:'bold',border:'0'}}>Order</button>
              <button style={{padding:'12px',color:'#2e384d',width:'140px',borderRadius:'5px',fontWeight:'bold',border:'0'}}>Contact</button>
            </div>
          </Card>
        </>
    )
} 