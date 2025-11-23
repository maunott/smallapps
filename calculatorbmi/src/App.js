import { useState } from 'react';
import './App.css';

function App() {
  
  const [pituus, setPituus] = useState();
  const [paino, setPaino] = useState();
  const [teksti, setTeksti] = useState();

  const laskePainoindeksi = () => {


    let tulos = (paino / (pituus / 100) / (pituus / 100)).toFixed(2);

    if (tulos < 15) {
      setTeksti(`Painoindeksi on: ${tulos} sairaalloinen alipaino`);

    }
    if (tulos > 15 && tulos < 17) {
      setTeksti(`Painoindeksi on:  ${tulos} merkittävä alipaino `);

    }
    if (tulos > 17 && tulos < 18.5) {
      setTeksti(`Painoindeksi on: ${tulos} normaali alhaisempi paino`);

    }
    if (tulos > 18.5 && tulos < 25) {
      setTeksti(`Painoindeksi on: ${tulos}  normaali paino`);

    }
    if (tulos > 25 && tulos < 30) {
      setTeksti(`Painoindeksi on: ${tulos}  lievä ylipaino`);

    }
    if (tulos > 30 && tulos < 35) {
      setTeksti(`Painoindeksi on: ${tulos}  merkittävä ylipaino`);

    }
    if (tulos > 35 && tulos < 40) {
      setTeksti(`Painoindeksi on: ${tulos} vaikea ylipaino`);

    }
    if (tulos > 40) {
      setTeksti(`Painoindeksi on: ${tulos} sairaalloinen ylipaino`);

    }


  }





  return (
    <div>
      <h1>Painoindeksilaskuri</h1>
      <div className='boxOne'>
        <input
          type="string"
          placeholder="anna pituus senttimetreinä"
          onChange={(e) => {
            setPituus(Number(e.target.value))
          }}
        />
      </div>
      <div className='boxTwo'>
        <input
          type="string"
          placeholder="anna paino kilogrammoina"
          onChange={(e) => {
            setPaino(Number(e.target.value))
          }} />

      </div>


      <button onClick={laskePainoindeksi}>Laske painoindeksi</button>

      <p>Käyttäjältä kysytään pituus senttimetreissä (huom!) ja paino kilogrammoina kahdella allekkaisella tekstikentällä.
        Näiden alapuolella on painonappi "Laske painoindeksi". Napin painaminen suorittaa laskutoimituksen ja tulostaa tuloksen samalle sivulle muodossa "Painoindeksi on: xx.xx". Huomaa pyöristys kahteen desimaaliin.
        Riippuen laskutuloksesta, ohjelma tulostaa myös painoindeksiä vastaavan kuvaustekstin (esim. "normaali paino", "lievä ylipaino")</p>

      <div className="tulos">
        {teksti}

      </div>



    </div>
  );
}

export default App;
