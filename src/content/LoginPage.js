import Context from "../tools/Context.js";
import { Login } from "../tools/UseAxios.js";

import { useState } from "react";
import { ThreeDots } from 'react-loader-spinner';
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

function LoginPage() {
    // eslint-disable-next-line no-unused-vars
    const [profile, setProfile] = useContext(Context);
    const [isDisable, setIsDisable] = useState(false);
    const load = (isDisable ? <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#FFFFFF"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true} />
        : "Entrar");
    const navigate = useNavigate();

    function handleForm(e) {
        e.preventDefault();
        setIsDisable(true);
        const body = {
            email: e.target[0].value,
            password: e.target[1].value
        };
        Login(body).then((res) => {
            setProfile({ token: res.data.token, userId: res.data._id });
            return (navigate("/home"));
        }).catch((error) => {
            console.error(error);
            alert(`${error.response.data}`);
            setIsDisable(false);
        });
    }

    return (
        <Wrapper>
            <Container>
                <Title>MyWallet</Title>
                <Loginform onSubmit={handleForm}>
                    <input type="email"
                        name="email"
                        placeholder="email"
                        disabled={isDisable}
                        required />
                    <input type="password"
                        name="password"
                        placeholder="senha"
                        disabled={isDisable}
                        required />
                    <Loginbutton disabled={isDisable} bluur={isDisable}>{load}</Loginbutton>
                </Loginform>
                <Link to={`/cadastro`} >
                    <New>Primeira vez? Cadastre-se!</New>
                </Link>
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
`
const Title = styled.h1`
    font-family: 'Saira Stencil One', cursive;
    font-size: 32px;
    font-weight: 400;
    color: #FFFFFF;
    margin-bottom: 30px;
`
const New = styled.p`
    font-size: 14;
    font-family: 'Raleway', sans-serif;
    color: #FFFFFF;
    text-decoration-line: underline;
    a{
        text-decoration: none;
    }
`
const Loginform = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    input{
        width: 303px;
        height: 45px;
        margin-bottom: 6px;
        border: solid 1px #D5D5D5;
        font-weight: 400;
        font-size: 20px;
        font-family: 'Raleway', sans-serif;
        padding: 15px;
        border-radius: 5px;
        margin-bottom: 15px;
        ::placeholder {
        color: #000000;
        }
    }
`
const Loginbutton = styled.button`
    height: 45px;
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #A328D6;
    border: none;
    border-radius: 5px;
    font-size: 21px;
    font-family: 'Raleway', sans-serif;
    color: #FFFFFF;
    margin-bottom: 25px;
    opacity: ${props => props.bluur ? 0.5 : 1};
`

export default LoginPage;