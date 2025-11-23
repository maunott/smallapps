import express from 'express';

import Tuotelista, { Tuote } from '../models/tuotelista';

import { Viesti} from '../errors/virhekasittelija';


const tuotelista : Tuotelista = new Tuotelista();


// Define router apiTuotteetRouter as express.Router 
const apiTuotteetRouter : express.Router = express.Router();

// router gets body and convert to json
apiTuotteetRouter.use(express.json());


// GET  all products route
apiTuotteetRouter.get("/",(req : express.Request, res : express.Response, next : express.NextFunction) => {
    try {
        res.json(tuotelista.haeKaikki())
        
    } catch(e : any) {
        res.json({ "viesti" : "Tuotteiden hakeminen epäonnistui" })
    }

    next();
   
})

// GET product by id route
apiTuotteetRouter.get("/:id", (req : express.Request, res : express.Response, next : express.NextFunction) => {
    
    
    if(tuotelista.haeYksi(Number(req.params.id))){
    try {
        
            res.json(tuotelista.haeYksi(Number(req.params.id)));
           
        } catch(e : any) {
            next(new Viesti (400, "Vastaavaa Id:tä ei löytynyt"));   

            
        }
    } else {
        next(new Viesti (400, "Vastaavaa Id:tä ei löytynyt"));   
    }
});




// POST route to add data to database
apiTuotteetRouter.post("/", async (req : express.Request, res : express.Response, next : express.NextFunction) => {
    
   // 
    let uusiTuote : Tuote = {
        id : 0,
        koko : req.body.koko,
        vari : req.body.vari,
        varastotilanne :req.body.varastotilanne
    }
    
  
    if (uusiTuote.koko.length > 0 && uusiTuote.vari.length > 0 && uusiTuote.varastotilanne !== 0){
    try {
            await tuotelista.lisaa(uusiTuote);
            next(new Viesti(200,"Tuote lisätty onnistuneesti"));
            
        
    } catch(e : any) {

         next(new Viesti(400,"Tuotteen lisääminen epäonnistui"));
         
    }
   
    }else {
        next(new Viesti(400,"Tuotteen lisääminen epäonnistui"));
        
    }
 
});
// PUT route to modify specific id 
apiTuotteetRouter.put("/:id", async (req : express.Request, res : express.Response, next : express.NextFunction) => {

    let muokattuTuote : Tuote = {
        id : req.body.id,
        koko : req.body.koko,
        vari : req.body.vari,
        varastotilanne :req.body.varastotilanne
    }
    
    if (muokattuTuote.koko.length > 0 && muokattuTuote.vari.length > 0 && muokattuTuote.varastotilanne !== 0){
        try {
                await tuotelista.muokkaa(muokattuTuote, Number(req.params.id));
                next(new Viesti(200,"Tuote muokattu onnistuneesti"));
                
            
        } catch(e : any) {
    
             next(new Viesti(400,"Tuotteen muokkaaminen epäonnistui"));
             
        }
       
        }else {
            next(new Viesti(400,"Tuotteen muokkaaminen epäonnistui"));
            
        }
})
// DELETE route to remove by id 
apiTuotteetRouter.delete("/:id", async(req : express.Request, res : express.Response, next : express.NextFunction) => {

    if(tuotelista.haeYksi(Number(req.params.id))) {
        
        try {
            await tuotelista.poista(Number(req.params.id));
            next(new Viesti(200,"Tuote poistettu onnistuneesti"))
           
            
        } catch(e : any) {
            next(new Viesti(400,"Tuotteen poistaminen epäonnistui"))
        }
    } else {
        next(new Viesti(400, "Tuotteen poistaminen epäonnistui"));   
    }
});
export default apiTuotteetRouter;