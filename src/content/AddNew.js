import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../tools/Context.js";
import { ThreeDots } from 'react-loader-spinner';
import { CreateMovimentation } from "../tools/UseAxios.js";

function AddNew() {
    const location = useLocation();
    const Data = location.state;
    // eslint-disable-next-line no-unused-vars
    const [profile, setProfile] = useContext(Context);
    const [isDisable, setIsDisable] = useState(false);
    const navigate = useNavigate();
    const load = (isDisable ? <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#FFFFFF"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true} />
        : `Salvar ${Data}`);
    useEffect(()=>{
        if (profile === null) {
            return (navigate("/"))
        }
    });
        

    function handleForm(e) {
        e.preventDefault();
        setIsDisable(true);
        const body = {
            type: Data.charAt(0).toUpperCase() + Data.slice(1),
            value: Number(e.target[0].value).toFixed(2),
            description:  e.target[1].value.charAt(0).toUpperCase() + e.target[1].value.slice(1),
        };
        CreateMovimentation(body, profile).then((res) => {
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
                <Top>
                    <div>Nova {Data}</div>
                </Top>
                <AddForm onSubmit={handleForm}>
                    <input type="text"
                        name="value"
                        placeholder="Valor"
                        disabled={isDisable}
                        required />
                    <input type="text"
                        name="description"
                        placeholder="Descrição"
                        disabled={isDisable}
                        required />
                    <AddButtom disabled={isDisable} bluur={isDisable}>{load}</AddButtom>
                </AddForm>
                <AddButtom onClick={()=>{return (navigate("/home"))}}>Cancelar</AddButtom>
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
    justify-content: flex-start;
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
    font-weight: 700;
    font-size: 26px;
    font-family: 'Raleway', sans-serif;
    color: #ffffff;
    margin-bottom: 40px;
`
const AddForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    input{
        width: 100%;
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
const AddButtom = styled.button`
    height: 45px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #A328D6;
    border: none;
    border-radius: 5px;
    font-size: 21px;
    font-family: 'Raleway', sans-serif;
    color: #FFFFFF;
    margin-bottom: 17px;
    opacity: ${props => props.bluur ? 0.5 : 1};
`

export default AddNew;