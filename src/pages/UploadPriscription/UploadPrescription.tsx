import React, { useState, useEffect } from 'react';
import {Button, Select, message, Upload, Modal, Card,Input,Table,Space,Empty} from 'antd';
import { UploadOutlined,SearchOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

import { fetchPharmacistsByCity, fetchPharmacistsByState ,uploadPrescription,inquireMedicine} from '../../services/api/UploadPrescriptionAPI';
import { StatesAndCities } from '../../utils/StatesAndCities';
import Logo from '../../assets/logo.png';
import Img from '../../assets/obSignup.png';
import { Col, Row} from 'antd';
import {MedicationReminder} from "../../services/MedicationReminder";

const { Option } = Select;
const noData ='https://img.freepik.com/free-vector/push-notifications-concept-illustration_114360-4986.jpg?t=st=1725008501~exp=1725012101~hmac=d09d3e24cc9db36e1903536acd355ea1968508aadf8ae7cca109aea91d529457&w=826';

interface Notification {
  message: string;
  timestamp: string;
}


export const UploadPrescription: React.FC= () => {
  const [file, setFile] = useState<File | null>(null);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [pharmacists, setPharmacists] = useState<{ id: number; name: string }[]>([]);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [inquireModalVisible, setInquireModalVisible] = useState(false); 
  const [medicationName, setMedicationName] = useState<string>(''); 
  const [medicationQuantity, setMedicationQuantity] = useState<number>(0);

  useEffect(() => {
    const statesData = StatesAndCities.getStates();
    setStates(statesData);
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(parseInt(storedUserId, 10));
      MedicationReminder(storedUserId.toString())
    }


  }, []);

  const handleStateChange = (value: string) => {
    setSelectedState(value);
    setSelectedCity(null); 
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

  const handleInquireMedicine = async () => {
    if (!medicationName || medicationQuantity <= 0 || !userId) {
      message.error('Please provide valid medication details');
      return;
    }

    try {
      const pharmacistIds = pharmacists.map(pharmacist => pharmacist.id);
      await inquireMedicine(userId, medicationName, medicationQuantity, pharmacistIds);
      message.success('Medicine inquiry sent successfully');
      setInquireModalVisible(false); 
    } catch (error) {
      message.error('Medicine inquiry failed');
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
      setFile(null);
      setModalVisible(false);
    } catch (error) {
      message.error('File upload failed');
    }
  };

  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      const isSupportedType = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'application/pdf';
      if (!isSupportedType) {
        message.error('You can only upload JPG/PNG/PDF files!');
        return Upload.LIST_IGNORE;
      }
      setFile(file);
      return false; 
    },
    onRemove: () => {
      setFile(null);
    },
  };

  const notifications: Notification[] = [
    {
      message: 'Description for notification 1',
      timestamp: '2024-08-30T12:00:00Z',
    },
    {
      message: 'Description for notification 2',
      timestamp: '2024-08-30T13:00:00Z',
    },
    {
      message: 'Description for notification 1',
      timestamp: '2024-08-30T12:00:00Z',
    },
    {
      message: 'Description for notification 2',
      timestamp: '2024-08-30T13:00:00Z',
    },
    {
      message: 'Description for notification 2',
      timestamp: '2024-08-30T13:00:00Z',
    },

    // Add more notifications as needed
  ];

  const handleSearch = (selectedKeys: React.Key[], confirm: () => void, dataIndex: string) => {
    confirm();
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
  };

  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}: any) => (
        <div style={{padding: 8}}>
          <Input
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{width: 188, marginBottom: 8, display: 'block'}}
          />
          <Space>
            <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                size="small"
                style={{width: 90}}
            >
              Search
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size="small" style={{width: 90}}>
              Reset
            </Button>
          </Space>
        </div>
    ),
    filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>
    ),
    onFilter: (value: any, record: any) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
  });

  const columns = [
    {
      title: 'Time',
      dataIndex: 'timestamp',
      key: 'timestamp',
      ...getColumnSearchProps('timestamp'),
      render: (timestamp: number) => {
        // Convert timestamp to local date and time
        const localDateTime = new Date(timestamp * 1000).toLocaleString();
        return <span>{localDateTime}</span>;
      }
    },
    {
      title: 'Notification',
      dataIndex: 'message',
      key: 'message',
      ...getColumnSearchProps('alertMessage')
    }
  ];

  const paginationConfig = {
    pageSize: 5
  };

  return (
      <>
        <Row justify="center" style={{ margin: '3% 0%' }}>
          <img src={Logo} alt="Logo" style={{ width: '350px', height: 'auto' }} />
        </Row>
        <Row gutter={16} style={{ display: 'flex', alignItems: 'stretch' }}>
          <Col span={12}>
            <Card style={{ minHeight: '65vh',border:'1px solid #cfcfcf' }}>

              <div className="upload-prescription-container" style={{ alignItems: 'center' , marginTop:'30px'}}>
                <div>
                  {/* Dropdowns and buttons */}
                  <div className="dropdown-button-container"
                       style={{
                         borderRadius: '50px',
                         padding: '20px',
                         boxShadow: '0px 0px 13px 0px #b9b6b6',
                       }}
                  >
                    {/* Select components */}
                    <Select placeholder="Select State" style={{ width: '50%' }} onChange={handleStateChange}>
                      {states.map((state) => (
                          <Option key={state} value={state}>{state}</Option>
                      ))}
                    </Select>
                    {selectedState && cities.length > 0 && (
                        <Select placeholder="Select City" style={{ width: '50%', marginLeft: '5%' }}
                                onChange={handleCityChange}
                        >
                          {cities.map((city) => (
                              <Option key={city} value={city}>{city}</Option>
                          ))}
                        </Select>
                    )}
                    <Button
                        type="primary"
                        onClick={handleSelectArea}
                        style={{
                          marginLeft: '5%',
                          background: '#2e384d',
                          padding: '20px',
                          display: 'inline-flex',
                          alignItems: 'center',
                        }}
                    >
                      SELECT AREA
                    </Button>
                  </div>

                  {/* Upload and other buttons */}
                  <div style={{ marginTop: '10%' }}>
                    <Upload {...uploadProps}>
                      <Button
                          style={{
                            background: '#2e384d',
                            color: 'white',
                            padding: '25px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          icon={<UploadOutlined />}
                      >
                        UPLOAD PRESCRIPTION
                      </Button>
                    </Upload>
                    <span>Or</span>
                    <Button
                        onClick={() => setInquireModalVisible(true)}
                        style={{
                          background: '#2e384d',
                          color: 'white',
                          padding: '25px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        type="primary"
                        block
                    >
                      INQUIRE MEDICINE
                    </Button>

                    <Modal
        title="Inquire Medicine"
        open={inquireModalVisible}
        onCancel={() => setInquireModalVisible(false)}
        onOk={handleInquireMedicine}
        okText="Submit"
      >
        <Input
          placeholder="Medication Name"
          value={medicationName}
          onChange={(e) => setMedicationName(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <Input
          placeholder="Medication Quantity"
          type="number"
          value={medicationQuantity}
          onChange={(e) => setMedicationQuantity(parseInt(e.target.value, 10))}
          style={{ marginBottom: '10px' }}
        />
      </Modal>

                    <Button
                        onClick={handleUpload}
                        style={{
                          background: '#ff525a',
                          marginTop: '10px',
                          color: 'white',
                          padding: '25px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        type="primary"
                        block
                    >
                      CHECK AVAILABILITY
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card style={{ height: '100%', border:'1px solid #cfcfcf' }}>
              {/* Your second card content */}
              <h1>Notifications</h1>
              {notifications.length !== 0 ? (
                  <>
                    {/*<div>Total Notifications: {notifications.length}</div>*/}
                    <Table dataSource={notifications} columns={columns} pagination={paginationConfig} />
                  </>
              ) : (
                  <>
                    <div className="map-container map-placeholder">
                      <div>
                        <Empty
                            image={noData}
                            imageStyle={{
                              height: 200,
                            }}
                            description={<span>No new notifications...</span>}
                        />
                      </div>
                    </div>
                  </>
              )}
            </Card>
          </Col>
        </Row>
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
