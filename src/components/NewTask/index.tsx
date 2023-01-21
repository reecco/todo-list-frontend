import { useState } from "react";
import { useCookies } from "react-cookie";
import Button from "../Button";
import Input from "../Input";

import './styles.scss';

type NewTaskProps = {
  onClick?: any
}

function NewTask({ onClick }: NewTaskProps) {
  const [cookie] = useCookies(['authorization', 'userIdTask']);
  const token = cookie['authorization'];
  const id = cookie['userIdTask'];
  const [message, setMessage] = useState('');
  const [inputTitle, setInputTitle] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [inputTitleError, setInputTitleError] = useState('title');
  const [inputDescError, setInputDescError] = useState('desc');
  const [lengthTitle, setLengthTitle] = useState(0);
  const [lengthDescription, setLengthDescription] = useState(0);

  const validInput = (title: string, description: string) => {
    const isValidTitle = title == '' || title == ' ';
    const isValidDescription = description == '' || description == ' ';

    if (isValidTitle || isValidDescription) {
      setMessage('Preencha os campos corretamente.');

      if (isValidTitle) {
        setInputTitleError('title-error');
      }

      if (isValidDescription) {
        setInputDescError('desc-error')
      }

      setTimeout(() => {
        setMessage('');
        setInputTitleError('');
        setInputDescError('');
      }, 5000);

      return false;
    }

    if ((title.length > 20 || title.length <= 0) || ( description.length > 50 || description.length <= 0))
      return false;

    return true;
  }

  const task = async (event: any) => {
    event.preventDefault();

    const title: string = event.target.title.value;
    const description: string = event.target.desc.value;

    const isValid = validInput(title, description);

    if (!isValid)
      return;

    await fetch('http://localhost:3000/newtask', {
      method: 'POST',
      headers: {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id, title, description
      })
    }).then(res => res.json())
      .then(data => {
        setMessage(data.message);

        setTimeout(() => setMessage(''), 3000);
      })
      .catch(error => console.log(error));

    setInputTitle('');
    setInputDescription('');
  }

  const stylesForm: any = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  }

  return (
    <div className="container-modal-newtask">
      <div className="btn-box">
        <Button
          className='btn-close'
          onClick={onClick}
          value="&#x2715;"
        />
      </div>
      <form style={stylesForm} onSubmit={task}>
        <p style={{ color: '#28a745', fontSize: '1rem', height: '15px' }}>{message}</p>
        <div className="box-field">
          <label htmlFor="title">Título</label>
          <Input
            className='input-title'
            id={inputTitleError}
            name='title'
            type='text'
            value={inputTitle}
            onChange={(event: any) => {
              setInputTitle(event.target.value);
              setLengthTitle(event.target.value.length);
            }}
            placeholder="Digite o título da tarefa"
          />
          <progress 
            value={lengthTitle} 
            max={20}>
          </progress>
        </div>
        <div className="box-field">
          <label htmlFor="desc">Descrição</label>
          <textarea
            name="desc"
            id={inputDescError}
            className='input-desc'
            value={inputDescription}
            onChange={(event) => {
              setInputDescription(event.target.value);
              setLengthDescription(event.target.value.length);
            }}
            placeholder="Digite a descrição da tarefa">
          </textarea>
          <progress 
            value={lengthDescription} 
            max={50}>
          </progress>
        </div>
        {(lengthTitle > 20 || lengthTitle <= 0) || (lengthDescription > 50 || lengthDescription <= 0) ? (
          <p className="btn-disabled">
            Adicionar tarefa
          </p>
        ): (
            <Button
              className="btn-change"
              value="Adicionar tarefa"
            />
        )}
      </form>
    </div>
  );
}

export default NewTask;