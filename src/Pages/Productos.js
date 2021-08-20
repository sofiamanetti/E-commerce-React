import React from "react"
import {Link} from "react-router-dom"
import {Button, Image, Card} from "react-bootstrap";
import '../Pages/Productos.css'
import EcommerceContext from "../Context/EcommerceContext";
import File from "../Components/File";



function Productos(props){
    const {datos} = props
    console.log(datos)
    const {name, price, photo_url, id, description, sku} = datos
    const verDetalle =(props.verDetalle!==false?true:false)
    const modificar =(props.modificar===true?true:false)
    const eliminar =(props.eliminar===true?true:false)
    return(
<EcommerceContext.Consumer>
  {
    context =>
<div>
 <Card className="text-center">
  <Card.Body>
    <Card.Title>{name}</Card.Title>
    <Card.Text>
      {description}
    </Card.Text>
    <Card.Text>
     <spam>
         Precio:
     <br></br>
     <b>{price}</b>
     </spam>
    </Card.Text>
    <Card.Text>Sku: {sku}</Card.Text>
    <File></File>
    <Card.Img src={photo_url} ></Card.Img>
    <br></br>
    {
      verDetalle && context.userLogin &&
      <Link to={"/producto/"+id}><Button variant="secondary" className="btn">Ver detalle</Button></Link>
    }
    {
      modificar &&
      <a href="#top"><Button variant="secondary" className="btn" onClick={(e)=>props.clickModificar(datos)}>Modificar</Button></a>
    }
    {
      eliminar &&
      <Button variant="secondary" className="btn" onClick={(e)=>props.clickEliminar(datos)}>Eliminar</Button>
    }
  </Card.Body>

</Card>
</div>
}
</EcommerceContext.Consumer>
)
}
export default Productos
//style={{ width: "50%" }}