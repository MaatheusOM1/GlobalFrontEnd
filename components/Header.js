import React from 'react';
import Link from 'next/link';
import '../styles/Header.scss';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="alimentacao/homeAlimentacao">Alimentações</Link>
        </li>
        <li>
          <Link href="consulta/homeConsulta">Consultas</Link>
        </li>
        <li>
          <Link href="doencaTransmissivel/homeDoencaTransmissivel">Doenças Transmissíveis</Link>
        </li>
        <li>
          <Link href="exercicio/homeExercicio">Exercícios</Link>
        </li>
        <li>
          <Link href="crianca/homeCrianca">Filhos</Link>
        </li>
        <li>
          <Link href="problemaSaude/homeProblemaSaude">Problemas de Saúde</Link>
        </li>
        <li>
          <Link href="vacina/homeVacina">Vacinas</Link>
        </li>
        <li>
          <Link href="cadastroMedico">Médicos</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
