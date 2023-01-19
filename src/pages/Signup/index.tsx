import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "../../components/Button";
import Footer from "../../components/Footer";
import Input from "../../components/Input";
import Navbar from "../../components/Navbar";

import './styles.scss';

function Signup() {
  const [message, setMessage] = useState('');
  const [inputUsername, setInputUsername] = useState('input-username');
  const [inputEmail, setInputEmail] = useState('input-email');
  const [inputPassword, setInputPassword] = useState('input-password');
  const inputValueUsername = useRef(inputUsername);

  const navigate = useNavigate();

  document.title = 'Cadastre-se';

  const validInput = (username: string, email: string, password: string): boolean => {
    let isValidUsername = username == '' || username == ' ';
    let isValidEmail = email == '' || email == ' ';
    let isValidPassword = password == '' || password == ' ';

    if (isValidUsername || isValidEmail || isValidPassword) {
      setMessage('Preencha os campos corretamente.');

      if (isValidUsername) {
        setInputUsername('input-username--alert');

        setTimeout(() => setInputUsername('input-username'), 5000);
      }

      if (isValidEmail) {
        setInputEmail('input-email--alert');

        setTimeout(() => setInputEmail('input-email'), 5000);
      }

      if (isValidPassword) {
        setInputPassword('input-password--alert');

        setTimeout(() => setInputPassword('input-password'), 5000);
      }

      setTimeout(() => setMessage(''), 5000);

      return false;
    }

    return true;
  }

  const register = async (event: any) => {
    event.preventDefault();
    setMessage('');

    let username: string = event.target.username.value;
    let email: string = event.target.email.value;
    let password: string = event.target.password.value;

    const isValid = validInput(username, email, password);

    if (!isValid) {
      return;
    }

    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    }).then(res => res.json())
      .then(data => data)
      .catch(error => console.log(error));

    if (response.status === 403) {
      setMessage(response.message);
      setInputEmail('input-email--alert');

      return setTimeout(() => {
        setMessage('');
        setInputEmail('input-email');
      }, 5000);
    }

    setMessage('Cadastro realizado com sucesso.');

    setTimeout(() => {
      setMessage('');
      navigate('/signin');
    }, 2000);
  }

  return (
    <>
      <Navbar className='navbar' />
      <div className="container-register">
        <form className="form" onSubmit={register}>
          <h1>Cadastre-se</h1>
          <span className="message">{message}</span>
          <Input
            type="text"
            name="username"
            id="input-username"
            placeholder="Nome"
            className={inputUsername}
          />
          <Input
            type="email"
            name="email"
            id="input-email"
            placeholder="E-mail"
            className={inputEmail}
          />
          <Input
            type="password"
            name="password"
            id="input-password"
            placeholder="Senha"
            className={inputPassword}
          />
          <Button
            className="btn-register"
            id="btn-register"
            name="register"
            value="Cadastrar"
          />
          <Link className="is-registered" to='/signin'>Faça login em vez disso</Link>
        </form>
      </div>
      <Footer className="footer" />
    </>
  );
}

export default Signup;