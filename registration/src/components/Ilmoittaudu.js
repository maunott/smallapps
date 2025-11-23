import { Container, Typography, Button, TextField, Checkbox, FormControlLabel, FormControl, FormHelperText, Radio, FormLabel, RadioGroup } from '@mui/material';

import { useState, useRef} from 'react';
import { useHistory } from 'react-router-dom';




function Ilmoittaudu(props) {
    

 
  const history = useHistory();
  
  const lomaketiedot = useRef({});
  const [virheilmoitus, setVirheilmoitus] = useState({});
  const lomakekenttanimi = useRef();
  const lomakekenttaSukunimi = useRef();
  const lomakekenttaAsuinpaikka = useRef();
  const lomakekenttaPuhelinumero = useRef();
  const lomakekenttaSahkoposti = useRef();
 
  const lomakeKasittelija = (e) => {
     
    e.preventDefault();

    let ilmoittautumisApu = {   nimi:lomakekenttanimi.current.value,
                                sukunimi: lomakekenttaSukunimi.current.value,
                                asuinpaikka: lomakekenttaAsuinpaikka.current.value,
                                puhelinnumero:lomakekenttaPuhelinumero.current.value,
                                sahkoposti:lomakekenttaSahkoposti.current.value,
                                ikasarja: lomaketiedot.current.ikasarja
                            
                            } 
    props.setTiedot([ilmoittautumisApu]);

    let virheet = {};
   
       
   
      
    
  
    if (lomaketiedot.current.email || lomaketiedot.current.puhelinnumero) {

        virheet = {}
        
      }
      if (lomaketiedot.current.email && lomaketiedot.current.email.search("@") === -1 ) {

        virheet = {...virheet, email : "Virheellinen sähköpostiosoite"}
        
      }

    if (!lomaketiedot.current.nimi) {

      virheet = {...virheet, nimi : "Nimi puuttuu"}
      
    }
    if (lomaketiedot.current.nimi && lomaketiedot.current.nimi.length < 2) {

        virheet = {...virheet, nimi : "Nimesi on liian lyhyt"}
        
      } 
      if (!lomaketiedot.current.sukunimi) {

        virheet = {...virheet, sukunimi : "sukunimi puuttuu"}
        
      }
      if (lomaketiedot.current.sukunimi && lomaketiedot.current.sukunimi.length < 2) {
  
          virheet = {...virheet, sukunimi : "sukunimesi on liian lyhyt"}
          
        }   
    
    

    if (!lomaketiedot.current.email && !lomaketiedot.current.puhelinnumero) {

      virheet = {...virheet, email : "vaaditaan joko sähköposti tai puhelinumero", puhelinnumero : "vaaditaan joko sähköposti tai puhelinumero" }
      
    } 

    
    

    if (!lomaketiedot.current.ehdot) {

      virheet = {...virheet, ehdot : "Sinun täytyy hyväksyä käyttöehdot"}
      
    } 

    if (!lomaketiedot.current.ikasarja) {

      virheet = {...virheet, ikasarja : "Valitse ikäsarja"}
      
    } 

    if (Object.entries(virheet).length > 0) {

      setVirheilmoitus({...virheet});
        
    } else {

      setVirheilmoitus({});
      history.push("/Kiitos");
      }   
   
  }
  


  const syoteKasittelija = (e) => {

    let arvo = (e.target.type === "checkbox") ? e.target.checked : e.target.value;

    lomaketiedot.current[e.target.name] = arvo;
   

  }




  return (
    <Container maxWidth="sm">
      
      <Typography variant='h1' style={{ 
                                                fontSize : 40, 
                                                marginTop : 20,
                                                padding : 10,
                                                textAlign : 'center'}}>Ilmoittautumislomake</Typography>

      

      <form onSubmit={lomakeKasittelija}>

      <TextField 
        style={{    marginTop : 20,
                    marginLeft : 30,
                    textAlign : 'left',
                    fontSize  : 20,
                    border : 1,             
                    padding : 10}}
       
        name="nimi"
        variant="outlined"
        label="Nimi"
        fullWidth={true}
        inputRef ={lomakekenttanimi}
        error={Boolean(virheilmoitus.nimi)}
        helperText={virheilmoitus.nimi}
        onChange={ syoteKasittelija }
      />
      <TextField 
        style={{    marginTop : 20,
                    marginLeft : 30,
                    textAlign : 'left',
                    fontSize  : 20,
                    border : 1,             
                    padding : 10}}
        name="sukunimi"
        variant="outlined"
        label="Sukunimi"
        fullWidth={true}
        inputRef ={lomakekenttaSukunimi}
        error={Boolean(virheilmoitus.sukunimi)}
        helperText={virheilmoitus.sukunimi}
        onChange={ syoteKasittelija }
      />
      <TextField 
        style={{    marginTop : 20,
                    marginLeft : 30,
                    textAlign : 'left',
                    fontSize  : 20,
                    border : 1,             
                    padding : 10}}
        name="paikkakunta"
        variant="outlined"
        label="Asuinpaikkakunta"
        fullWidth={true}
        inputRef ={lomakekenttaAsuinpaikka}
        error={Boolean(virheilmoitus.nimi)}
        helperText={virheilmoitus.nimi}
        onChange={ syoteKasittelija }
      />
       <TextField 
        style={{    marginTop : 20,
                    marginLeft : 30,
                    textAlign : 'left',
                    fontSize  : 20,
                    border : 1,             
                    padding : 10}}
        name="puhelinnumero"
        variant="outlined"
        label="puhelinnumero"
        fullWidth={true}
        inputRef ={lomakekenttaPuhelinumero}
        error={Boolean(virheilmoitus.puhelinnumero)}
        helperText={virheilmoitus.puhelinnumero}
        onChange={ syoteKasittelija }
      />

      <TextField 
        style={{    marginTop : 5,
                    marginLeft : 30,
                    textAlign : 'left',
                    fontSize  : 20,
                    border : 1,             
                    padding : 10}}
        name="email"
        variant="outlined"
        label="Sähköposti"
        fullWidth={true}
        inputRef ={lomakekenttaSahkoposti}
        error={Boolean(virheilmoitus.email)}
        helperText={virheilmoitus.email}        
        onChange={ syoteKasittelija }
      />

      <FormControl fullWidth style={{marginTop : 20,
                    marginLeft : 30,
                    textAlign : 'left',
                    fontSize  : 20,
                    border : 1,             
                    padding : 10}}>
       <FormLabel>Valitse ikäsarja johon osallistut</FormLabel>
        <RadioGroup >
          <FormControlLabel
           
            value="alle 15" 
            label="alle 15 vuotiaat"
            control={<Radio 
                        
                        name="ikasarja"  
                        size="small"
                        onChange={ syoteKasittelija } 
                    />} 
          />
          <FormControlLabel 
           
            value="15-19" 
            label="15 - 19 vuotiaat"
            control={<Radio 
                        name="ikasarja"  
                        size="small"
                        onChange={ syoteKasittelija } 
                    />} 
          />
          <FormControlLabel 
            
            value="20-39" 
            label="20 - 39 vuotiaat"
            control={<Radio 
                        name="ikasarja" 
                        size="small"
                        onChange={ syoteKasittelija } 
                    />} 
          />
          <FormControlLabel
        
            value="40-59" 
            label="40 - 59 vuotiaat"
            control={<Radio 
                        name="ikasarja" 
                        size="small"
                        onChange={ syoteKasittelija } 
                    />} 
          />
          <FormControlLabel 
          
            value="60-69" 
            label="60 - 69 vuotiaat"
            control={<Radio 
                        name="ikasarja" 
                        size="small"
                        onChange={ syoteKasittelija } 
                    />} 
          />
          <FormControlLabel 
           
            value="70-79" 
            label="70 - 79 vuotiaat"
            control={<Radio 
                        name="ikasarja" 
                        size="small"
                        onChange={ syoteKasittelija } 
                    />} 
          />
          <FormControlLabel 
         
            value="yli 80" 
            label="yli 80 vuotiaat"
            control={<Radio 
                        name="ikasarja" 
                        size="small"
                        onChange={ syoteKasittelija } 
                    />} 
          />
        </RadioGroup>
        <FormHelperText error={Boolean(virheilmoitus.ikasarja)}>{virheilmoitus.ikasarja}</FormHelperText>      
      </FormControl>

      <FormControl>
        <FormControlLabel 
          control={<Checkbox 
                      name="ehdot" 
                      onChange={ syoteKasittelija }/>}
          label="Hyväksyn käyttöehdot"
        />
        <FormHelperText 
          error={Boolean(virheilmoitus.ehdot)}
        >{virheilmoitus.ehdot}</FormHelperText>
      </FormControl>
      
      <Button 
        
        type="submit"
        variant="contained" 
        color="primary"
        fullWidth={true}
        size="large"
        onClick={lomakeKasittelija}>
        
     
        Ilmoittaudu
      </Button>

      </form>

    </Container>
  );
}

export default Ilmoittaudu;