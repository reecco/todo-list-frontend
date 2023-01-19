import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { FaEdit } from 'react-icons/fa';

import Button from '../Button';
import Input from '../Input';

import './styles.scss';

type Task = {
  id?: string,
  onClick?: any
}

function Task({ id, onClick }: Task) {
  const [cookies] = useCookies(['authorization']);
  const token = cookies['authorization'];
  const [task, setTask] = useState(Object);
  const [message, setMessage] = useState('');

  const editTask = async (event: any) => {
    event.preventDefault();

    const title = event.target.title.value;
    const description = event.target.desc.value;

    await fetch('http://localhost:3000/task', {
      method: 'PUT',
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, title, description })
    }).then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(error => console.log(error));
  }

  useEffect(() => {
    fetch('http://localhost:3000/task/' + id, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(data => setTask(data))
      .catch(error => console.log(error));
  }, []);

  const stylesForm: any = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  }

  const stylesBox: any = {
    width: '50%',
    display: 'flex',
    flexDirection: 'column'
  }

  return (
    <div className='container-modal'>
      <div className="btn-box">
        <Button 
          className='btn-close' 
          onClick={onClick} 
          value="&#x2715;" 
        />
      </div>
      <form style={stylesForm} onSubmit={editTask}>
        {Object.keys(task).length > 0 && (
          <>
            <p style={{ color: '#28a745', fontSize: '1rem', height: '15px' }}>{ message }</p>
            <div style={stylesBox} className="box-field">
              <label htmlFor="title">Título</label>
              <Input
                className='input-title'
                id='title'
                name='title'
                type='text'
                placeholder={task.task.title}
              />
            </div>
            <div style={stylesBox} className="box-field">
              <label htmlFor="desc">Descrição</label>
              <textarea
                name="desc"
                id="desc"
                className='input-desc'
                placeholder={task.task.description}>
              </textarea>
            </div>
            <Button
              className="btn-change"
              value="Atualizar tarefa"
            />
          </>
        )}
      </form>
    </div>
  );
}

export default Task;