import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../../styles/Forms.module.css';

export default function ListarProblemas() {
  const [problemas, setProblemas] = useState([]);

  useEffect(() => {
    const fetchProblemas = async () => {
      try {
        const response = await fetch('http://localhost:8080/problemas-saude/listar');
        const data = await response.json();
        setProblemas(data);
      } catch (error) {
        console.error('Erro ao buscar dados do servidor:', error);
      }
    };

    fetchProblemas();
  }, []);

  return (
    <div>
      <h1>Listar Problemas de Saúde</h1>
      <ul>
        {problemas.map((problema) => (
          <li key={problema.idProblema}>
            {`ID: ${problema.idProblema}, Nome Problema: ${problema.nomeProblema}, Descrição: ${problema.descricao}`}
          </li>
        ))}
      </ul>
      <br />
      <li className={styles.button}><Link href="homeProblemaSaude" className={styles.a}>Voltar</Link></li>
    </div>
  );
}
