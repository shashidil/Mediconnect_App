import React from "react";
import { Button, Row, Col, Flex,Select } from 'antd'; 


const { Option } = Select;
const style: React.CSSProperties = { background: '#0092ff', padding: '8px 0' };

interface UploadPriscriptionProps {
  // Add any props you might need for the component
}

export const UploadPriscription: React.FC<UploadPriscriptionProps> = () => {
  return (
<>

<div className="upload-prescription-container" style={{ display: 'flex', alignItems: 'center' }}>
  <div style={{ width: '50%' }}>
  <div className="dropdown-button-container" style={{ border: '1px solid #d9d9d9', borderRadius: '10px',padding:'20px' }}>
        <Select defaultValue="Location" style={{ width: '50%' }}>
          <Option value="location1">Location 1</Option>
          <Option value="location2">Location 2</Option>
          <Option value="location3">Location 3</Option>
        </Select>
        <Button type="primary" style={{ marginLeft: '5%' }}>SELECT LOCATION</Button>
        </div>

      <Flex vertical gap="large" style={{ marginTop:'20%' }}>
        <Button type="primary" block>
          UPLOAD PRESCRIPTION
        </Button>
        <Button type="primary" block>
          INQUIRE MEDICINE
        </Button>
        <Button type="primary" block>
          CHECK AVAILABILITY
        </Button>
      </Flex>
  </div>
      <div style={{ width: '50%' }}>
        <img src="../../assets/uploadimage.jpg" alt="Prescription Image" style={{ width: '100%', borderRadius: '10px' }} />
      </div>
    </div>


   
</>

    
   
  );
};

