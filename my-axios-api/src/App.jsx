import React from 'react';
import axios from 'axios';
function App() {
  axios.get('https://reqres.in/api/users')
    .then(response => {
      // manipular dados de resposta
      console.log(response);
    })
    .catch(err => {
      // manipular erros
      console.log(err);
    });
  return (
    <p>Teste com API Axios</p>
  );
}
export default App;