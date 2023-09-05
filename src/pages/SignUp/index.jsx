import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Background, Container, Form } from './styles';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { FiLogIn, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { api } from '../../services/api';

export function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  function handleSignUp() {
    if ((!name, !email, !password)) {
      return alert('Preencha todos os campos!');
    }

    api
      .post('/users', { name, email, password })

      .then((res) => {
        alert(res.data.message);
        navigate('/');
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.message);
        } else {
          alert(error.message);
        }
      });
  }

  return (
    <Container>
      <Background />
      <Form>
        <h1>Rocketnotes</h1>
        <p>Aplicação para salvar e gerenciar seus links úteis.</p>
        <h2>Crie sua conta</h2>

        <Input
          placeholder='Nome'
          type='text'
          icon={FiUser}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder='E-mail'
          type='email'
          icon={FiMail}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder='Senha'
          type='password'
          icon={FiLock}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button title='Entrar' onClick={handleSignUp} />
        <Link to='/'>Voltar para o login</Link>
      </Form>
    </Container>
  );
}
