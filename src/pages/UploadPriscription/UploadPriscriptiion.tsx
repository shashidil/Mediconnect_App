import React from "react";
import { Button, Row, Col, Flex } from 'antd'; 
import { PateintDashboard } from "../../components/Dashboards/PateintDashboard";
const style: React.CSSProperties = { background: '#0092ff', padding: '8px 0' };

interface UploadPriscriptionProps {
  // Add any props you might need for the component
}

export const UploadPriscription: React.FC<UploadPriscriptionProps> = () => {
  return (
<>
<Flex vertical gap="large" style={{ width: '50%' }}>
    <Button type="primary" block>
      UPLOAD PRESCRPTION
    </Button>
    <Button type="primary" block>
      Primary
    </Button>
    <Button type="primary" block>
      Primary
    </Button>
    
  </Flex>
   
</>


    
    // <div className="upload-prescription-container">
    //   <Row gutter={[16, 16]} align="middle">
    //     <Col flex="auto">
    //       <div className="button-side">
    //         <Button block type="primary">Upload Prescription</Button>
    //         <Button block>Inquire Medicine</Button>
    //         <Button block>Check Availability</Button>
    //       </div>
    //     </Col>
    //     <Col>
    //       <div className="image-side">
    //         <img src="path/to/your/image.jpg" alt="Prescription Image" style={{ maxWidth: '100%' }} />
    //       </div>
    //     </Col>
    //   </Row>
    // </div>
    
   
  );
};

