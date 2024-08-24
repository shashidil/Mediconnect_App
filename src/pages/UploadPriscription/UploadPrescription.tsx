import React, { useState, useEffect } from 'react';
import { Button, Select, message, Upload, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

import { fetchPharmacistsByCity, fetchPharmacistsByState ,uploadPrescription} from '../../services/api/UploadPrescriptionAPI';
import { StatesAndCities } from '../../utils/StatesAndCities';
import Logo from '../../assets/logo.png';
import Img from '../../assets/obSignup.png';

const { Option } = Select;



export const UploadPrescription: React.FC= () => {
  const [file, setFile] = useState<File | null>(null);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [pharmacists, setPharmacists] = useState<{ id: number; name: string }[]>([]);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const statesData = StatesAndCities.getStates();
    setStates(statesData);
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(parseInt(storedUserId, 10));
    }
    
  }, []);

  const handleStateChange = (value: string) => {
    setSelectedState(value);
    setSelectedCity(null); // Reset city selection
    const citiesData = StatesAndCities.getCities(value);
    setCities(citiesData);
  };

  const handleCityChange = (value: string) => {
    setSelectedCity(value);
  };

  const handleSelectArea = async () => {
    if (!selectedState) {
      message.error('Please select a state');
      return;
    }

    try {
      let pharmacistsData = [];
      if (selectedCity) {
        pharmacistsData = await fetchPharmacistsByCity(selectedCity);
      } else {
        pharmacistsData = await fetchPharmacistsByState(selectedState);
      }
      setPharmacists(pharmacistsData);
      setModalVisible(true);
    } catch (error) {
      message.error('Failed to fetch pharmacists');
    }
  };

  const handleUpload = async () => {
    if (!file || !userId) {
      message.error('Please select a file and ensure you are logged in');
      return;
    }

    const pharmacistIds = pharmacists.map(pharmacist => pharmacist.id);
    
    try {
      await uploadPrescription(file, userId,  pharmacistIds );
      message.success('File uploaded successfully');
      setModalVisible(false);
    } catch (error) {
      message.error('File upload failed');
    }
  };

  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      setFile(file);
      return false;
    },
    onRemove: () => {
      setFile(null);
    },
  };

  return (
    <>
      <div style={{ marginBottom: '20px', marginTop: '20px', width: '40%' }}>
        <img src={Logo} alt="Logo" style={{ width: '350px', height: 'auto' }} />
      </div>
      <div className="upload-prescription-container" style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ width: '40%' }}>
          <div className="dropdown-button-container" style={{ borderRadius: '50px', padding: '20px', boxShadow: '0px 0px 13px 0px #b9b6b6' }}>
            <Select placeholder="Select State" style={{ width: '50%' }} onChange={handleStateChange}>
              {states.map(state => (
                <Option key={state} value={state}>{state}</Option>
              ))}
            </Select>
            {selectedState && cities.length > 0 && (
              <Select placeholder="Select City" style={{ width: '50%', marginLeft: '5%' }} onChange={handleCityChange}>
                {cities.map(city => (
                  <Option key={city} value={city}>{city}</Option>
                ))}
              </Select>
            )}
            <Button type="primary" onClick={handleSelectArea} style={{ marginLeft: '5%', background: '#2e384d', padding: '20px', display: 'inline-flex', alignItems: 'center' }}>
              SELECT AREA
            </Button>
          </div>

          <div style={{ marginTop: '10%' }}>
            <Upload {...uploadProps}>
              <Button style={{ background: '#2e384d', color: 'white', padding: '25px', display: 'flex', alignItems: 'center', width: '495px', justifyContent: 'center' }} icon={<UploadOutlined />}>UPLOAD PRESCRIPTION</Button>
            </Upload>
            <span>Or</span>
            <Button style={{ background: '#2e384d', color: 'white', padding: '25px', display: 'flex', alignItems: 'center', width: '495px', justifyContent: 'center' }} type="primary" block>
              INQUIRE MEDICINE
            </Button>
            <Button onClick={handleUpload} style={{ background: '#ff525a', color: 'white', padding: '25px', display: 'flex', alignItems: 'center', width: '495px', justifyContent: 'center' }} type="primary" block>
              CHECK AVAILABILITY
            </Button>
          </div>
        </div>
        <div style={{ width: '60%' }}>
          <img src={Img} alt="Prescription Image" style={{ width: '70%', height: '400px', borderRadius: '10px' }} />
        </div>
      </div>

      <Modal
        title="Select Pharmacist"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
      >
        {pharmacists.map(pharmacist => (
          <p key={pharmacist.id}>{pharmacist.name}</p>
        ))}
      </Modal>
    </>
  );
};
