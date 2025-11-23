import { readFile} from "fs/promises";
import path from "path";



export interface Select {
    id : number,
    koko: string,
    vari: string,
    varastotilanne: number
}

class Varastolista {

    private selects : Select [] = [];
    private tiedosto : string[] = [__dirname, "tuotteet.json"];
    //Constructor and method readFile + path. 
    //Then if opening file is succesfull. 
    //Catch  if error with opening file-> throw - sending error . 
    constructor() {
        readFile(path.resolve(...this.tiedosto),"utf8")
            .then((data : string) => {
                this.selects = JSON.parse(data)
            })
            .catch((e : any) => {
                throw new Error(e);
            });
    }
    // Return  stock base on  id
        public hae = (id : number) : Select| undefined=> {
           
            
           
            try {
                let stock = this.selects.find((select : Select)=> select.id === id);
                if(stock){
                    const found : any = { varastotilanne : stock.varastotilanne}
                    return found
                   }
                return undefined
           }
            catch (e : any) {
                throw new Error(e);
             } 
             }
        // Return product if it match to size and color  
        public haeKokoVari = (koko?: string, vari?: string ) : Select | undefined=> {
           
               
                try {
                     
                    if(this.selects.find((select : Select)=> select.koko === koko && select.vari === vari )){
                      
                        return this.selects.find((select : Select)=> select.koko === koko && select.vari === vari )
                       }
                       return undefined
                    
                    
             
                       }   catch (e : any ) {
                    throw new Error(e);
                 } 
                 }
        
    }

export default Varastolista;