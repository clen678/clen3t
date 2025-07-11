import axios from 'axios';

export default axios.create({
    baseURL:'https://clen3t-white-fog-5060.fly.dev', //http://localhost:8080
    headers:{"ngrok-skip-browser-warning" : "true"}
});