import { ResponseCard, ResponseData } from "../../components/Card/ResponseCard"

const responsesData: ResponseData[] = [
    {
        patientName: "John",
        medicationName: "Medicine 1",
        medicationDosage: "10mg",
        medicationQuantity: 5,
        amount: 100,
        additionalNotes: "Take after meal",
      },
      {
        patientName: "Alice",
        medicationName: "Medicine 2",
        medicationDosage: "20mg",
        medicationQuantity: 3,
        amount: 80,
        additionalNotes: "Take before sleep",
      },
     
]
export const Responses:React.FC = ()=>{

    return(
        <>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' ,width:'100%'}}>
      {responsesData.map((data, index) => (
        <ResponseCard 
        key={index} 
        data={data}
        buttonTexts={{ Order: "Order", Contact: "Contact" }} />
      ))}
    </div>
        </>
    )
}