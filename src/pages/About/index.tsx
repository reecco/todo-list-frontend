import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

import './styles.scss';

function About() {
  document.title = 'Sobre';

  return (
    <>
      <Navbar className='navbar' />
      <div className="container-about">
        <h1>Sobre</h1>
        <h3>Desenvolvido por <a href="https://github.com/reecco">Fred Recco</a></h3>
      </div>
      <Footer className="footer" />
    </>
  );
}

export default About;