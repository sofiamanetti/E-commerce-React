import React,{useContext, useState} from "react"
import {Link} from "react-router-dom"
import "./Menu.css"
import {Container, Nav, NavDropdown, Dropdown, Button} from 'react-bootstrap';
import EcommerceContext from "../Context/EcommerceContext";
import Navbar from 'react-bootstrap/Navbar'
import DropdownItem from "react-bootstrap/esm/DropdownItem";
function Menu(){
   const context = useContext(EcommerceContext)
   const onClick = ()=>{
      context.logoutUser(true)
  }
    return(
       <EcommerceContext.Consumer>
         { context => 
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
            <Navbar.Brand as={Link} to="/">HighTech</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
              <Nav.Link as={Link} to="/" className="link" >Inicio</Nav.Link>   
             {
               context.userLogin &&
                <>
                  <Nav.Link as={Link} to="/catalogo">Catalogo</Nav.Link> 
                </>
             }
             {
                !context.userLogin &&
                <>
                   <Nav.Link as={Link} to="/alta">Registro</Nav.Link>
                   <Nav.Link as={Link} to="/login">Login</Nav.Link>
                </>
             }
            {
               context.userInfo &&
               <>
               <Nav>
                <Dropdown className="hola" >
                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm" className="user">
                  Hola {context.userInfo.nombre}!
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Link to="/"><Dropdown.Item onClick={onClick} variant="secondary" >Salir</Dropdown.Item></Link>
                </Dropdown.Menu>
                </Dropdown>
               </Nav>
               </>
            }

              </Nav>
            </Navbar.Collapse>
            </Container>
          </Navbar>
        
        }
        </EcommerceContext.Consumer>
    )
}
export default Menu 