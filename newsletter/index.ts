import express from 'express';
import path from 'path';
const app: express.Application = express();

const portti: number = Number(process.env.PORT) || 3101;



// PERUSVAATIMUKSET

app.get("/", (req: express.Request, res: express.Response): void => {
   
    // Create array for the information messages
    let ilmoitus : string[] = []
    // Requests go through an if statement and add selected message by push method
    if (req.query.nimi !== "" && req.query.email !== "" && req.query.kayttoehdot !== undefined  ) {
        ilmoitus.push("<li>Olet tilannut onnistuneesti uutiskirjeemme. Kiitos!<li>")
    }
    if (req.query.nimi === "" || req.query.email === "" || req.query.kayttoehdot === undefined  ) {
        ilmoitus.splice(0,3)
        ilmoitus.push("<li>Anna nimesi sekä sähköpostiosoitteesi ja hyväksy käyttöehdot<li>")  
        
    }
    
    // The server's response contains the html with bootstrap formatting and the information added to the ilmoitus array
   res.send(`<!DOCTYPE html>
   <html>
       <head>
           <title>Tilaa uutiskirje</title>
           <meta charset="UTF-8">
           <meta name="viewport" content="width=device-width, initial-scale=1.0">
           <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
           <style>
               body {
                    padding-top: 50px;
                   
               }
               ul {
                    list-style-type: none; 
               }
           </style>    
       </head>
       <body>
           <div class="container">
            <ul>
            ${ilmoitus.map(t => (`<li>${t}</li>`)).join('')}
            </ul>
           </div>
       </body>
   </html>`)
});
//LISÄVAATIMUKSET
app.use(express.static(path.resolve(__dirname, "public")));
app.get("/ilmoitus", (req: express.Request, res: express.Response): void => {
    // Create array for the information messages
    let ilmoitus : string[] = []
    // Requests go through an if statement and add selected message by push method
    if (req.query.nimi !== "" && req.query.email !== "" && req.query.kayttoehdot !== undefined  ) {
        ilmoitus.push("<li>Olet tilannut onnistuneesti uutiskirjeemme. Kiitos!<li>")
    }
    if (req.query.nimi === "" ) {
        ilmoitus.push("<li>Nimitiedot ovat puutteliset!<li>")
        
    }
    if (req.query.email === "" ) {
        ilmoitus.push("<li>Emailtiedot ovat puutteliset!<li>")
        
    }
    if (req.query.kayttoehdot === undefined  ) {
        ilmoitus.push("<li>hyväksy käyttöehdot<li>")
                
    }
    if (req.query.nimi === "" && req.query.email === "" && req.query.kayttoehdot === undefined  ) {
        ilmoitus.splice(0,3)
        ilmoitus.push("<li>Anna nimesi sekä sähköpostiosoitteesi ja hyväksy käyttöehdot<li>")  
        
    }
    
    // The server's response contains the html with bootstrap formatting and the information added to the ilmoitus array
   res.send(`<!DOCTYPE html>
   <html>
       <head>
           <title>Tilaa uutiskirje</title>
           <meta charset="UTF-8">
           <meta name="viewport" content="width=device-width, initial-scale=1.0">
           <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
           <style>
               body {
                    padding-top: 50px;
                   
               }
               ul {
                    list-style-type: none; 
               }
           </style>    
       </head>
       <body>
           <div class="container">
            <ul>
            ${ilmoitus.map(t => (`<li>${t}</li>`)).join('')}
            </ul>
           </div>
       </body>
   </html>`)
});

app.listen(portti, () => {

    console.log(`Palvelin käynnistyi porttiin : ${portti}`);

});