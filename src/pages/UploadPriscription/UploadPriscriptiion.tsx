import React from "react";
import { Button, Flex,Select,message, Upload } from 'antd'; 
import Logo from '../../assets/logo.png'
import Img from '../../assets/obSignup.png'
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';


const props: UploadProps = {
  name: 'file',
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const { Option } = Select;
const style: React.CSSProperties = { background: '#0092ff', padding: '8px 0' };

interface UploadPriscriptionProps {
  // Add any props you might need for the component
}

export const UploadPriscription: React.FC<UploadPriscriptionProps> = () => {
  return (
<>
  <div style={{ marginBottom: '20px' , marginTop:'20px',width:'40%'}}>
    <img src={Logo} alt="Logo" style={{ width: '350px', height: 'auto' }} />
  </div>
<div className="upload-prescription-container" style={{ display: 'flex', alignItems: 'center' }}>
  <div style={{ width: '40%' }}>
  <div className="dropdown-button-container" style={{ borderRadius: '50px',padding:'20px',boxShadow:'0px 0px 13px 0px #b9b6b6' }}>
        <Select defaultValue="Location" style={{ width: '50%', }}>
          <Option value="Galle">Galle</Option>
          <Option value="matara">matara</Option>
          <Option value="Hambanthota">Hambanthota</Option>
        </Select>
        <Button type="primary" style={{ marginLeft: '5%',background:'#2e384d',padding:'20px',display:'inline-flex',alignItems:'center' }}>SELECT AREA</Button>
        </div>

      <Flex vertical gap="large" style={{ marginTop:'10%' }}>
        <Upload {...props}>
          <Button style={{background:'#2e384d',color:'white',padding:'25px',display:'flex',alignItems:'center',width:'495px',justifyContent:'center'}} icon={<UploadOutlined />}>UPLOAD PRESCRIPTION</Button>
        </Upload>
        <span>Or</span>
        <Button style={{background:'#2e384d',color:'white',padding:'25px',display:'flex',alignItems:'center',width:'495px',justifyContent:'center'}} type="primary" block>
          INQUIRE MEDICINE
        </Button>
        <Button style={{background:'#ff525a',color:'white',padding:'25px',display:'flex',alignItems:'center',width:'495px',justifyContent:'center'}} type="primary" block>
          CHECK AVAILABILITY
        </Button>
      </Flex>
  </div>
      <div style={{ width: '60%' }}>
        <img  src={Img} alt="Prescription Image" style={{ width: '70%',height:'400px', borderRadius: '10px' }} />
      </div>
    </div>


   
</>

    
   
  );
};

