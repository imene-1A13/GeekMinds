import { Country } from "./country";
import { ERole } from "./erole";
import { Speciality } from "./speciality";


export interface User {
    linkedin:string;

    idUser: number;
    Firstname:string;
    username: string;
    lastName: string;
    birthdate: Date;
    phone: number;
    registrationDate: Date;
    email: string;
    password: string;
    picture: string;
    badge: string;
    connected: boolean;
    resetPasswordToken: string;
    blocked: boolean;
    role:ERole;
    speciality:Speciality;
    country:Country;
    sex:string;
    address:string;
cv:any; 
  
   


    }
   
    
    
    
    

