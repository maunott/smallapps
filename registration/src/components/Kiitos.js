import { Button, Container, Typography, List, ListItem, ListItemText} from '@mui/material';
import { Link } from 'react-router-dom';
function Kiitos(props) {
      

    
  
    
    return (
       
        <Container >

            <Typography variant='h1' style={{ 
                                                fontSize : 40, 
                                                marginTop : 20,
                                                textAlign : 'center'}}>
               
            </Typography>

            <Typography variant="h1" style={{ marginTop : 20,
                               
                                 textAlign : 'center',
                                 fontSize  : 20,
                                 border : 1,             
                                 padding : 10}} >
             Kiitos ilmoittautumisesta, nähdään pilkillä!
                
            </Typography>
            <List 
            
           >
             <ListItem >
                        <ListItemText primary='nimi' />
                        <ListItemText primary='sukunimi' />
                        <ListItemText primary='asuinpaikka' />
                        <ListItemText primary='puhelinnumero' />
                        <ListItemText primary= 'sähköposti' />
                        <ListItemText primary='ikasarja'/>
            </ListItem>
        { props.tiedot.map( (tieto, idx) => {
  
          return (
                    
                  <ListItem 
                    key={idx}>
                    
                     <ListItemText  primary={tieto.nimi }/>
                     <ListItemText primary={tieto.sukunimi} />
                     <ListItemText primary={tieto.asuinpaikka} />
                     <ListItemText primary={tieto.puhelinnumero} />
                     <ListItemText primary={tieto.sahkoposti} />
                     <ListItemText  primary={tieto.ikasarja} />
                  </ListItem>
                );
  
        } ) }
  
        </List>
        <Button 
        
        component={Link}
        to="/"
        variant="contained" 
        color="primary"
        fullWidth={true}
        size="large">
       
        
     
        Palaa etusivulle
      </Button>

        </Container>
           
    )
}

export default Kiitos;