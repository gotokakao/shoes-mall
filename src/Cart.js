import React, { useState } from "react";
import {Table} from "react-bootstrap";
import { connect, useDispatch, useSelector } from "react-redux";

function Cart(props){

    const state = useSelector((state)=>state);
    console.log(state);
    const dispatch = useDispatch();

    return(
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경</th>
                    </tr>
                </thead>
                <tbody>
                    {state.reducer.map((product, i)=>{
                        return(
                            <tr key={i}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.quan}</td>
                                <td>
                                    <button onClick={()=>{ dispatch({ type : "increase quan", data : product.id }) }} >+</button>
                                    <button onClick={()=>{ dispatch({ type : "decrease quan", data : product.id }) }} >-</button>                                
                                </td>
                            </tr>
                        )
 
                        })
                    }
                </tbody>
            </Table>
            
            {
                state.reducerAlert === true
                ?  <div className="my-alert2">
                    <p>지금 구매하면 20%할인</p>
                    <button onClick={()=>{ dispatch({ type : "close"}) }}>닫기</button>
                   </div>
                : null
            }


            
        </div>
    );
}

// function getStore(state){
//     console.log(state.reducerAlert);
//     return{
//         state : state.reducer,
//         alertState : state.reducerAlert
//     }
// }


export default Cart;