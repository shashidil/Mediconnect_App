import React from 'react'
import { RequestCard, RequestData } from "../../components/Card/RequestCard"
import Image from '../../assets/heart.png'

const responsesData: RequestData[] = [
    {
        patientName: "J L S Dilshan",
        medicationName: "Medicine 1",
        medicationDosage: "10mg",
        medicationQuantity: 5,
        amount: 100,
        additionalNotes: "Nipun Lakshan",
        city: "Galle",
        distance: "2.5km",
        price: "1500 LKR",
        drug: "panadol",
        address: "312, galle labuduwa",
      },
      {
        patientName: "Lakshan Madubhashika",
        medicationName: "Medicine 2",
        medicationDosage: "20mg",
        medicationQuantity: 3,
        amount: 80,
        additionalNotes: "Take before sleep",
        city: "Kandy",
        distance: "1.5km",
        price: "2500 LKR",
        drug: "Vitamin C",
        address: "312, ABC kandy",
      },
     
]

const Requests = () => {
  return (
    <>
    <div style={{background: `url(${Image})`,backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPositionX:'800px'}}>
        <div style={{ display: 'flex', gap: '20px' ,width:'1000px',margin:'0 auto',flexDirection:'column'}}>
            <h1 style={{textAlign:'start'}}>Requests</h1>
          {responsesData.map((data, index) => (
            <RequestCard 
            key={index} 
            data={data}
            buttonTexts={{ Order: "Order", Contact: "Contact" }} />
          ))}
        </div>
    </div>
    </>
  )
}

export default Requests