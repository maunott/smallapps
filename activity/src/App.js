/* Asenna "mui"  varten 'yarn add @mui/material @emotion/react @emotion/styled'*/
/* Asenna Reititystä varten 'yarn add react-router-dom@5.2.0'
/*Asenna Asenna päivänmääriä varten 'yarn add @mui/lab @mui/material' ja 'yarn add date-fns @date-io/date-fns' */ 

import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider} from '@mui/lab';

import Aika from './components/Aika';
import { fi } from 'date-fns/locale';
import Etusivu from './components/Etusivu';


function App() {

const [kaikkiminuutit, setKaikkiminuutit] = useState(Number());  
const [kaikkitunnit, setKaikkitunnit] = useState(Number());
const [aktiviteetit,setAktiviteetit] = useState([{  
                                                    laji: '',
                                                    alku: '',
                                                    loppu: ''
                                                  
                                                  }]);
 
useEffect( () => {

    if (kaikkiminuutit >= 60) {
      setKaikkiminuutit(kaikkiminuutit-60);
      setKaikkitunnit(kaikkitunnit + 1);
      console.log('kaikkiminuutit:' + kaikkiminuutit);
    } 

  }, [kaikkiminuutit, kaikkitunnit] );

 
return (
    <Router>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={fi} >
        <Route path="/" exact>
      <Etusivu aktiviteetit={aktiviteetit}  kaikkitunnit={kaikkitunnit}  kaikkiminuutit={kaikkiminuutit} ></Etusivu>      
    </Route>
    <Route path="/Aika">
        <Aika aktiviteetit={aktiviteetit} setAktiviteetit={setAktiviteetit} kaikkitunnit={kaikkitunnit} setKaikkitunnit={setKaikkitunnit}  kaikkiminuutit={kaikkiminuutit} setKaikkiminuutit={setKaikkiminuutit}></Aika>
     </Route>   
       </LocalizationProvider>
    </Router>
  );
}

export default App;