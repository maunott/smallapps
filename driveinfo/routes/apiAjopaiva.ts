import express  from 'express';



import { Viesti } from '../errors/virhekasittelija';
import { PrismaClient } from '@prisma/client';



const prisma : PrismaClient = new PrismaClient();

// Define router apiAjopaivatRouter as express.Router 
const apiAjopaivatRouter : express.Router = express.Router();

// router gets body and convert to json
apiAjopaivatRouter.use(express.json());


// GET  all products route
apiAjopaivatRouter.get("/", async(req : express.Request, res : express.Response, next : express.NextFunction) => {
    try {
        res.json(await prisma.ajopaiva.findMany());
        
    } catch(e : any) {
       next(new Viesti(400, "Error HaeKaikki"));
    }

    

})

// GET product by id route
apiAjopaivatRouter.get("/:id", async (req : express.Request, res : express.Response, next : express.NextFunction) => {
    
    

        try {
        
        if(await prisma.ajopaiva.count({
            where : {
                id : Number(req.params.id)
            }
        }) === 1) { 
            res.json(await prisma.ajopaiva.findUnique({
                where : {
                    id : Number(req.params.id)
                }
            }))
        } else {
        next(new Viesti (400, "Vastaavaa Id:tä ei löytynyt"));   
        }   
        } catch(e : any) {
            next(new Viesti (400, "Vastaavaa Id:tä ei löytynyt"));   

            
        }
    
});




// POST route to add data to database
apiAjopaivatRouter.post("/", async (req : express.Request, res : express.Response, next : express.NextFunction) => {
    
  
     
  
    if (req.body.reitti?.length > 0 && Number(req.body.matka?.length) > 0 && Number(req.body.kayttaja?.length) > 0 ){
    try {
        const date_one = req.body.pvm;
        const form = /^\d{2}\.\d{2}\.\d{4}$/;
      
           
            if(form.test(date_one)){
                       
           
            res.json(await prisma.ajopaiva.create({
                data : {
                    reitti : req.body.reitti,
                    matka : Number(req.body.matka),
                    kayttaja : Number(req.body.kayttaja),
                    pvm : date_one
                }
              
            }))


          
        }else {
            
            const date = new Date()
            const date_select = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
            
            res.json(await prisma.ajopaiva.create({
                data : {
                    reitti : req.body.reitti,
                    matka : Number(req.body.matka),
                    kayttaja :Number(req.body.kayttaja),
                    pvm : date_select
                }
               
            }))
        
                
        }
               
    // Errors messages      
            
        
    } catch(e : any) {
        
         next(new Viesti(400,"Ajopäivän lisääminen epäonnistui"));
         
    }

    }else {
        
        next(new Viesti(400,"Ajopäivän lisääminen epäonnistui"));
        
    }
 
});
// PUT route to modify specific id 
apiAjopaivatRouter.put("/:id", async (req : express.Request, res : express.Response, next : express.NextFunction) => {

    
   
    if(await prisma.ajopaiva.count({
        where : {
            id : Number(req.params.id),
            kayttaja : Number(req.body.kayttaja)
        }
    })===1)    {
    
    if (req.body.reitti?.length > 0 && 
        req.body.matka?.length > 0 && 
        req.body.kayttaja?.length > 0 && 
        req.body.pvm?.length > 0 ) {
        try {

           
                res.json(await prisma.ajopaiva.update({
                    where : {
                        id : Number(req.params.id)
                      
                    },
                    data : {
                        reitti : req.body.reitti,
                        matka : Number(req.body.matka),
                        kayttaja : Number(req.body.kayttaja),
                        pvm : req.body.pvm
                    }
          
               }))
                
               
           
                    
    // Errors Messages    
        } catch(e : any) {
           
             next(new Viesti(400,"Ajopäivän muokkaaminen epäonnistui"));
             
        }
    
        }else{
            next(new Viesti(400,"Ajopäivän muokkaaminen epäonnistui")); 
        }

    }else {
            
            next(new Viesti(404,"Ajopäivän muokkaaminen epäonnistui"));
            
        }
})
// DELETE route to remove by id 
apiAjopaivatRouter.delete("/:id", async(req : express.Request, res : express.Response, next : express.NextFunction) => {

    if(await prisma.ajopaiva.count({
         where : {
            id : Number(req.params.id)
        }
    })) {
        try {
                
               

           res.json(await prisma.ajopaiva.delete({
                where : {
                    id : Number(req.params.id)
                }

            }));
           
                
  
           
           
                
            
    // Errors Messages
    } catch(e : any) {
       
         next(new Viesti(400,"Ajopäivän poistaminen epäonnistui"));
         
    }

    }else {
        
        next(new Viesti(404,"Ajopäivän poistaminen epäonnistui"));
     
    }

});
export default apiAjopaivatRouter;