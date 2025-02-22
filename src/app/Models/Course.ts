import { Category } from "./Category";
import { Domain } from "./Domain";


export interface Course {
    idc: number;
    name:string;
    publish_date:Date;
    duree: string;
    price: number;
    domain:Domain;
   category:Category;
  description:string;
  ratetotal:number;
  numstudents:number;
  image:any;
  tutorname:string;

    }
   
    
    
    
    

