import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import './styles.scss';

type Response = {
  message: string,
  status: number
}

function Error({ message, status }: Response) {
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 400)
      setTimeout(() => navigate('/signin'), 5000);
  }, []);

  return (
    <div className="container-message">
      <p className="message">{message}.</p>
      <p className="message">Por favor, faça login novamente.</p>
      <p className="message">Caso não redirecionado, <Link to='/signin'>clique aqui</Link>.</p>
    </div>
  );
}

export default Error;