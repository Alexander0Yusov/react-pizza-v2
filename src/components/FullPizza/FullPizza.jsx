import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FullPizza = () => {
  const navigate = useNavigate();
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();

  React.useEffect(() => {
    const fetchPizza = async () => {
      try {
        const { data } = await axios.get(
          `https://647bc928c0bae2880ad03fe8.mockapi.io/adverts/${id}`
        );
        setPizza(data);
      } catch (error) {
        alert('Ошибка при получении питсы!');
        navigate('/');
      }
    };
    fetchPizza();
  }, [id, navigate]);

  if (!pizza) {
    return 'Загрузка...';
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
    </div>
  );
};

export default FullPizza;
