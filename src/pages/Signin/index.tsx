import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

import Button from "../../components/Button";
import Footer from "../../components/Footer";
import Input from "../../components/Input";
import Loading from "../../components/Loading";
import Navbar from "../../components/Navbar";

import './styles.scss';

function Signin() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [inputEmail, setInputEmail] = useState('input-email');
  const [inputPassword, setInputPassword] = useState('input-password');
  const [loading, setLoading] = useState(false);
  const [mainContainer, setMainContainer] = useState(true);
  const [cookie, setCookie] = useCookies(['authorization', 'userId', 'userIdTask']);
  const token = cookie['authorization'];

  document.title = 'Entre no To-Do List';

  useEffect(() => {
    if (token)
      navigate('/home');
  }, []);

  const validInput = (email: string, password: string) => {
    let isValidEmail = email == '' || email == ' ';
    let isValidPassword = password == '' || password == ' ';

    if (isValidEmail || isValidPassword) {
      setMessage('Preencha os campos corretamente');

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

  const login = async (event: any) => {
    event.preventDefault();

    let email: string = event.target.email.value;
    let password: string = event.target.password.value;

    const isValid = validInput(email, password);

    if (!isValid)
      return;

    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    }).then(res => res.json())
      .then(datas => datas)
      .catch(error => error);

    if (response.status === 401) {
      setMessage(response.message);
      setInputEmail('input-email--alert');
      setInputPassword('input-password--alert');

      setTimeout(() => {
        setMessage('');
        setInputEmail('input-email');
        setInputPassword('input-password');
      }, 5000);
    }

    if (response.status === 200) {
      setMainContainer(false);
      setLoading(true);
      setCookie('authorization', response.token, {path: '/', maxAge: 600});
      setCookie('userId', response.id, {path: '/', maxAge: 600});
      setCookie('userIdTask', response.taskUserId, {path: '/', maxAge: 600});
      
      setTimeout(() => navigate('/home'), 7000);
    }
  }

  const unavailable = () => {
    alert('Opção indisponível no momento.');
  }

  return (
    <>
      {mainContainer && (
        <>
          <Navbar className='navbar' />
          <div className="container-login">
            <form className="form" onSubmit={login}>
              <h1>Entre no To-Do List</h1>
              <span className="message">{message}</span>
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
                className="btn-login"
                id="btn-login"
                name="login"
                value="Entrar"
              />
              <Link className="recover-password" to='#' onClick={unavailable}>Esqueci minha senha</Link>
            </form>
          </div>
          <Footer className="footer" />
        </>
      )}
      {loading && (
        <Loading width="150px" height="150px" />
      )}
    </>
  );
}

export default Signin;