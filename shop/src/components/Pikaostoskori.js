

function Pikaostoskori (props) {
    
    return(
       
                 
            (props.children[3]>0 && props.children[1] >0  )
            ?  <h4>Ostoskorissa on {(props.children[3])} tuotetta, loppusumma {(props.children[1])} e <button onClick={() =>{ alert('Jatkaa tilaukseen...')}}>Tilaa tuotteet</button></h4>   
            :  <h2>Ostoskorissa ei ole tuotteita </h2>  
            );
}
export default Pikaostoskori;