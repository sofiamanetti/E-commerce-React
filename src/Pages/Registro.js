import React,{useState}from "react"
import firebase from "../Config/firebase"
import {Container, Button, Form} from 'react-bootstrap';
import ButtonWithLoading from "../Components/Forms/ButtonWithLoading";
import FormGroup from "../Components/Forms/FormGroup";
import AlertCustom from "../Components/Forms/AlertCustom";
//import {useForm} from "react-hook-form"

function Registro (){
    const [form, setForm] = useState({nombre:"",apellido:"",email:"",usuario:"",contraseña:""})
    const [loading, setLoading] = useState(false);
    const [alert,setAlert] =useState({variant:"",text:""})

   // const {register,handleSubmit, formState:{errors}} = useForm()

    const handleSubmit = async (event)=>{
        setLoading(true)
        console.log("handleSubmit", form)
        event.preventDefault()
        try{
            const responseUser = await firebase.autenticacion.createUserWithEmailAndPassword(form.email,form.contraseña)
            console.log("User", responseUser)
            const document = await firebase.db.collection("usuarios")
            .add({
                nombre:form.nombre,
                apellido:form.apellido,
                userId:responseUser.user.uid
            })
            setLoading(false)
            setAlert({variant:"success",text:"Se ha registrado correctamente"})
        }catch(e){
            setLoading(false)
            console.log("Error",e)
            setAlert({variant:"danger",text:e.message})
            if(e.code=="auth/weak-password"){
                setAlert({variant:"danger",text:"La contraseña debe tener al menos 6 caracteres"})
            }
        }
        
        
    }
    const handleChange = (event)=>{
        const name= event.target.name
        const value = event.target.value
        console.log("handleChange",name,value)
        setForm({...form,[name]:value})
    }
    return(
    <div>
        <h1>Registrate</h1>        
        <form onSubmit={handleSubmit}>    
        <h2>Completa los siguienes datos y crea tu usuario</h2>


        <FormGroup label="Nombre" name="nombre" type="text" placeholder="Ingrese su nombre" value={form.nombre} change={handleChange}/>
        <FormGroup label="Apellido" name="apellido" type="text" placeholder="Ingrese su apellido" value={form.apellido} change={handleChange}/>
        <FormGroup label="Correo Electronico" name="email" type="email" placeholder="Ingrese su correo electronico" value={form.email} change={handleChange} />
        <FormGroup label="Usuario" name="usuario" type="text" placeholder="Ingrese su usuario" value={form.usuario} change={handleChange}/>
        <FormGroup label="Contraseña" name="contraseña" type="password" placeholder="Ingrese su contraseña" value={form.contraseña} change={handleChange} />
        <br></br>
        <ButtonWithLoading loading={loading} variant="secondary" type="submit">Registrarse</ButtonWithLoading>

        <AlertCustom variant={alert.variant} text={alert.text}/>
        </form>
    </div>
    )
}
export default Registro;