import React, { useEffect, useState } from "react";
import {useHistory, useParams} from "react-router-dom";
import styled from "styled-components";
import "./Detail.scss";

let box = styled.div`
    padding-top : 30px;
`;

let ulala = styled.h4`
    font-size : 25px;
    color : ${ props => props.colour}
`;

function Detail(props){

    const [alert, alertChange] = useState(true);
    const [inputData, inputDataChange] = useState("");

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
                    <Stock stock={props.stock} id={id}></Stock>
                    
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
        </div> 
    )

}

function Stock(props){
    return(
        <p>재고 : {props.stock[props.id]}</p>
    )
}

export default Detail;