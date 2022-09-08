import {Link} from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import {  ThreeDots } from  'react-loader-spinner';

function RegistrationPage() {
    const [isDisable, SetIsDisable] = useState(false)
    const load = ( isDisable? <ThreeDots 
        height="80"
        width="80"
        radius="9"
        color="#FFFFFF"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}/>    
        : "Cadastrar")

    function handleForm(e) {
        e.preventDefault();
        SetIsDisable(true)
        if(e.target[2].value === e.target[3].value) {
            const body = {
                name: e.target[0].value,
                email: e.target[1].value,
                password: e.target[2].value
            }
            console.log(body)
        } else {
            SetIsDisable(false)
            alert("Por favor, verifique os dados inseridos")
        }
        
    }



    return (
        <Wrapper>
            <Container>
                <Title>MyWallet</Title>

                <RegistrationForm onSubmit={handleForm}>
                    <input type="text"
                        name="name"
                        placeholder="Nome"
                        disabled={isDisable}
                        required />

                    <input type="email"
                        name="email"
                        placeholder="E-mail"
                        disabled={isDisable}
                        required />

                    <input type="text"
                        name="password"
                        placeholder="Senha"
                        disabled={isDisable}
                        required />

                    <input type="text"
                        name="password"
                        placeholder="Confirme a senha"
                        disabled={isDisable}
                        required />
                    <Registbutton disabled={isDisable} bluur={isDisable}>{load}</Registbutton>
                </RegistrationForm>

                <Link to={`/`} >
                    <New>Já tem uma conta? Faça login!</New>
                </Link>
            </Container>
            
        </Wrapper>
    )
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
    color: #FFFFFF;
    text-decoration-line: underline;
    a{
        text-decoration: none;
    }
`
const RegistrationForm = styled.form`
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
        padding: 15px;
        border-radius: 5px;
        margin-bottom: 15px;
        ::placeholder {
        color: #000000;
        }
        }
`
const Registbutton = styled.button`
    height: 45px;
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #A328D6;
    border: none;
    border-radius: 5px;
    font-size: 21px;
    color: #FFFFFF;
    margin-bottom: 25px;
    opacity: ${props=>props.bluur? 0.7 : 1};
`
export default RegistrationPage;