import Link from 'next/link';
import styles from '../../styles/HomePaginas.module.css';
import '../../styles/global.css';

const HomeExercicio = () => {
  return (
    <div className={styles.div}>
      <h1 className={styles.h1}>Exercicios</h1>
      <nav className={styles.nav}>
      <h1 className={styles.h1}>Aqui você pode monitorar seus exercícios! <br /> Cadastre, atualize, delete e liste para seu próprio controle!</h1>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <Link href="cadastroExercicio" className={styles.a}>Cadastro de Exercicios</Link>
          </li>
          <li className={styles.li}>
            <Link href="atualizarExercicio" className={styles.a}>Atualização de Exercicios</Link>
          </li>
          <li className={styles.li}>
            <Link href="deletarExercicio" className={styles.a}>Deletar Exercicios</Link>
          </li>
          <li className={styles.li}>
            <Link href="listarExercicio" className={styles.a}>Listar Exercicios</Link>
          </li>
        </ul>
      </nav>
      <li className={styles.li}><Link href="../home" className={styles.a}>Voltar</Link></li>
    </div>
  );
};

export default HomeExercicio;
