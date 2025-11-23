
import { useState } from "react";
import black from '../kuvat/black.jpg';
import blue from '../kuvat/blue.jpg';
import yellow from '../kuvat/yellow.jpg';
import red from '../kuvat/red.jpg';
import green from '../kuvat/green.jpg';
import gray from '../kuvat/gray.jpg';

function Tuotenostot(props) {

    const [tuotteet,setTuotteet] = useState([{  
       kuva:black, tuotenimi: "black", hinta:10}
       ,{
        kuva:blue, tuotenimi: "blue", hinta:20
       }
       ,{
        kuva:yellow, tuotenimi: "yellow", hinta:30
       }
       ,{
        kuva:red, tuotenimi: "red", hinta:40
       }
       ,{
        kuva:green, tuotenimi: "green", hinta:50
       }
       ,{
        kuva:gray, tuotenimi: "gray", hinta:60
       }
      ]);
         

         
    return (
        <div className='tuotenostot'>
            
           
        <ul>
           {tuotteet.map((tuote,idx) =>
             <li key={idx}><img src={tuote.kuva}  alt={tuote.tuotenimi}></img>
                                    {tuote.tuotenimi} {tuote.hinta} <button onClick={()=>props.hinta(tuote.hinta)}>Lisää tuote</button> 
                                   
                                                
              </li>     
               
        ) }</ul>
             
           
        </div> 
    );

}


export default Tuotenostot;