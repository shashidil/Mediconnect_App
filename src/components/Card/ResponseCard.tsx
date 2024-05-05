import React ,{ useState } from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';


import { Avatar, Card,Button } from 'antd';

const { Meta } = Card;

export interface ResponseData {
  patientName: string;
  medicationName: string;
  medicationDosage: string;
  medicationQuantity: number;
  amount: number;
  additionalNotes: string;
}
interface ResponseCardProps{
  data: ResponseData;
  buttonTexts?: { Order: string; Contact: string };
}

export const ResponseCard:React.FC<ResponseCardProps> = ({data, buttonTexts }) =>{
  const orderText = buttonTexts?.Order || 'Order';
  const contactext = buttonTexts?.Contact || 'Contact';
  const [showMap, setShowMap] = useState(false);
    return(
        <>
        <Card
    style={{ width: 300 }}
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }
    actions={[
      <Button>{orderText} </Button>,
      <Button>{contactext}</Button>,
      
    ]}
  >
   
    <Meta
        avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${data.patientName}`} />}
        title={data.medicationName}
        description={`Quantity: ${data.medicationQuantity}, Dosage: ${data.medicationDosage}`}
      />
      <div>
        Amount: {data.amount}
        <br />
        Additional Notes: {data.additionalNotes}
      </div>
  </Card>
        </>
    )
} 