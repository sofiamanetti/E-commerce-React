import React from "react"
import './App.css';
import Inicio from "./Pages/Inicio"
import {BrowserRouter, Route} from "react-router-dom"
import DetalleProductos from './Pages/DetalleProductos';
import Menu from "./Components/Menu"
import Registro from "./Pages/Registro"
import Login from "./Pages/Login"
import ABMPage from "./Pages/ABMPage"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from "react-bootstrap"
import GlobalState from "./Context/GlobalState";
function App() {
  return (
    <GlobalState>
    <div className="App">
      <BrowserRouter>
      <Menu/>
      <br></br>
      <Container>
      <Route path="/" exact component={Inicio}/>
      <Route path="/alta" exact component={Registro}/>
      <Route path="/login" exact component={()=><Login />}/>
      <Route path="/producto/:id" exact component={DetalleProductos} />
      <Route path="/catalogo" exact component={ABMPage} />
      </Container>
      </BrowserRouter>
    </div>
    </GlobalState>
  );
}

export default App;
