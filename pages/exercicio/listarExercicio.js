import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../../styles/Forms.module.css';

export default function ListarExercicios() {
  const [exercicios, setExercicios] = useState([]);

  useEffect(() => {
    const fetchExercicios = async () => {
      try {
        const response = await fetch('http://localhost:8080/exercicios/listar');
        const data = await response.json();
        setExercicios(data);
      } catch (error) {
        console.error('Erro ao buscar dados do servidor:', error);
      }
    };

    fetchExercicios();
  }, []);

  return (
    <div>
      <h1>Listar Exercicios</h1>
      <ul>
        {exercicios.map((exercicio) => (
          <li key={exercicio.idExercicio}>
            {`ID: ${exercicio.idExercicio}, ID Paciente: ${exercicio.idPaciente}, Data Exercicio: ${exercicio.dataExercicio}, Tipo Exercicio: ${exercicio.tipoExercicio}, Duração em minutos: ${exercicio.duracaoEmMinutos}`}
          </li>
        ))}
      </ul>
      <br />
      <li className={styles.button}><Link href="homeExercicio" className={styles.a}>Voltar</Link></li>
    </div>
  );
}
