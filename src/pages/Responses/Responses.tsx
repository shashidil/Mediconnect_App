import { ResponseCard, ResponseData } from "../../components/Card/ResponseCard"
import logo from '../../assets/responses.png'
import Image from '../../assets/heart.png'

const responsesData: ResponseData[] = [
    {
        patientName: "John",
        medicationName: "Medicine 1",
        medicationDosage: "10mg",
        medicationQuantity: 5,
        amount: 100,
        additionalNotes: "Take after meal",
        city: "Galle",
        distance: "2.5km",
        price: "1500 LKR",
      },
      {
        patientName: "Alice",
        medicationName: "Medicine 2",
        medicationDosage: "20mg",
        medicationQuantity: 3,
        amount: 80,
        additionalNotes: "Take before sleep",
        city: "Kandy",
        distance: "1.5km",
        price: "2500 LKR",
      },
     
]
export const Responses:React.FC = ()=>{

    return(
        <>
        <div style={{background: `url(${Image})`,backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundPositionX:'800px'}}>
        <div style={{ display: 'flex', gap: '20px' ,width:'1000px',margin:'0 auto',flexDirection:'column'}}>
          <img style={{width:'400px',height:'100px'}} src={logo} alt="" />
          {responsesData.map((data, index) => (
            <ResponseCard 
            key={index} 
            data={data}
            buttonTexts={{ Order: "Order", Contact: "Contact" }} />
          ))}
        </div>
        </div>
        </>
    )
}