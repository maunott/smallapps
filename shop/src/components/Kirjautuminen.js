import {useState} from 'react';


function Kirjautuminen (props) {
const [tiedot, setTiedotOk] = useState('');
const [user,setUser] = useState();
  const [pass,setPass] = useState();
  
  const tarkistus = () => {
        
    if ( user === 'testi' && pass === 'testi') {
      setTiedotOk(true);
      
    } else {
      setTiedotOk(false);
    }

  }

return (
<div>
<ul>
  <li><input
        variant="outlined"
        label="Nimi"
        placeholder="nimi"
       
      
        onChange={ (e) => { setUser(e.target.value) } }
      /></li>
  <li> 
        <input
        variant="outlined"
        label="Salasana"
        placeholder="salasana"
   
       
        onChange={ (e) => { setPass(e.target.value) } }
      />  </li>
      <li><button onClick={tarkistus}>Kirjaudu</button></li>
      </ul>
  
 {console.log(tiedot)}
</div>

);

}

export default Kirjautuminen;

