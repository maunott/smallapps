import { readFile, writeFile } from "fs/promises";
import path from "path";

export interface Tuote {
    id : number,
    koko : string,
    vari : string,
    varastotilanne : number
}

// To open data and use
class Tuotelista {
    
    private tuotteet : Tuote[] = [];
    private tiedosto : string[] = [__dirname, "tuotteet.json"];
    //Constructor and method readFile + path. 
    //Then if opening file is succesfull. 
    //Catch  if error with opening file-> throw - sending error . 
    constructor() {
        readFile(path.resolve(...this.tiedosto),"utf8")
            .then((data : string) => {
                this.tuotteet = JSON.parse(data)
            })
            .catch((e : any) => {
                throw new Error(e);
            });
    }
    //(GET) Method haeKaikki to get list all products -> ApiTuotteetRouter.get   
    public haeKaikki = () : Tuote[] => {

        try {
            return this.tuotteet
        } catch (e : any) {
            throw new Error(e);
        }
        
    }
    //(GET) Method haeYksi to find wanted product by Id -> ApiTuotteetRouter.get 
    public haeYksi = (id : number) : Tuote | undefined => {
        try {
            
            return this.tuotteet.find((tuote : Tuote) => tuote.id === id)
        }catch (e : any) {
            throw new Error(e);
        }
    }

    //(POST) Method lisaa to add new product - > ApiTuotteetRouter.post 
    public lisaa = async (uusiTuote : Tuote) : Promise<void> => {

        try {

            this.tuotteet = [
                ...this.tuotteet,
                {
                    id : this.tuotteet.sort((a : Tuote,b : Tuote) => a.id - b.id)[this.tuotteet.length - 1].id + 1,
                    koko : uusiTuote.koko,
                    vari : uusiTuote.vari,
                    varastotilanne : uusiTuote.varastotilanne
                }                
            ];

          
        await    this.tallenna();
        
        } catch (e : any) {
            throw new Error(e);
        }         

    }
    // Method Tallenna  is for saving the changes 
    private tallenna = async () : Promise<void> => {
        try {
            await writeFile(path.resolve(...this.tiedosto),JSON.stringify(this.tuotteet, null, 2),"utf8");
        } catch (e : any) {
            throw new Error(e);
        }
    
    }
    //(PUT) Method muokkaa to modify product - >  ApiTuotteetRouter.put 
    public muokkaa = async (muokattuTuote : Tuote, id : number)  : Promise<void> => {

        try {

            this.tuotteet = this.tuotteet.filter(( tuote : Tuote)=> tuote.id !== id);
            this.tuotteet = [
                ...this.tuotteet,
                {
                    id : id,
                    koko : muokattuTuote.koko,
                    vari : muokattuTuote.vari,
                    varastotilanne : muokattuTuote.varastotilanne
                }                
            ].sort((a : Tuote, b : Tuote) => a.id - b.id);   
          
        await   this.tallenna();
        
        } catch (e : any) {
            throw new Error(e);
        }         

    }
    //(DELETE) Method poista to remove product ->  ApiTuotteetRouter.delete 
    public poista = async (id : number)  : Promise<void> => {

   
        try {

            this.tuotteet = this.tuotteet.filter(( tuote : Tuote)=> tuote.id !== id);
          
        await   this.tallenna();
         
        
        } catch (e : any) {
            throw new Error(e);
        } 
          
    }
    
}

export default Tuotelista;