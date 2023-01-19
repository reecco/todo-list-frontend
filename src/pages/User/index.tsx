import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import Error from "../../components/Error";
import Footer from "../../components/Footer";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Loading from "../../components/Loading";
import Navbar from "../../components/Navbar";

import './styles.scss';

function User() {
  const [userInfos, setUserInfos] = useState(Object);
  const [cookies] = useCookies(['authorization', 'userId']);
  const token = cookies['authorization'];
  const userId = cookies['userId'];
  const [title, setTitle] = useState('Perfil');
  const [button, setButton] = useState({ display: 'none' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3000/user/${userId}`, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => {
        setUserInfos(data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleInputs = () => {
    setTitle('Atualizar cadastro');
    setButton({ display: 'block' });
  }

  const updateRegister = async (event: any) => {
    event.preventDefault();

    const email: string = event.target.email.value;
    const username: string = event.target.username.value;
    const password: string = event.target.password.value;

    await fetch('http://localhost:3000', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        id: userId ,email, username, password
      })
    }).then(res => res.json())
      .then(data => {
        setMessage(data.message);

        setTimeout(() => {
          setMessage('');
          window.location.reload();
        }, 5000);
      })
      .catch(error => console.log(error));
  }

  return (
    <>
      {userInfos.status === 200 ? Object.keys(userInfos).length === 0 ?
        (<Loading width='100px' height="100px" />)
        :
        (
          <div className="container-user">
            <div className="container-content">
              <Navbar className='logged-navbar' />
              <div className="infos">
                <h1>{title}</h1>
                <form className="container-fields" onSubmit={updateRegister}>
                  <p style={{ color: '#28a745' }} className="st-message">{ message }</p>
                  <div className="box-fields">
                    <label htmlFor="email">E-mail</label>
                    <Input
                      className="input input-email-change"
                      name="email"
                      type="email"
                      id="email"
                      placeholder={userInfos.user.email}
                      onChange={handleInputs}
                    />
                  </div>
                  <div className="box-fields">
                    <label htmlFor="username">Nome</label>
                    <Input
                      className="input input-username-change"
                      name="username"
                      type="text"
                      id="username"
                      placeholder={userInfos.user.username}
                      onChange={handleInputs}
                    />
                  </div>
                  <div className="box-fields">
                    <label htmlFor="password">Senha</label>
                    <Input
                      className="input input-password-change"
                      name="password"
                      type="password"
                      id="password"
                      placeholder="**********"
                      onChange={handleInputs}
                    />
                  </div>
                  <div className="box-button">
                    <Button style={button} className="btn-change" value="Atualizar" />
                    <Button style={button} className="btn-unmake" value="Cancelar" onClick={() => window.location.reload()} />
                  </div>
                </form>
                <Footer className="logged-footer" />
              </div>
            </div>
            {/* <Footer /> */}
          </div>
        )
        : userInfos.status === 400 && (
          <Error message={userInfos.message} status={userInfos.status} />
        )}
    </>
  );
}

export default User;