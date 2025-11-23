// Aloita oppimistehtäväsi tällä tiedostolla. 
// Huom! Templatessa valmiina oleva start-skrpiti olettaa, että tämän tiedoston nimi on index.ts. 
// Jos muutat tiedostonimeä, muuta myös skriptiä package.json-tiedostossaimport express from 'express';
import express from 'express';
import path from 'path';

import apiTuotteetRouter from './routes/apiTuotteet';
import apiVarastoRouter from './routes/apiVarasto';
import virhekasittelija from './errors/virhekasittelija';

const app : express.Application = express();

const portti : number = Number(process.env.PORT) || 3103;

app.use(express.static(path.resolve(__dirname, "public")));

// Routes with defined path
app.use("/api/tuotteet", apiTuotteetRouter);
app.use("/api/varastotilanne", apiVarastoRouter);
app.use(virhekasittelija);

app.listen(portti, () => {

    console.log(`Palvelin käynnistyi porttiin : ${portti}`);    

});