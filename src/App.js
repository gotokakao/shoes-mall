import React, {useState} from "react";
import logo from './logo.svg';
import './App.css';
import { Button,Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import shoesData from "./Data.js";
import {Link, Route, Switch} from "react-router-dom";
import Detail from "./Detail";
import axios from "axios";


function App() {

  const [shoes, shoesFunc] = useState(shoesData);
  const [shoesIndex, shoesIndexFunc] = useState(0)
  const [stock, stockChange] = useState([10,10,10]);

  /*
  const addShoesList= (data) => {
    let newArr = [...shoes];
    const arr = newArr.concat(data);
    shoesFunc(arr)
  }
  */

  return (
    <div className="App">
       <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link> <Link className="navLink" to="/">Home</Link></Nav.Link>
              <Nav.Link> <Link className="navLink"  to="/detail">Detail</Link></Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>


      <Switch>

        <Route exact path="/">
          <div className="background">
            <h1>20% Season Off</h1>
            <p>This is all your shoes loose come on and get somes!!</p>
          </div>

          <div className="container">
          <div className="row">
            {
              shoes.map((shoe, i)=>{
                return(
                  <ShoesList shoeData={shoes[i]} i={i} key={i}></ShoesList>
                )
              })
            }
          </div>

          

        </div>

        <button className="btn btn-primary" onClick={ ()=>{
          axios.get("https://codingapple1.github.io/shop/data2.json").
          then((result)=>{
            shoesFunc([...shoes, ...result.data]);
          }).
          catch(()=>{

          })
          
          

          //addShoesList(result);
          /*
          axios.get("https://codingapple1.github.io/shop/data2.json")
          .then((result)=>{
            console.log(result.data)
          })
          .catch();
          */
        } }>more</button>

        </Route>

        <Route path="/detail/:id">
            <Detail shoes={shoes} stock={stock} stockChange={stockChange}></Detail>
        </Route>

      </Switch>

      
    </div>
    
  );
}

function ShoesList(props){
  return(
    <div className="col-md-4">
      <img src={"https://codingapple1.github.io/shop/shoes"+ (props.i + 1) +".jpg"} width="100%"></img>
      <h4>{props.shoeData.title}</h4>
      <p>{props.shoeData.content}</p>
      <p>{props.shoeData.price}</p>
  </div>
  );
}

export default App;
