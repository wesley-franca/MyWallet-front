import styled from "styled-components";



function Movimentation({ movimentation, index }) {
    const data = movimentation.body;
    let color;
    if(data.type === "Entrada") {
        color = true;
    } else{
        color = false;
    }

    return (
        <Mov>
            <Left>
                <div><h3>{data.time}</h3></div>
                <div><h2>{data.description}</h2></div>
            </Left>

            <Price color={color}> <h1>{data.value}</h1></Price>
        </Mov>
    )
}

const Mov = styled.div`
width: 100%;
height: 35px;
display: flex;
justify-content: space-between;
align-items: center;
h2{
    font-size: 16px;
    font-weight: 400;
}
h3{
    color: #C6C6C6;
    font-weight: 400;
    font-size: 16px;
    text-align: center;
    margin-right: 5px;
}
`
const Left = styled.div`
    display: flex;
`
const Price = styled.div`
h1{
    font-weight: 400;
    font-size: 16px;
    color: ${props=> props.color? "#03AC00" : "#C70000"};
}
`
export default Movimentation;