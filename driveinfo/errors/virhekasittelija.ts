import express from 'express' ;

export class Viesti extends Error {
    status : number
    viesti : string
    
   
    constructor(status : number, viesti : string){
        super();
        this.status = status;
        this.viesti = viesti;
      
        
    }
}


const virhekasittelija = (err : Viesti, req : express.Request, res : express.Response, next : express.NextFunction) => {
     
 
    res.status(err.status).json({viesti : err.viesti});

}




export default virhekasittelija;