import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Context from "../tools/Context.js";


function Home() {
    const navigate = useNavigate();
    const [profile, setProfile] = useContext(Context);
    let movimentationContent = <h3>Não há registro de <br /> entrada ou saída</h3>
    
    function Navigate(props) {
        return (navigate(`/home/${props}`, { state: props }));
    }
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
                    {movimentationContent}
                </Registers>
                <Bottom>
                    <New onClick={()=>{Navigate("entrada");}}>
                        <div>
                            +
                        </div>
                        <div>
                            Nova <br /> entrada
                        </div>
                    </New>
                    <New onClick={()=>{Navigate("saida");}}>
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
    /* font-family: 'Raleway'; */
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
        text-align: center;
    }
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
    color: #ffffff;
`

export default Home;