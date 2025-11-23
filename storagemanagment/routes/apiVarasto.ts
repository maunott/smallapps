import express from 'express';

import Varastolista from '../models/varastolista';
import { Viesti} from '../errors/virhekasittelija';

const varastolista : Varastolista = new Varastolista();

const apiVarastoRouter : express.Router = express.Router();


apiVarastoRouter.use(express.json());

// Get STOC
apiVarastoRouter.get("/:id", (req : express.Request, res : express.Response, next : express.NextFunction) => {
    if(varastolista.hae(Number(req.params.id))){
        try {
            
                res.json(varastolista.hae(Number(req.params.id)));
               
            } catch(e : any) {
                next(new Viesti (400, "varastotilanne : ei tietoa"));   
    
                
            }
        } else {
            next(new Viesti (400, "varastotilanne : ei tietoa"));   
        }
    });
// Get stock base on  size and color
    apiVarastoRouter.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (typeof req.query.koko === "string" && typeof req.query.vari === "string" && req.query.koko !== null && req.query.vari !== null) {
            try {
                const select = varastolista.haeKokoVari(req.query.koko, req.query.vari);
                if (select !== undefined) {
                    res.json(select);
                } else {
                    next(new Viesti(400, "varastotilanne : ei tietoa"));
                }
            } catch(e: any) {
                next(new Viesti(400, "varastotilanne : ei tietoa"));
            }
        } else {
            next(new Viesti(400, "varastotilanne : ei tietoa"));
        }
    });


export default apiVarastoRouter;