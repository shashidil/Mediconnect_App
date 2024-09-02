import React, { useState } from 'react';
import { Button, Card, Modal } from 'antd';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import{ResponseData} from "../../Interfaces/ResposeData"
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';



interface ResponseCardProps {
  data: ResponseData;
  buttonTexts?: { Order: string; Contact: string };
}

export const ResponseCard: React.FC<ResponseCardProps> = ({ data, buttonTexts }) => {
  const orderText = buttonTexts?.Order || 'Order';
  const contactText = buttonTexts?.Contact || 'Contact';
  const [isMapModalVisible, setIsMapModalVisible] = useState(false);
  const navigate = useNavigate();
  const { Meta } = Card;

  const showMapModal = () => {
    setIsMapModalVisible(true);
  };

  const handleMapModalOk = () => {
    setIsMapModalVisible(false);
  };

  const handleMapModalCancel = () => {
    setIsMapModalVisible(false);
  };

  const handleOrderClick = () => {
    navigate('/patient/orders', { state: data });
    
  };
  const handleContactClick = () => {
    navigate('/patient/chat', { state: { name: data.pharmacistName, id: data.pharmacistId } });
    //console.log(data.pharmacistName);
  };
  return (
    <>
        <Card
            style={{ width: '400px',margin: 20,border:'solid #b6b4b4 1px'}}
            actions={[
                <div style={{ borderTop: '1px solid #b6b4b4',paddingTop: '10px'}} >
                    <Button
                        type="link"
                        onClick={showMapModal}
                        style={{ margin: '0 10px' }}
                    >
                        See More
                    </Button>
                    <Button
                        type="primary"
                        onClick={handleOrderClick}
                        style={{ margin: '0 10px' }}
                    >
                        {orderText}
                    </Button>
                    <Button
                        type="primary"
                        onClick={handleContactClick}
                        style={{ margin: '0 10px' }}
                    >
                        {contactText}
                    </Button>
                </div>

            ]}
        >
            <Meta
                title={data.pharmacistName} // Dynamic title
                description={
                    <div style={{color:'black'}}>

                        <p>Price: {data.total}</p>
                        <p>Distance: {data.distance} KM</p>
                    </div>
                }
            />
        </Card>
      <Modal
        title="Detailed Information"
        open={isMapModalVisible}
        onOk={handleMapModalOk}
        onCancel={handleMapModalCancel}
        footer={null}
        width={800}
      >
        <h3>Pharmacist: {data.pharmacistName}</h3>
        <h4>Total Price: ${data.total}</h4>
        <h4>Distance: {data.distance} km</h4>
        <h4>Additional Notes: {data.additionalNotes || 'None'}</h4>
        
        <h4>Medications:</h4>
        <ul>
          {data.medications.map((medication, index) => (
            <li key={index}>
              <strong>{medication.medicationName}</strong> - {medication.medicationDosage} - {medication.medicationQuantity} units - ${medication.amount}
            </li>
          ))}
        </ul>

        <MapContainer center={[data.pharmacistLatitude, data.pharmacistLongitude]} zoom={13} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[data.pharmacistLatitude, data.pharmacistLongitude]}>
            <Popup>Pharmacist Location</Popup>
          </Marker>
          <Marker position={[data.customerLatitude, data.customerLongitude]}>
            <Popup>Customer Location</Popup>
          </Marker>
        </MapContainer>
      </Modal>
    </>
  );
};
