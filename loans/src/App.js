
import { useState } from 'react';
import './App.css';

function App() {

  const [henkilo,setHenkilo] = useState();
  const [arvo,setArvo] = useState(0);
  const [velat, setVelat] = useState([{ nimi:'****', summa: Number()

                                      }]);
  const [saatavat, setSaatavat] = useState([{ name:'****', sum: Number()

                                    }]);
  const [kokonaisVelka, setKokonaisVelka] = useState(0);
  const [kokonaisSaatava, setKokonaisSaatava] = useState(0);  

  // velan lisäys taulukkoon
  const lisaaVelka =()=> {
      
    let uusiVelkaApu = { nimi: henkilo,
                         summa: arvo};

    setVelat([...velat,uusiVelkaApu]);
    laskeVelka(uusiVelkaApu.summa);
  }
  //  saatavan lisäys taulukkoon
  const lisaaSaatava =()=> {
      
    let uusiSaatavaApu = { name: henkilo,
                         sum: arvo};

    setSaatavat([...saatavat,uusiSaatavaApu]);
    laskeSaatava(uusiSaatavaApu.sum);
  }
  // Rivien poisto saatavat ja velat
   const poistaRivi = (rivi) =>{
      setVelat(velat.filter((velat, indeksi)=> indeksi !== rivi));
      vahennaVelka(velat[rivi].summa);
    }
    const riviPoista = (rivi) =>{
      console.log(saatavat[rivi].sum);
      setSaatavat(saatavat.filter((saatavat, idx)=> idx !== rivi));
      vahennaSaatava(saatavat[rivi].sum);
    }
    //Velka lisäys ja vähennys
    const vahennaVelka = (maara) =>{
      let apu = Number(maara);
      setKokonaisVelka(kokonaisVelka-apu);
      
    }
    const laskeVelka = (maara) =>{
      let apu = Number(maara);
      setKokonaisVelka(kokonaisVelka+apu);
      
    }
    //Saatavat lisäys ja vähennys
    const laskeSaatava = (maara) =>{
      let apu = Number(maara);
      setKokonaisSaatava(kokonaisSaatava+apu);
      
    }
    const vahennaSaatava = (maara) =>{
      let apu = Number(maara);
      setKokonaisSaatava(kokonaisSaatava-apu);
      
    }


  return (
    <div className='App'>
      <h2>Velat</h2>
    <table className='velat'>
      
      <tbody>
        
      <tr><td>Kenelle</td><td>Summa</td></tr>
    { velat.map((velka, indeksi)=> 
    
    <tr key={indeksi}>
      <td>{velka.nimi}</td>
      <td>{velka.summa}</td>
      <td><button onClick={() => poistaRivi(indeksi) }>Delete</button></td>
    </tr>
    )}</tbody></table>
     <h2>Saatavat</h2>
   <table className='saatavat'>
     
      <tbody>
        
       <tr><td>Kenelle</td><td>Summa</td></tr>
    { saatavat.map((saatava, idx)=> 
   
    <tr key={idx}>
      <td>{saatava.name}</td>
      <td>{saatava.sum}</td>
      <td><button onClick={() => riviPoista(idx)}>Poista</button></td>
    </tr>
    )}</tbody></table>
    <div className='syotto'>
    <input
    type="text" 
    placeholder="Kenelle..." 
    onChange={ (e) => {setHenkilo(e.target.value)  } } 
    />
    
    <input
    type="text" 
    placeholder="Summa..." 
    onChange={ (e) => {setArvo(e.target.value)  } } 
    />
    <button className='lisaavelka' onClick={lisaaVelka}>Lisää velka</button>
    <button className='lisaavelka' onClick={lisaaSaatava}>Lisää saatava</button>
    </div>
    Saatavat:{kokonaisSaatava} <br></br>
    Velat:{kokonaisVelka}
    </div>
  );
}

export default App;
