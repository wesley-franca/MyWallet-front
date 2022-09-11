import styled from "styled-components";
import { Link, useNavigate, } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import Context from "../tools/Context.js";
import { GetMovimentationList, Logout } from "../tools/UseAxios.js";
import Movimentation from "./Movimentation.js";
import LogoutIcon from "../assets/images/LogoutIcon.png"
function Home() {
    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const [profile, setProfile] = useContext(Context);
    const [hasMovimentations, setHasMovimentations] = useState(false);
    const [movimentationList, setMovimentationList] = useState([{}]);
    const [total, setTotal] = useState(0);
    let color = true;

    useEffect(() => {
        try {
            GetMovimentationList(profile).then((res) => {
                let aux = 0;
                if (res.data.length > 0) {
                    setMovimentationList(res.data);
                    setHasMovimentations(true);
                    const positive = res.data.filter(value => value.body.type === "Entrada");
                    const negative = res.data.filter(value => value.body.type === "Saida");

                    for (let i = 0; i < positive.length; i++) {
                        aux += Number(positive[i].body.value);
                    };
                    for (let i = 0; i < negative.length; i++) {
                        aux -= Number(negative[i].body.value);
                    };
                    setTotal(aux);
                } else {
                    setHasMovimentations(false);
                }
            }).catch((error) => {
                console.error(error);
                alert(`${error.response.data}`);
            });
        } catch (error) {
            console.error(error);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if(total < 0){
        color = false;
    } else{
        color = true;
    }

    function logout(props) {
        try {
            Logout(profile).then(() => {
                return (navigate("/"));
            }).catch((error) => {
                console.error(error);
                alert(`${error.response.data}`);
            });
        } catch (error) {
            console.error(error);
            alert(`${error.response.data}`);
        }
    }
    function Navigate(props) {
        return (navigate(`/home/${props}`, { state: props }));
    }

    if (!hasMovimentations) {
        return (
            <Wrapper>
                <Container>
                    <Top>
                        <div>Olá, Fulano</div>
                        <Link to={"/"}>
                            <div>log-out</div>
                        </Link>
                    </Top>
                    <Registers>
                        <h3>Não há registro de <br /> entrada ou saída</h3>
                    </Registers>
                    <Bottom>
                        <New onClick={() => { Navigate("entrada"); }}>
                            <div>
                                +
                            </div>
                            <div>
                                Nova <br /> entrada
                            </div>
                        </New>
                        <New onClick={() => { Navigate("saida"); }}>
                            <div>
                                -
                            </div>
                            <div>
                                Nova <br /> saída
                            </div>
                        </New>
                    </Bottom>

                </Container>
            </Wrapper>
        );
    } else if (movimentationList.length > 0) {
        return (
            <Wrapper>
                <Container>
                    <Top>
                        <div>Olá, Fulano</div>
                        <div onClick={() => { logout(); }}> 
                            <img src={LogoutIcon} alt=""/> 
                        </div>
                    </Top>
                    <RegistersFull>

                        <Content>
                            {movimentationList.map((movimentation, index) => {
                                return <Movimentation movimentation={movimentation} key={index} />
                            })}
                        </Content>

                        <Total color={color}> 
                            <h2>SALDO</h2>
                            <h1>{Number(total).toFixed(2)}</h1>
                        </Total>

                    </RegistersFull>
                    <Bottom>
                        <New onClick={() => { Navigate("entrada"); }}>
                            <div>
                                +
                            </div>
                            <div>
                                Nova <br /> entrada
                            </div>
                        </New>
                        <New onClick={() => { Navigate("saida"); }}>
                            <div>
                                -
                            </div>
                            <div>
                                Nova <br /> saída
                            </div>
                        </New>
                    </Bottom>

                </Container>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    height: 100vh;
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    background-color: #8c11be;
    padding: 24px;
`
const Top = styled.div`
    width: 100%;
    display: flex;
    justify-content:  space-between;
    align-items: center;
    font-family: 'Raleway', sans-serif;
    font-weight: 700;
    font-size: 26px;
    color: #ffffff;
    a{
        text-decoration: none;
        color: #ffffff;
    }
`
const Registers = styled.div`
    width: 100%;
    height: 70%;
    background-color: #ffffff;
    border-radius: 5px;
    margin: 22px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    h3{
        color: #868686;
        font-weight: 400;
        font-size: 20px;
        font-family: 'Raleway', sans-serif;
        text-align: center;
    }
`
const RegistersFull = styled.div`
    width: 100%;
    height: 70%;
    background-color: #ffffff;
    border-radius: 5px;
    margin: 22px 0;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: space-between;
    justify-content: center;
    padding: 12px;
`

const Bottom = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    a{
        text-decoration: none;
        color: #ffffff;
    }
`
const New = styled.div`
    width: 48%;
    height: 115px;
    background-color: #A328D6;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    font-weight: 700;
    font-size: 17px;
    font-family: 'Raleway', sans-serif;
    color: #ffffff;
`
const Total = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1{
        font-weight: 400;
        font-size: 17px;
        font-family: 'Raleway', sans-serif;
        color: ${props=> props.color? "#03AC00" : "#C70000"};
    }
    h2{
        font-weight: 700;
        font-size: 17px;
        font-family: 'Raleway', sans-serif;
        color: #000000;
    }
`
const Content = styled.div`
    width: 100%;
    max-height: 95%;
    overflow: scroll;
`

export default Home;