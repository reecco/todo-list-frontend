import { useState } from "react";
import { useCookies } from "react-cookie";
import { AiFillDelete } from 'react-icons/ai';

type DeleteTaskProps = {
  id: string,
  className: string
}

function DeleteTask(props: DeleteTaskProps) {
  const { id, className } = props;
  const [message, setMessage] = useState('');
  const [cookies] = useCookies(['authorization']);
  const token = cookies['authorization'];

  const deleteTask = async () => {
    setMessage('');
    await fetch('http://localhost:3000/task', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ id })
    }).then(res => res.json())
      .then(data => data)
      .catch(error => console.log(error));

      window.location.reload();
  }

  return (
    <>
      <button className={className} onClick={deleteTask}><AiFillDelete /></button>
    </>
  );
}

export default DeleteTask;