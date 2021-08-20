import React,{useContext, useState} from "react"
import {Container, Form, Button} from 'react-bootstrap';
import firebase from "../Config/firebase"
import FormGroup from "../Components/Forms/FormGroup";
import ButtonWithLoading from "../Components/Forms/ButtonWithLoading";
import AlertCustom from "../Components/Forms/AlertCustom";
import EcommerceContext from "../Context/EcommerceContext";
import {Link} from "react-router-dom"

function Login (){
    const context = useContext(EcommerceContext)
    const [form, setForm] = useState({email:"",contraseña:""})
    const [loading, setLoading] = useState(false);
    const [alert,setAlert] =useState({variant:"",text:""})

    const handleSubmit = async (event)=>{
        console.log("handleSubmit", form)
        setLoading(true)
        event.preventDefault()
        try{
           const responseUser = await firebase.autenticacion.signInWithEmailAndPassword(form.email,form.contraseña)
           console.log(responseUser)
           setLoading(false)
             console.log("uid",responseUser.user.uid)
             const userInfo = await firebase.db.collection("usuarios")
            .where("userId","==",responseUser.user.uid)
            .get()
            console.log("usuario",userInfo.docs[0]?.data())
            context.loginUser(userInfo.docs[0]?.data())
           setAlert({variant:"success",text:"Bienvenida/o"})
        }catch(e){
            setLoading(false)
            console.log("Error",e)
            setAlert({variant:"danger",text:e.message})
            if(e.code==="auth/weak-password"){
                setAlert({variant:"danger",text:"La contraseña es incorrecta"})
            }
        }
    }
    const handleChange = (event)=>{
        const name= event.target.name
        const value = event.target.value
        console.log("handleChange",name,value)
        setForm({...form,[name]:value})
    }
    const onClick = ()=>{
        context.logoutUser(true)
    }
     return(
     <Container>
        <div>
            <h1>Acceder</h1>
        </div>
        <Form onSubmit={handleSubmit}>

        <FormGroup label="Correo Electronico" name="email" type="email" placeholder="Ingrese su correo electronico" value={form.email} change={handleChange} />
        <FormGroup label="Contraseña" name="contraseña" type="password" placeholder="Ingrese su contraseña" value={form.contraseña} change={handleChange} />
         <br></br>       
        <ButtonWithLoading loading={loading} type="submit" variant="secondary" >Ingresar</ButtonWithLoading>
        <Link to="/"><Button onClick={onClick} variant="dark" size="lg">Salir</Button></Link>
        <AlertCustom variant={alert.variant} text={alert.text}/>
        </Form>
    </Container>
     )   
}
export default Login