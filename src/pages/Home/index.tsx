import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Modal from 'react-modal';
import { FaEdit } from 'react-icons/fa';

import Button from "../../components/Button";
import DeleteTask from "../../components/DeleteTask";
import EditTask from "../../components/EditTask";
import Error from "../../components/Error";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";
import Navbar from "../../components/Navbar";

import './styles.scss';
import NewTask from "../../components/NewTask";

Modal.setAppElement('#root');

function Home() {
  const [taskList, setTaskList] = useState(Object);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [idTask, setIdTask] = useState('');
  const [modalIsOpenEdit, setIsOpenEdit] = useState(false);
  const [cookies] = useCookies(['authorization', 'userId', 'userIdTask']);

  const token = cookies['authorization'];
  const userIdTask = cookies['userIdTask'];

  document.title = 'Home - To-Do List';

  const home = async () => {
    await fetch(`http://localhost:3000/home/${userIdTask}`, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => {
        setTaskList(data);
      })
      .catch(error => error);
  }

  useEffect(() => {
    home();
  }, []);

  const handleOpenModal = (modal: string) => {
    if (modal === 'new') {
      setIsOpen(true);
      return;
    }
    setIsOpenEdit(true);

    return
  }

  const handleCloseModal = (modal: string) => {
    if (modal == 'new') {
      setIsOpen(false);
      return
    }
    setIsOpenEdit(false);

    return;
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '70%',
      height: '70%',
      borderRadius: '15px',
      display: 'flex'
    }
  }

  return (
    <>
      {taskList.status === 200 && (
        <>
          <div className="container-home">
            <div className="container-content">
              <>
                <Navbar className='logged-navbar' />
                <div className="container-main">
                  <div className="container-tasks">
                    <div className="box-btn-task">
                      <Button className="btn-newtask" value="Nova tarefa" onClick={() => handleOpenModal('new')} />
                    </div>
                    {Object.keys(taskList).length > 0 &&
                      Object.keys(taskList.tasks).length >= 2 ? Object.keys(taskList.tasks).map((index: any) => (
                        <div key={index} className="task">
                          <div className="about">
                            <h3>{taskList.tasks[index].title}</h3>
                            <p className="info info-desc" >{taskList.tasks[index].description}</p>
                            <p className="info info-date">{new Date(taskList.tasks[index].dateCreated).toLocaleString('pt-BR')}</p>
                          </div>
                          <div className="box-button">
                            <button className="btn btn-edit" onClick={() => {
                              handleOpenModal('edit');
                              setIdTask(taskList.tasks[index]._id);
                            }}><FaEdit />
                            </button>
                            <DeleteTask className="btn btn-delete" id={taskList.tasks[index]._id} />
                          </div>
                        </div>
                      )) : (
                      <p style={{ margin: 'auto', 'fontSize': '1.4rem' }}>Nenhuma tarefa foi encontrada.</p>
                    )}
                  </div>
                  <div className="calendary-box">
                    <h1>Calendário</h1>
                  </div>
                </div>
              </>
            </div>
          </div>
          <Footer className="logged-footer" />
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => handleCloseModal('new')}
            style={customStyles}
          >
            <NewTask onClick={() => handleCloseModal('new')} />
          </Modal>

          <Modal
            isOpen={modalIsOpenEdit}
            onRequestClose={() => handleCloseModal('edit')}
            style={customStyles}
          >
            <EditTask
              id={idTask}
              onClick={() => handleCloseModal('edit')}
            />
          </Modal>
        </>
      )}
      {taskList.status === 400 && (
        <div style={{ height: '96vh' }} className="error">
          <Error message={taskList.message} status={taskList.status} />
        </div>
      )}

    </>
  )
}

export default Home;