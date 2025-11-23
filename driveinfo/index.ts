// Aloita oppimistehtäväsi tällä tiedostolla. 
// Huom! Templatessa valmiina oleva start-skrpiti olettaa, että tämän tiedoston nimi on index.ts. 
// Jos muutat tiedostonimeä, muuta myös skriptiä package.json-tiedostossa
import express from 'express';
import path from 'path';

import apiAjopaivatRouter from './routes/apiAjopaiva';

import virhekasittelija from './errors/virhekasittelija';

const app: express.Application = express();

const portti: number = Number(process.env.PORT) || 3104;

app.use(express.static(path.resolve(__dirname, "public")));

// Routes with defined path
app.use("/api/ajopaiva", apiAjopaivatRouter);

app.use(virhekasittelija);

app.listen(portti, () => {

    console.log(`Palvelin käynnistyi porttiin : ${portti}`);

});