import React, { useState } from 'react';
import { Button, Card, Modal } from 'antd';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

export interface Medication {
  medicationName: string;
  medicationDosage: string;
  medicationQuantity: number;
  amount: number;
}

export interface ResponseData {
  pharmacistName: string;
  medications: Medication[];
  invoiceNumber:String;
  additionalNotes: string | null;
  distance: number;
  total: number;
  pharmacistId:number;
  pharmacistLatitude: number;
  pharmacistLongitude: number;
  customerLatitude: number;
  customerLongitude: number;
}

interface ResponseCardProps {
  data: ResponseData;
  buttonTexts?: { Order: string; Contact: string };
}

export const ResponseCard: React.FC<ResponseCardProps> = ({ data, buttonTexts }) => {
  const orderText = buttonTexts?.Order || 'Order';
  const contactText = buttonTexts?.Contact || 'Contact';
  const [isMapModalVisible, setIsMapModalVisible] = useState(false);
  const navigate = useNavigate();

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

  return (
    <>
      <Card>
        <div style={{ display: 'flex', textAlign: 'start', fontWeight: '500', flexDirection: 'column' }}>
          <h4 style={{ margin: '0' }}>Pharmacist - {data.pharmacistName}</h4>
          <h4 style={{ margin: '0' }}>Total Price: ${data.total}</h4>
          <h4 style={{ margin: '0' }}>Distance: {data.distance} km</h4>
          <a style={{ margin: '10px 0', cursor: 'pointer', color: '#1890ff' }}onClick={showMapModal}>
            See more
          </a>
        
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '35%', float: 'right' }}>
          <Button
            style={{
              background: '#2e384d',
              padding: '12px',
              color: 'white',
              width: '140px',
              borderRadius: '5px',
              fontWeight: 'bold',
              border: '0',
              margin: '10px'
            }}
            onClick={handleOrderClick}
            >
            {orderText}
          </Button>
          <Button
            style={{
              background: '#2e384d',
              padding: '12px',
              color: 'white',
              width: '140px',
              borderRadius: '5px',
              fontWeight: 'bold',
              border: '0',
              margin: '10px'
            }}>
            {contactText}
          </Button>
        </div>
      </Card>

      <Modal
        title="Detailed Information"
        visible={isMapModalVisible}
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
