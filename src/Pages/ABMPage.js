import React,{useState, useEffect} from "react"
import Productos from "./Productos"
import firebase from "../Config/firebase"
import FormGroup from "../Components/Forms/FormGroup"
import ButtonWithLoading from "../Components/Forms/ButtonWithLoading"
import AlertCustom from "../Components/Forms/AlertCustom"
import FileUpload from "../Components/FileUpload";



function ABMPage (){
    const [loading, setLoading] = useState(true)
    const [productoForm,setProductoForm] = useState({id:null, name:"",price:"",description:"",sku:"",photo_url:"",})
    const [productos,setProductos] = useState([])
    const [reload,setReload] = useState(false);
    const [loadingB, setLoadingB] = useState(false);
    const [alert,setAlert] =useState({variant:"",text:""});

    const handleSubmit = async (event)=>{
        event.preventDefault()
        setLoadingB(true)
        // el preventDefault evita que recargue la pag el momendo del Submit. La naturaleza de ese evento
        //es recargar.
        try{
            let document= null
            if(productoForm.id===null){
                 document = await firebase.db.collection("productos")
                .add(productoForm)
                // con add() agregamos un doc
            }else{
                 document = await firebase.db.doc("productos/"+productoForm.id)
                .set(productoForm) 
                //con set() modificamos un documento. especificando el doc y el id.
            }
            console.log("Document", document)
            setAlert({variant:"success",text:"Producto guardado"})
            setReload(true)
            setLoadingB(false)
        }catch(e){
            setLoadingB(false)
            console.log("error",e)
            setAlert({variant:"danger",text:e.message})
        }
       
    }
    const getProductos = async ()=>{
        try{
            setLoading(true)
            const querySnapshot = await firebase.db.collection("productos")
            .get()
            //con get() consultamos todos los documentos de una colección
            setProductos(querySnapshot.docs)

            setLoading(false);
            setReload(false);
            
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
    useEffect( 
        ()=>{
            if(reload)
            getProductos()
        },
        [reload]
    )
    const handleChange = (event)=>{
        const name= event.target.name
        const value = event.target.value
        console.log("handleChange",name,value)
        setProductoForm({...productoForm,[name]:value})
    }
    const handleClickModificar = (producto)=>{
         console.log(producto)
         setProductoForm(producto)
    }
    const handleClickEliminar = async (producto)=>{
        try{
            const document = await firebase.db.doc("productos/"+producto.id)
            .delete()
            // con delete() eliminamos un doc especificando el doc, la coleccion y el id.
            setReload(true)
            console.log(document)
       }catch(e){
           console.log("error",e)
       }
        
   }

    if(loading){
        return(
            <div>
                loading...
            </div>
        )
    
    }else{
    return(
        <div>
            <a name="top"></a>
            <h2>Alta de productos</h2>
            <form onSubmit={handleSubmit}>
            <FormGroup label="Nombre" name="name" type="text" placeholder="Ingrese el nombre" value={productoForm.name} change={handleChange}/>
            <FormGroup label="Precio" name="price" placeholder="Ingrese el precio" value={productoForm.price} change={handleChange} />
            <FormGroup label="Sku" name="sku" placeholder="Ingrese el sku" value={productoForm.sku} change={handleChange} />
            <FormGroup label="Descripcion" name="description" as="textarea" placeholder="Ingrese la descripcion" value={productoForm.description} change={handleChange}
            rows="6" cols="100"/>
            <FileUpload></FileUpload>
            <br></br>
            <ButtonWithLoading loading={loadingB} variant="secondary" type="submit">Guardar</ButtonWithLoading> 
            <AlertCustom variant={alert.variant} text={alert.text}/>

            <h1>Listado de productos</h1>

            {productos.map(producto=><Productos key={producto.id} datos={{...producto.data(),id:producto.id}} modificar={true} 
            clickModificar={handleClickModificar} eliminar={true} clickEliminar={handleClickEliminar}/>)}

            </form>
            
        </div>
        
    )
    }
}


export default ABMPage;


