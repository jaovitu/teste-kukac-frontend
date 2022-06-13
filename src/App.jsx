import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import './App.css'

function App() {
  const { register, handleSubmit } = useForm();
  const [ userInfo, setUserInfo ] = useState({});

  async function getUserData(inputData) {
    const URL = 'http://localhost:5000/users'

    const { name, cep, monthlyIncome, dependentsNumber } = inputData;

    const { data } = await axios.post(URL, { name, cep, monthlyIncome, dependentsNumber });

    return data;
  }

  const onSubmit = async (data) => {
    const userData = await getUserData(data);
    setUserInfo({ ...userData });
  };

  return (
    <>
      <form className='form' onSubmit={ handleSubmit(onSubmit) } >

        <div className='inputGroup' >
          <label>Name (opcional)</label>
          <input type="text" name='name' {...register('name')} />
        </div>

        <div className='inputGroup' >
          <label>CEP</label>
          <input type="text" name='cep' {...register('cep')} required />
        </div>

        <div className='inputGroup' >
          <label>Monthly income</label>
          <input type="number" name='monthlyIncome' {...register('monthlyIncome')} required />
        </div>

        <div className='inputGroup' >
          <label>Number of dependents</label>
          <input type="number" name='dependentsNumber' min={0} {...register('dependentsNumber')} required />
        </div>

        <button type='submit'>Enviar</button>

      </form>

      <table>

        <thead>
          <tr>
            <th>Nome</th>
            <th>Estado</th>
            <th>Cidade</th>
            <th>Bairro</th>
            <th>Logradouro</th>
            <th>Complemento</th>
            <th>Renda Per Capita</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{userInfo?.name || '--'}</td>
            <td>{userInfo?.address?.uf || '--'}</td>
            <td>{userInfo?.address?.localidade || '--'}</td>
            <td>{userInfo?.address?.bairro || '--'}</td>
            <td>{userInfo?.address?.logradouro || '--'}</td>
            <td>{userInfo?.address?.complemento || '--'}</td>
            <td>R${userInfo?.perCapitaIncome}</td>
          </tr>
        </tbody>
          
      </table>
    </>
  );
}

export default App;
