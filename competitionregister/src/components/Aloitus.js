import { Container, Typography } from '@mui/material';
import Kisa from '../kuvat/Kisa.jpg';



function Aloitus() {



    return (
        <Container maxWidth="sm">
            <img src={Kisa} alt = 'kisakuva'style={{ 
                            margin : 55
                            }} />

            <Typography variant='h1' style={{ 
                                                fontSize : 40, 
                                                marginTop : 20,
                                                textAlign : 'center'}}>
                                                
               <p>Tervetuloa pilkkimään 14.5.2022 klo 8.00 - 20.00 Tampereen Näsijärvelle!</p> 
                
            </Typography>
        
            <Typography style={{ marginTop : 20,
                                 justify : 'center'}} >

            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries,
            but also the leap into electronic typesetting, remaining essentially
            unchanged. It was popularised in the 1960s with the release of Letraset 
            sheets containing Lorem Ipsum passages, and more recently with desktop  publishing
            software like Aldus PageMaker including versions of Lorem Ipsum.

            </Typography>

           
                 
            
            </Container>
    )
}

export default Aloitus