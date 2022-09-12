import styled from "styled-components";
import { useContext } from "react";
import Context from "../tools/Context.js";

import { DeleteMovimentation } from "../tools/UseAxios.js"


function Movimentation({ movimentation, reload, setReload }) {
    // eslint-disable-next-line no-unused-vars
    const [profile, setProfile] = useContext(Context);
    const data = movimentation.body;
    let color;
    if (data.type === "Entrada") {
        color = true;
    } else {
        color = false;
    }

    function deleteMovimentation() {
        const body = { movimentationId: movimentation._id }
        const type = data.type.toLowerCase();
        const confirmation = window.confirm(`Tem certeza que deseja excluir permanentemente a ${type} ${data.description}`)
        if(confirmation) {
            try {
                DeleteMovimentation(body, profile).then((res) => {
                    setReload(!reload);
                }).catch((error) => {
                    console.error(error);
                    alert(`${error.response.data}`);
                });
            } catch (error) {
                console.error(error);
            }
        } else {
            return;
        }

        
    }
    return (
        <Wrapper>
            <Left>
                <div><h3>{data.time}</h3></div>
                <div><h2>{data.description}</h2></div>
            </Left>
            <Right>
                <Price color={color}> <h1>{data.value}</h1></Price>
                <DeleteButtom onClick={() => { deleteMovimentation() }}>x</DeleteButtom>
            </Right>

        </Wrapper>
    )
}

const Wrapper = styled.div`
width: 100%;
height: 35px;
display: flex;
justify-content: space-between;
align-items: center;
h2{
    font-size: 16px;
    font-family: 'Raleway', sans-serif;
    font-weight: 400;
}
h3{
    color: #C6C6C6;
    font-weight: 400;
    font-size: 16px;
    font-family: 'Raleway', sans-serif;
    text-align: center;
    margin-right: 5px;
}
`
const Left = styled.div`
    display: flex;
`
const Right = styled.div`
    display: flex;
`
const Price = styled.div`
h1{
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    font-family: 'Raleway', sans-serif;
    color: ${props => props.color ? "#03AC00" : "#C70000"};
}
`
const DeleteButtom = styled.div`
    font-size: 20px;
    color: #C6C6C6;
    margin-left: 10px;   
`
export default Movimentation;