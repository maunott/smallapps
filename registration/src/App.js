import Aloitus from './components/Aloitus';
import Saannot from './components/Saannot';
import Valikko from './components/Valikko';
import Ilmoittaudu from './components/Ilmoittaudu';
import Kiitos from './components/Kiitos';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {useState} from 'react';


function App() {

  const [tiedot,setTiedot] = useState([{
    nimi: "",
    sukunimi: "",
    asuinpaikka:"",
    puhelinnumero:"",
    sahkoposti : "",
    ikasarja : ""

    }]);
  return (
    <Router>
      
      <Valikko/>
      <Route path="/" exact component={Aloitus} />
      <Route path="/saannot" component={Saannot} />  
       
      <Route path="/Ilmoittaudu">
        <Ilmoittaudu tiedot={tiedot} setTiedot={setTiedot}></Ilmoittaudu>
        </Route>
       <Route path="/Kiitos">
        <Kiitos tiedot={tiedot} setTiedot={setTiedot}></Kiitos>
        </Route>
    </Router>
  );
}

export default App;
