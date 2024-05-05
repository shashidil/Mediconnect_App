import { PatientDto } from "./PatientDto";
import { PharmacistDto } from "./PharmacistDto";

export interface SignupDto{
    patientRequest:PatientDto;
    pharmacistRequest:PharmacistDto;
}