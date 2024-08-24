import { ResponseCard } from "../../components/Card/ResponseCard"
import{ResponseData} from "../../Interfaces/ResposeData"
import logo from '../../assets/responses.png'
import Image from '../../assets/heart.png'
import { useEffect, useState } from "react"
import { GetInvoice } from "../../services/api/InvoiceAPI"

export const Responses:React.FC = ()=>{
  const [responsesData,setResponsesData] = useState<ResponseData[]>([]);
  const [userId, setUserId] = useState<number>(Number);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(parseInt(storedUserId, 10));
    }
  }, []);

  useEffect(() => {
    if (userId !== null) {
      const fetchInvoices = async () => {
        const invoices = await GetInvoice(userId);
        setResponsesData(invoices);
      };
      fetchInvoices();
    }
  }, [userId]);

  const sortedResponses = Array.isArray(responsesData) ? responsesData.sort((a, b) => a.distance - b.distance || a.total - b.total) : [];

    return(
        <>
       <div style={{ background: `url(${Image})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPositionX: '800px' }}>
      <div style={{ display: 'flex', gap: '20px', width: '1000px', margin: '0 auto', flexDirection: 'column' }}>
        <img style={{ width: '400px', height: '100px' }} src={logo} alt="Logo" />
        {sortedResponses.map((data, index) => (
          <ResponseCard key={index} data={data} buttonTexts={{ Order: "Order", Contact: "Contact" }} />
        ))}
      </div>
    </div>
        </>
    )
}