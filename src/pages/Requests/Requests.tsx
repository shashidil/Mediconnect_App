import React, { useEffect, useState } from 'react';
import { RequestCard, RequestData } from "../../components/Card/RequestCard"
import Image from '../../assets/heart.png'
import { getPrescriptions } from "../../services/api/UploadPrescriptionAPI";

const Requests = () => {
  const [responsesData, setresponsesData] = useState<RequestData[]>([]);
  const [userId, setUserId] = useState<number>(Number);
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(parseInt(storedUserId, 10));
    }
  }, []); 


  useEffect(() => {
    if (userId !== null) {
      const loadUsers = async () => {
        const prescrptionData = await getPrescriptions(userId);
        setresponsesData(prescrptionData);
      };
      loadUsers();
    }
  }, [userId]);
  return (
    <>
    <div style={{background: `url(${Image})`,backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPositionX:'800px'}}>
        <div style={{ display: 'flex', gap: '20px' ,width:'1000px',margin:'0 auto',flexDirection:'column'}}>
        <h1 style={{textAlign:'start'}}>Requests</h1>
      {responsesData.map((Data, index) => (
        <RequestCard key={index} data={Data} />
      ))}
        </div>
    </div>
    </>
  )
}

export default Requests