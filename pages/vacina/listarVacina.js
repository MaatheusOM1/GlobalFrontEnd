import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../../styles/Forms.module.css';

export default function ListaVacinas() {
  const [vacinas, setVacinas] = useState([]);

  useEffect(() => {
    const fetchVacinas = async () => {
      try {
        const response = await fetch('http://localhost:8080/vacina/listarVacina');
        const data = await response.json();
        setVacinas(data);
      } catch (error) {
        console.error('Erro ao obter a lista de vacinas:', error);
      }
    };

    fetchVacinas();
  }, []);

  return (
    <div>
      <h1>Lista de Vacinas</h1>
      <ul>
        {vacinas.map((vacina) => (
          <li key={vacina.idVacina}>
            ID: {vacina.idVacina}, Nome: {vacina.nomeVacina},{' '}
            Descrição: {vacina.descricao}, Idade Recomendada: {vacina.idadeRecomendada}
          </li>
        ))}
      </ul>
      <br />
      <li className={styles.button}><Link href="homeVacina" className={styles.a}>Voltar</Link></li>
    </div>
  );
}
