import React from "react";
import {Table} from "react-bootstrap";
import { connect } from "react-redux";

function Cart(props){
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
                    {props.state.map((product, i)=>{
                        return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{product.name}</td>
                                <td>{product.quan}</td>
                                <td>
                                    <button onClick={()=>{ props.dispatch({ type : "increase quan" }) }} >+</button>
                                    <button onClick={()=>{ props.dispatch({ type : "decrease quan" }) }} >-</button>                                
                                </td>
                            </tr>
                        )
 
                        })
                    }
                </tbody>
            </Table>
            
            {
                props.alertState === true
                ?  <div className="my-alert2">
                    <p>지금 구매하면 20%할인</p>
                    <button onClick={()=>{ props.dispatch({ type : "close"}) }}>닫기</button>
                   </div>
                : null
            }


            
        </div>
    );
}

function getStore(state){
    console.log(state.reducerAlert);
    return{
        state : state.reducer,
        alertState : state.reducerAlert
    }
}


export default connect(getStore)(Cart);