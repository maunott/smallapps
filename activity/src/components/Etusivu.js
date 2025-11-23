import { Button, Container,Typography }from '@mui/material/';
import styled from '@emotion/styled';
import { List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';


const MyButton = styled(Button)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  });

 function Etusivu(props) {

     return (
        <Container>
       <Typography> {'Tunnit:'+props.kaikkitunnit}</Typography>
        <Typography>{'Minuutit:'+props.kaikkiminuutit}</Typography>
            <Typography >
             Kaikki aktiviteetit 
            </Typography>
       
            
            <List>

{ props.aktiviteetit.map( (aktiviteetti, idx) => {
   
  return (
          <ListItem key={idx}>
              <ListItemText primary={aktiviteetti.laji} />
              <ListItemText primary={aktiviteetti.alku} />
              <ListItemText primary={aktiviteetti.loppu} />
          </ListItem>

        );
        
} ) }

</List>

<MyButton
            component={Link}
            to="/Aika"
            variant="contained" 
            color="primary"
            fullWidth={true}
            size="large">
            Lisää aktiviteetti</MyButton>

            
            
        </Container>
    )
}

export default Etusivu;