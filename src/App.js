import React, {useContext, useState} from "react";
import logo from './logo.svg';
import './App.css';
import { Button,Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import shoesData from "./Data.js";
import {Link, Route, Switch} from "react-router-dom";
import Detail from "./Detail";
import axios from "axios";
import Cart from "./Cart.js";


export const stockContext = React.createContext();


function App() {

  const [shoes, shoesFunc] = useState(shoesData);
  const [shoesIndex, shoesIndexFunc] = useState(0)
  const [stock, stockChange] = useState([10,11,12]);
  

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
          <Navbar.Brand href="#home">Shoes Store</Navbar.Brand>
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
          <stockContext.Provider value={stock}>
            <div className="row">
              {
                shoes.map((shoe, i)=>{
                  return(
                    <a href={`detail/${i}`}>
                      <ShoesList shoeData={shoes[i]} i={i} key={i}></ShoesList>
                    </a>
                  )
                })
              }
            </div>
          </stockContext.Provider>

        
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
            <stockContext.Provider value={stock}>
              <Detail shoes={shoes} stock={stock} stockChange={stockChange}></Detail>
            </stockContext.Provider>
        </Route>

        <Route path="/cart">
          <Cart></Cart>
        </Route>

      </Switch>


    </div>
    
  );
}



function ShoesList(props){

  const stock = useContext(stockContext);
  return(
    <div className="col-md-4">
      <img src={"https://codingapple1.github.io/shop/shoes"+ (props.i + 1) +".jpg"} width="100%"></img>
      <h4>{props.shoeData.title}</h4>
      <p>{props.shoeData.content}</p>
      <p>{props.shoeData.price}</p>
      <Test i={props.i}></Test>
  </div>
  );
}

function Test(props){
  const stock = useContext(stockContext);
  return <p>재고 : {stock[props.i]}</p>
}

export default App;
