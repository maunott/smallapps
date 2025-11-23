import {  Container, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function Saannot() {

  
    
    return (
       
        <Container>

            <Typography variant='h1' style={{ 
                                                fontSize : 40, 
                                                marginTop : 20,
                                                textAlign : 'center'}}>
               Pilkkikilpailun säännöt
            </Typography>

            <Typography variant= 'h6' style={{ marginTop : 20,
                                marginLeft : 30,
                                 textAlign : 'left',
                                 fontSize  : 20,
                                 border : 1,             
                                 padding : 10}} >
            
                <List>
            <ListItem><ListItemText>1.Kilpailualue on Näsijärvi lukuun ottamatta pohjoisosan, rannassa olevin kyltein merkittyä rauhoitusaluetta.</ListItemText></ListItem>
            <ListItem><ListItemText>2.Kilpailu alkaa klo 9:00. Onget on nostettava järvestä klo 19:00. Kalojen punnitus päättyy 19:30. </ListItemText></ListItem>
            <ListItem><ListItemText>3.Jos useammalla kilpailijalla saaliin kokonaispaino on sama, suurimman kalan saanut voittaa. Jos se on vielä sama, kalamäärä ratkaisee. </ListItemText></ListItem> 
            <ListItem><ListItemText>4.Jäällä liikutaan jalkaisin. </ListItemText></ListItem>
            <ListItem><ListItemText>5.Yksi onki järvessä / kilpailija. </ListItemText></ListItem>
            <ListItem><ListItemText>6.Kilpailijat saavat käyttää yhteistä kairaa. Moottorikairan käyttö on kielletty.</ListItemText></ListItem>
            <ListItem><ListItemText>7.Kilpailijalla käytössä vain yksi pilkkimisreikä kerrallaan. Reikää ei voi varata. </ListItemText></ListItem>
            <ListItem><ListItemText>8.Kilpailija huolehtii ettei roskaa jääaluetta.</ListItemText></ListItem>
            <ListItem><ListItemText>9.Kilpailija osallistuu tapahtumaan omalla vastuullaan.</ListItemText></ListItem>
            <ListItem><ListItemText>10.Kilpailua koskevat vastalauseet tulee jättää kilpailun järjestäjällä välittömästi punnituksen jälkeen.</ListItemText></ListItem>
            <ListItem><ListItemText>11.Sääntöjen rikkominen aiheuttaa hylkäämisen.</ListItemText></ListItem>
            </List>
            </Typography>

            </Container>
           
    )
}

export default Saannot;