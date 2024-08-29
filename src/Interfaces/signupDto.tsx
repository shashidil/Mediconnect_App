import { PatientDto } from "./PatientDto";
import { PharmacistDto } from "./PharmacistDto";

export interface SignupDto{
    signupRequestPatient:PatientDto;
    signupRequestPharmacist:PharmacistDto;
}