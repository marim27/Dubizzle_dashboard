export interface Iproduct {
  _id:string;
  title:string;
  description:string;
  price:number;
  currency:string;
  images:string;
  condition:string;
  locationid:any; //ref
  sellerid:any;   //ref
  subCategoryID:any;  //ref
  productStatus:string;
  Categoryid:any; //ref
  createdAt:string;
  updatedAt:string;

}
