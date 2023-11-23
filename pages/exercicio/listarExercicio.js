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

  const formatarData = (timestamp) => {
    const data = new Date(timestamp);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <div>
      <h1>Listar Exercicios</h1>
      <ul>
        {exercicios.map((exercicio) => (
          <li key={exercicio.idExercicio}>
            {`ID: ${exercicio.idExercicio}, ID Paciente: ${exercicio.idPaciente}, Data Exercicio: ${formatarData(
              exercicio.dataExercicio
            )}, Tipo Exercicio: ${exercicio.tipoExercicio}, Duração em minutos: ${exercicio.duracaoEmMinutos}`}
          </li>
        ))}
      </ul>
      <br />
      <li className={styles.button}>
        <Link href="homeExercicio" className={styles.a}>
          Voltar
        </Link>
      </li>
    </div>
  );
}
