import { useState } from 'react';
import './App.css';
import Kirjautuminen from './components/Kirjautuminen';
import Pikaostoskori from './components/Pikaostoskori';
import Tuotenostot from './components/Tuotenostot';
import VerkkokauppaFooter from './components/VerkkokauppaFooter';
import VerkkokauppaHeader from './components/VerkkokauppaHeader';



function App() {

  
  
  const [hinnasto, setHinnasto] = useState(0);
  const [summat, setSummat] = useState(0);
  
  const laskuri =(idx)=>{
    setSummat(summat+1)
    setHinnasto(hinnasto + idx);
    console.log(summat)
  }
  
  return (
    <div className="App">
       <VerkkokauppaHeader></VerkkokauppaHeader>
       <div className='container'>
      <Tuotenostot hinta={hinnasto => laskuri(hinnasto) }></Tuotenostot>
      <div className='rightBox'>
           <Kirjautuminen/>
           <Pikaostoskori>
          :{hinnasto} :{summat}
          </Pikaostoskori>
           
          </div>
         </div>
        <VerkkokauppaFooter></VerkkokauppaFooter>
     
    </div>
  );
}

export default App;
