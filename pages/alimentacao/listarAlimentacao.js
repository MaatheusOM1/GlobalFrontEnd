import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../../styles/Forms.module.css';

export default function ListarAlimentos() {
  const [alimentos, setAlimentos] = useState([]);

  const obterAlimentos = async () => {
    try {
      const response = await fetch('http://localhost:8080/alimentacao/listarTodos');

      if (response.ok) {
        const data = await response.json();
        setAlimentos(data);
      } else {
        console.error('Erro ao obter a lista de alimentos');
      }
    } catch (error) {
      console.error('Erro ao enviar dados para o servidor:', error);
      alert('Erro ao obter a lista de alimentos');
    }
  };

  useEffect(() => {
    obterAlimentos();
  }, []);

  return (
    <div>
      <h1>Listar Alimentos</h1>
      <ul>
        {alimentos.map((alimento) => (
          <li key={alimento.idAlimentacao}>
            {`ID: ${alimento.idAlimentacao}, Descrição: ${alimento.descricaoRefeicao}, Calorias: ${alimento.calorias}`}
          </li>
        ))}
      </ul>
      <br />
      <li className={styles.button}><Link href="homeAlimentacao" className={styles.a}>Voltar</Link></li>
    </div>
  );
}
