import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

import './styles.scss';

function NotFound() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   setTimeout(() => navigate('/signin'), 10000);
  // }, []);

  return (
    <>
      <Navbar className='navbar' />
      <div className="container-notfound">
        <h1>Página não encontrada</h1>
      </div>
      <Footer className="footer" />
    </>
  );
}

export default NotFound;