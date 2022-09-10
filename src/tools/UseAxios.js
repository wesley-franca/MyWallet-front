import axios from "axios";

const mainURL = "http://localhost:5000";

function CreateAccount(body) {
    const promise = axios.post(`${mainURL}/registration`, body);
    return promise;
}


export { CreateAccount };