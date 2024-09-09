import {Medication} from "../Interfaces/Medication";

export interface ResponseData {
    id:number;
    pharmacistName: string;
    medications: Medication[];
    invoiceNumber:String;
    additionalNotes: string | null;
    distance: number;
    total: number;
    pharmacistId:number;
    prescriptionId:number;
    pharmacistLatitude: number;
    pharmacistLongitude: number;
    customerLatitude: number;
    customerLongitude: number;
  }