import React,{useState, useEffect} from "react"
import Productos from "./Productos"
import firebase from "../Config/firebase"
import Spinner from 'react-bootstrap/Spinner'


function Inicio (){
    const [loading, setLoading] = useState(true)
    const [productos, setProductos] = useState([])
    const getProductos = async ()=>{
        try{
            setLoading(true)
            const querySnapshot = await firebase.db.collection("productos")
            .get()
            setProductos(querySnapshot.docs)
            setLoading(false);
            
       }catch(e){
           console.log("error",e)
       }
    }
    useEffect( 
        ()=>{
           getProductos()
        },
        []
    )
    if(loading){
        return(
            <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
    
    }else{
    return(
        <div>
            <h1>Productos</h1>
            {productos.map(producto=><Productos key={producto.id} datos={{...producto.data(),id:producto.id}} />)}
            
        </div>
        
    )
    }
}



export default Inicio;

