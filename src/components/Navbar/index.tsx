import { Link } from "react-router-dom";
import { AiOutlineHome } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { ImExit } from 'react-icons/im';
import { IoHomeSharp } from 'react-icons/io5';
import { useCookies } from "react-cookie";
import Modal from 'react-modal';

import './styles.scss';
import { navbar } from "./utils";
import { useState } from "react";
import Loading from "../Loading";

type NavbarProps = {
  className: string
}

function Navbar({ className }: NavbarProps) {
  const navigate = useNavigate();
  const [, removeCookie] = useCookies(['authorization', 'userId', 'userIdTask', 'username']);
  const [modalIsOpen, setIsOpen] = useState(false);

  const logout = () => {
    handleOpenModalLoggout();
    setTimeout(() => {
      handleCloseModalLoggout();
      removeCookie('authorization', '');
      removeCookie('userId', '');
      removeCookie('userIdTask', '');
      removeCookie('username', '');
      navigate('/signin');
    }, 5000);
  }

  const handleCloseModalLoggout = () => {
    setIsOpen(false);
  }

  const handleOpenModalLoggout = () => {
    setIsOpen(true);
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '300px',
      height: '300px',
      borderRadius: '15px',
      border: 'none',
      display: 'flex',
      backgroundColor: 'transparent'
    }
  }

  return (
    <nav className={className}>
      {className === 'navbar' &&
        navbar.map((item: any, index: number) =>
          item.name === 'Home' ? (
            <Link className="home" key={index} to={item.route}><AiOutlineHome /></Link>
          ) : <Link key={index} to={item.route}>{item.name}</Link>
        )
      }

      {className === 'logged-navbar' && (
        <>
          <Link className="item" to='/home'>
            <IoHomeSharp />
            <h4>Home</h4>
          </Link>
          <Link className="item" to='/user'>
            <FaUserCircle />
            <h4>Perfil</h4>
          </Link>
          <button className="item btn-loggout" onClick={logout}>
            <ImExit />
            <h4>Sair</h4>
          </button>
          <Modal
            isOpen={modalIsOpen}
            style={customStyles}
          >
            <Loading width="150px" height="150px" borderRadius="50%" />
          </Modal>
        </>
      )}
    </nav>
  );
}

export default Navbar;