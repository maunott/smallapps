
/*https://mui.com/material-ui/react-select/*/
import * as React from 'react';
import Button  from '@mui/material/Button';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState,useEffect } from 'react';
import Slider from '@mui/material/Slider';
import TextField  from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';

import DialogContent from '@mui/material/DialogContent';

import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
  function App() {
  const [nimi,SetNimi] = useState();
  const [saapuminen,SetSaapuminen] = useState();
  const [mokki, setMokki] = useState('');
  const [siivous, setSiivous] = useState(false);
  const [paivat, setPaivat] = useState(1);
  const [summa, setSummat] = useState(0);
  const [apusiivous,setApusiivous] = useState(0);
  const [open, setOpen] = useState(false);
  useEffect (() => {
     if (siivous === true){
       setApusiivous(100);
     }
     else{
       setApusiivous(0);
     }
     
   }, [siivous]);

  useEffect (()=>{
    if (mokki || paivat || apusiivous){
      setSummat(mokki*paivat+apusiivous);
    }
  }, [mokki, paivat, apusiivous]);

  const handleChange = (event) => {
    setMokki(event.target.value);
  }
   
  const lisaaVuorokausi = (event) => {
    setPaivat(event.target.value);
  }
  /*Dialogi*/ 
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="sm">
    <h1>Mökin varaus</h1>
    <h2>Asiakastiedot</h2>
      <TextField 
        variant="outlined"
        label="Nimi"
        placeholder="Etunimi Sukunimi"
        fullWidth={true}
        onChange={ (e) => { SetNimi(e.target.value) } }
      />
    <h2>Saapumispäivänmäärä</h2>
      <TextField 
        variant="outlined"
        label="Pvm"
        placeholder="Päivänmäärä"
        fullWidth={true}
        onChange={ (e) => { SetSaapuminen(e.target.value) } }
      />
    <h2>Haluamasi mökki</h2>
      <FormControl fullWidth>
      <InputLabel 
        id="demo-simple-select-label">Mökki
      </InputLabel>
      <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={mokki}
          label="Mokki"
          onChange={handleChange}
      >
          <MenuItem value={100}>Mökki1 100e</MenuItem>
          <MenuItem value={20}>Mökki2 20e</MenuItem>
          <MenuItem value={30}>Mökki3 30e</MenuItem>
          <MenuItem value={40}>Mökki4 40e</MenuItem>
      </Select>
      </FormControl>
    <h2>Valitse vuorokaudet</h2>
      <Slider
      aria-label="Small steps"
      defaultValue={1}
      step={1}
      marks
      min={1}
      max={14}
      valueLabelDisplay="on"
      onChange={lisaaVuorokausi}
      />
    <h2>Siivous</h2>
    <FormGroup>
    <FormControlLabel 
      control={<Checkbox onChange={(e) => setSiivous(e.target.checked)}/>} 
      label="Siivous" />
    </FormGroup>
   
    <h5>Hinta: {summa}</h5>
    <Button 
      variant="contained" 
      color="primary"
      fullWidth={true}
      size="large"
      onClick={handleClickOpen}
    > Varaa mökki
     
    </Button>
    <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogContent dividers>
          <Typography gutterBottom>Varaustiedot</Typography>
          <Typography gutterBottom>Nimi:{nimi}</Typography>
          <Typography gutterBottom>Saapumispäivä:{saapuminen}</Typography>
          <Typography gutterBottom>Hinta:{summa}</Typography>
        </DialogContent>
      </BootstrapDialog>
    </Container>
  );
}
export default App; 