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

  const formatarData = (timestamp) => {
    const data = new Date(timestamp);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <div>
      <h1>Listar Alimentos</h1>
      <ul>
        {alimentos.map((alimento) => (
          <li key={alimento.idAlimentacao}>
            {`ID: ${alimento.idAlimentacao}, Descrição: ${alimento.descricaoRefeicao}, Calorias: ${alimento.calorias}, Data: ${formatarData(
              alimento.dataRefeicao
            )}`}
          </li>
        ))}
      </ul>
      <br />
      <li className={styles.button}>
        <Link href="homeAlimentacao" className={styles.a}>
          Voltar
        </Link>
      </li>
    </div>
  );
}
