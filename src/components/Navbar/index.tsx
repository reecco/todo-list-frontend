import { Link } from "react-router-dom";
import { AiOutlineHome } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { ImExit } from 'react-icons/im';
import { IoHomeSharp } from 'react-icons/io5';
import { useCookies } from "react-cookie";

import './styles.scss';
import { navbar } from "./utils";

type NavbarProps = {
  className: string
}

function Navbar({ className }: NavbarProps) {
  const [cookies] = useCookies(['authorization', 'username', 'userId', 'userIdTask']);
  const navigate = useNavigate();
  const [, removeCookie] = useCookies(['authorization', 'userId', 'userIdTask', 'username']);

  const logout = () => {
    removeCookie('authorization', '');
    removeCookie('userId', '');
    removeCookie('userIdTask', '');
    removeCookie('username', '');
    setTimeout(() => {
      navigate('/signin');
      alert('Saindo...');
    }, 2000);
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
        </>
      )}
    </nav>
  );
}

export default Navbar;