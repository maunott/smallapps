import express from 'express';

// import database kunnat
import kunnat, {Kunta} from './models/kunnat';

const app : express.Application = express();

// Assign the port for server
const portti : number = Number(process.env.PORT) || 3102;
// Define interface for which data is used for  web service
interface City {
    
    nimi : string,
    kuntamuoto : string,
    asukkaita : number,
}

interface Kaupunki {
    kuntanro : number,
    nimi : string,
    kuntamuoto : string,
    asukkaita : number,
}

interface Maakunta {
    nimi : string,
    asukkaita : number,
    maakuntanimi_fi : string,
    maakuntanimi_sv : string,
    kaannos : string,
    kaannosv : string
}
// Perusvaatimukset

// Define route for /kunnat  which return all "kunnat" data  as json file
app.get("/kunnat/", (req: express.Request, res : express.Response) : void => {

    //  Creating city array and getting data from kunnat database using map method.
    let city : City [] = kunnat.map((kunta : Kunta) => {
    // If kunta.nimi_fi is different then _sv it add  _sv to parentheses
    if ( kunta.nimi_fi !== kunta.nimi_sv) { 
        return {
        
            nimi : `${kunta.nimi_fi} (${kunta.nimi_sv})`,
            kuntamuoto : `${kunta.kuntamuoto}`,
            asukkaita : kunta.asukkaita
        }
    }else{   
            return {
            
            nimi : `${kunta.nimi_fi}`,
            kuntamuoto : `${kunta.kuntamuoto}`,
            asukkaita : kunta.asukkaita
        }
    }
    });
        res.json(city);
});
// Define route for /kunnat/:kuntanro which returns defined data base on kuntanro
app.get("/kunnat/:kuntanro", (req: express.Request, res : express.Response) : void => {

    let kaupunki : Kaupunki | undefined = kunnat.map((kunta : Kunta) => {

        if ( kunta.nimi_fi !== kunta.nimi_sv) { 
            return {
                kuntanro : kunta.kuntanro,
                nimi : `${kunta.nimi_fi} (${kunta.nimi_sv})`,
                kuntamuoto : `${kunta.kuntamuoto}`,
                asukkaita : kunta.asukkaita
            }
        }else{   
                return {
                kuntanro : kunta.kuntanro,
                nimi : `${kunta.nimi_fi}`,
                kuntamuoto : `${kunta.kuntamuoto}`,
                asukkaita : kunta.asukkaita
            }
        }// Use find method to get wanted kunta information  
        }).find((kaupunki : Kaupunki) => kaupunki.kuntanro === Number(req.params.kuntanro));
       
            
        if (kaupunki) {
           
            let found = {
                nimi : kaupunki.nimi,
                kuntamuoto : kaupunki.kuntamuoto,
                asukkaita : kaupunki.asukkaita,

            }

            res.json(found);
            //Error message
        } else {
            res.json({virhe : `Kuntaa ei löydy`});
        }
 
});
// LISÄVAATIMUKSET
// Define rout for maakunnat/:maakunna_nimi and if require is correct it returns spefic "maakunta" -information
app.get("/maakunnat/:maakunnan_nimi", (req: express.Request, res : express.Response) : void => {
    
    
    let maakunta : Maakunta []= kunnat.map((kunta : Kunta) => {
        // Create new property for maakunta name without  äöå  and letters are only lowercase. Using replace and tolocalelowercase methods
            const replaceLetters =(maat:string) =>{
                maat = maat.toLocaleLowerCase()
                maat = maat.replace(/\å/g, 'o');
                maat = maat.replace(/\ä/g, 'a');
                maat = maat.replace(/\ö/g, 'o');

                return maat;
            }
           
            return{
              
                nimi : kunta.nimi_fi,
                maakuntanimi_fi : kunta.maakuntanimi_fi,
                maakuntanimi_sv : kunta.maakuntanimi_sv,
                asukkaita : kunta.asukkaita,
                kaannos : replaceLetters(kunta.maakuntanimi_fi),
                kaannosv : replaceLetters(kunta.maakuntanimi_sv)
            }
            
          
        }) // filter method  find  correct match of req.params . 
        maakunta = maakunta.filter((maakunta : Maakunta) => maakunta.kaannos === req.params.maakunnan_nimi || maakunta.kaannosv === req.params.maakunnan_nimi )
        
        if (maakunta.length > 0) {
        // how many town is in filtered "maakunta"
        let amount_towns = maakunta.length

        // How many people is in filtered "maakunta". Using forEach method
                let amount_people = 0
                maakunta.forEach((maakunta : Maakunta)=>{
                amount_people = amount_people + maakunta.asukkaita  
            });
        // Define right kind of form with correct data and return it as res.json(area)
                maakunta.map((maakunta : Maakunta)=>{
                let area = {
                    nimi_fi : maakunta.maakuntanimi_fi,
                    nimi_sv : maakunta.maakuntanimi_sv,
                    kaupunkien_kuntien_lkm : amount_towns,
                    asukas_lkm : amount_people
                }
                    res.json(area)
            });
        } else {
        // If not it return "maakunta ei löydy" - "cannot find correct maakunta "
            res.json({virhe : `Maakuntaa ei löydy`});}
  
        });

app.listen(portti, () => {

    console.log(`Palvelin käynnistyi porttiin : ${portti}`);    

});