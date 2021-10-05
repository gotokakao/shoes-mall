import React, { useContext, useEffect, useState } from "react";
import {useHistory, useParams} from "react-router-dom";
import styled from "styled-components";
import "./Detail.scss";
import {stockContext} from "./App.js";
import { CSSTransition } from "react-transition-group";
import {Nav,} from 'react-bootstrap';

let box = styled.div`
    padding-top : 30px;
`;

let ulala = styled.h4`
    font-size : 25px;
    color : ${ props => props.colour}
`;

function Detail(props){

    const stock = useContext(stockContext);

    const [alert, alertChange] = useState(true);
    const [inputData, inputDataChange] = useState("");
    let [tab, tabChange] = useState(0);
    let [tabSwitch, tabSwitchChange] = useState(false);


    useEffect(()=>{
        const timer = setTimeout(() => {
            alertChange(false);
        }, 2000);
        return () => { clearTimeout(timer) }
    }, [alert]);

    

    let {id} = useParams();
    const history = useHistory();
    let findShoes = props.shoes.find(function(product){
        return product.id == id;
    });



    return(
        <div className="container">
            <box>
                <ulala className="red">Detail</ulala>
            </box>

            <input onChange={ (e)=>{inputDataChange(e.target.value)} }/>

            {
                alert === true ? 
            <div className="my-alert2">
                <p>재고가 얼마남지 않았습니다</p>
            </div>
            : null
            }


            <div className="row">
                <div className="col-md-6">
                    <img src={"https://codingapple1.github.io/shop/shoes"+(parseInt(findShoes.id)+1)+".jpg"} width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{findShoes.title}</h4>
                    <p>{findShoes.content}</p>
                    <p>{findShoes.price}</p>
                    <Stock stock={stock} id={id}></Stock>
                    
                    <button className="btn btn-danger" onClick={()=>{
                        let newStock = [...props.stock];
                        console.log(newStock[id]);
                        newStock[id] = newStock[id] -1;
                        props.stockChange(newStock)
                    }}>주문하기</button> 
                    <button onClick={ ()=>{
                        history.goBack();
                    }} className="btn btn-danger">뒤로가기</button> 
                </div>
            </div>

            <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
                <Nav.Item>
                <Nav.Link eventKey="link-0" onClick={ ()=>{tabSwitchChange(false); tabChange(0)} }>상품설명</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link eventKey="link-1" onClick={ ()=>{tabSwitchChange(false); tabChange(1)} }>배송정보</Nav.Link>
                </Nav.Item>
            </Nav>

            <CSSTransition in={tabSwitch} classNames="wow" timeout={500}>
                <TabContent tab={tab} tabSwitchChange={tabSwitchChange}></TabContent>
            </CSSTransition>
        </div> 
    )

}

function TabContent(props){

    useEffect(()=>{
        props.tabSwitchChange(true);
    });

    const {tab} = props;
    if(tab === 0){
      return <div>0번째 입니다.</div>
    }else if(tab === 1){
      return <div>1번째 입니다.</div>
    }
  }

function Stock(props){
    return(
        <p>재고 : {props.stock[props.id]}</p>
    )
}

export default Detail;