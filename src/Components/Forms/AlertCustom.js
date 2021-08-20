import React from "react"
//import Button from 'react-bootstrap/Button'
import {Alert} from 'react-bootstrap'
const styles={
    alert:{
        marginTop:"10px"
    }
}
function AlertCustom(props){
    const {variant,text} = props    
    return(
        /* */
        <Alert  variant={variant} style={styles.alert} >
            {text}
        </Alert>
    )
    
}
export default AlertCustom;
