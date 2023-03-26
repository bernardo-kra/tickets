import React from 'react';
import axios from 'axios';
function MyPost() {
    // Cria os dados para serem enviados
    const user = {
        first_name: 'John',
        last_name: 'Lilly',
        job_title: 'Software Engineer'
    };
    axios.post('https://reqres.in/api/users', user)
        .then(res => console.log(res));
    return (
        <p>Teste de POST com API Axios</p>
    );
}
export default MyPost;