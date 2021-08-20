import React, {useState, useEffect}from "react"
import {Button} from 'react-bootstrap';
import firebase from "../Config/firebase"
import Card from 'react-bootstrap/Card'

function DetalleProductos(props){
    const id = props.match.params.id
    const [loading, setLoading] = useState(true);
    const [producto, setProducto] = useState({});
    const [mensaje, setMensaje] = useState("")
    useEffect(
        ()=>{
            async function request(){
                try{
                    const document = await firebase.db.doc("productos/"+id)
                    .get()
                    setLoading(false);
                    setProducto(document.data());
                }catch(e){

                }
            }
            request();
            },
            []
        )
        if(loading){
                return(
                    <div>
                        Loading...
                    </div>
                )
        }else{
                return(
                    <div> 
                        <h2>Computadoras</h2>
                        <Card style={{ width: '18rem' }}>
                          <Card.Img variant="top" src="holder.js/100px180" />
                          <Card.Body>
                            <Card.Title>{producto.name}</Card.Title>
                            <Card.Text>
                             <h6> Descripcion:</h6>
                            {producto.description}
                            <h6><b>Precio:</b></h6>
                            {producto.price}
                            </Card.Text>
                            <Button variant="secondary" onClick={()=>setMensaje("Gracias por su compra!")}>Comprar</Button>
                            <br></br>
                            {mensaje}
                          </Card.Body>
                        </Card>
                    </div>
                )
            }
        
        }

export default DetalleProductos
