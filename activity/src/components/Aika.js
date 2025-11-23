import {useRef, useState } from 'react';
import { Button, Container, Stack, TextField } from '@mui/material';
import {DateTimePicker} from '@mui/lab';
import {  useHistory } from 'react-router-dom';


function Aika(props) {

const [lopetusTime, setLopetusTime] = useState(null);
const [aloitusTime, setAloitusTime] = useState(null);

const [syoteAloitus, setSyoteAloitus] = useState();
const [syoteLopetus, setSyoteLopetus] = useState();
const [currentDay,setCurrentDate] = useState(new Date());
const aloitusaika = useRef();
const lopetusaika = useRef();
const laji = useRef();
const lomaketiedot = useRef({});
const history = useHistory();
const [virheilmoitus, setVirheilmoitus] = useState({});

 // lomakkeenkäsittelijä
    const kasitteleLomake = (e) => {
      
     
        e.preventDefault();
       
        let virheet = {};

        if (!lomaketiedot.current.laji) {
    
          virheet = {...virheet, laji : "laji puuttuu"}
          
        } 
        if (!aloitusTime) {
    
          virheet = {...virheet, aloitusaika : "aloitusaika puuttuu"}
          
        } 
        if (!lopetusTime) {
    
          virheet = {...virheet, lopetusaika : "lopetusaika puuttuu"}
          
        } 
        if (syoteAloitus > syoteLopetus ) {
           
          virheet = {...virheet, lopetusaika : "aseta loppumisaika suuremmaksi kuin aloitusaika"}
         
        } 

        if (Object.entries(virheet).length > 0) {
    
            setVirheilmoitus({...virheet});
            console.log(virheet);


          } else {

            setVirheilmoitus({});
            aikaKasittelija();
          }
    
        }
       
   
   // syötteidenkäsittelijät
  const syoteKasittelija = (e) => {
    
    let arvo = (e.target.type === "checkbox") ? e.target.checked : e.target.value;
    
    lomaketiedot.current[e.target.name] = arvo;
      }
   const aloitusKasittelija = (e) => {
       setSyoteAloitus(e);
   }   
   const lopetusKasittelija = (e) => {
    setSyoteLopetus(e);
}   

      // AIKAKÄSITTELIJÄ
      const aikaKasittelija = () => {
        
         tunnit(parseInt((lopetusTime-aloitusTime)/3600000));
          let apu = parseInt((lopetusTime-aloitusTime)/3600000);
          minuutit(parseInt((((lopetusTime-aloitusTime)/3600000)-apu)*60));
          
          let uusiTehtavaApu = {
            laji : laji.current.value,
            alku: aloitusaika.current.value,
            loppu:lopetusaika.current.value
            
          };
     
          props.setAktiviteetit([...props.aktiviteetit, uusiTehtavaApu]);
          history.push("/");
        

      }
      // Harjoitus määrien laskeminen ja siirto App näkymään
      const minuutit = (min) => {

          let apu = Number(min);
          props.setKaikkiminuutit(props.kaikkiminuutit+apu);  
    
      }
      
      const tunnit = (kesto) => {

          let apu = Number(kesto);
          props.setKaikkitunnit(props.kaikkitunnit+apu);
      
      }    
 
    
 return (
 <form onSubmit={kasitteleLomake}>
<Container>

<Stack>
<TextField 
            name='laji'
            variant="outlined"
            label='Laji'
            fullWidth={true}
            inputRef={laji}
            error={Boolean(virheilmoitus.laji)}
            helperText={virheilmoitus.laji}
            onChange={syoteKasittelija}
            style={{marginBottom : 10}}
        />



     <DateTimePicker 
           maxDate={currentDay}
           maxDateTime={currentDay}
           ampm = {false}
           name='aloitusaika'  
           label='Aloitusaika'
           disableMaskedInput={true}
           inputRef={aloitusaika}         
           value={aloitusTime}
           
           onChange={(newValue) =>{ 
            setAloitusTime(newValue)    
            aloitusKasittelija(newValue);
        }}
           renderInput={(params) => <TextField {...params}
           style={{margin : 10}}
           error={Boolean(virheilmoitus.aloitusaika)}
           helperText={virheilmoitus.aloitusaika}
         
           
           />}
            
         />
         
  
    <DateTimePicker 
           maxDate={currentDay}
          maxDateTime={currentDay}
           ampm = {false}
           name='lopetusaika'
           label='Lopetusaika'
           disableMaskedInput={true}
           inputRef={lopetusaika}         
           value={lopetusTime}
           onChange={(newValue) =>{ 
                setLopetusTime(newValue)
                lopetusKasittelija(newValue);
                 }}

           renderInput={(params) => <TextField {...params}
                   style={{margin : 10}}
                   error={Boolean(virheilmoitus.lopetusaika)}
                   helperText={virheilmoitus.lopetusaika}
                 
                   
                   />}
  
         />
         
    </Stack>
    <Button 
        style={{ marginTop : 10}}
        type="submit"
        variant="contained" 
        color="primary"
        fullWidth={true}
        size="large"
        onClick={kasitteleLomake}>
        
     
        Lisää aktiviteetti
      </Button>
     
    </Container>
    </form>
 )
}
export default Aika;