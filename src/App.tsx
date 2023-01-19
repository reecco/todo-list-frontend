import './assets/scss/App.scss';
import Footer from './components/Footer';

import Navbar from "./components/Navbar";

function App() {
  document.title = 'To-Do List';

  return (
    <>
      <Navbar className='navbar' />
      <div className="App">
        <h1>Bem vindo ao To-Do List</h1>
        <h3>Um projeto de REST API para uma lista de tarefas</h3>
      </div>
      <Footer className='footer' />
    </>
  )
}

export default App;