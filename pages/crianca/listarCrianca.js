import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../../styles/Forms.module.css';

export default function ListarCriancas() {
  const [criancas, setCriancas] = useState([]);

  useEffect(() => {
    const fetchCriancas = async () => {
      try {
        const response = await fetch('http://localhost:8080/crianca/listarCrianca');
        const data = await response.json();
        setCriancas(data);
      } catch (error) {
        console.error('Erro ao buscar dados do servidor:', error);
      }
    };

    fetchCriancas();
  }, []);

  return (
    <div>
      <h1>Listar Crianças</h1>
      <ul>
        {criancas.map((crianca) => (
          <li key={crianca.idCrianca}>
            {`ID: ${crianca.idCrianca}, Nome: ${crianca.nomeCrianca}, Idade: ${crianca.idade}`}
          </li>
        ))}
      </ul>
      <br />
      <li className={styles.button}><Link href="homeCrianca" className={styles.a}>Voltar</Link></li>
    </div>
  );
}
