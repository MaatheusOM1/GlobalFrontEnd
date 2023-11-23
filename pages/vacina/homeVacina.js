import Link from 'next/link';
import styles from '../../styles/HomePaginas.module.css';
import '../../styles/global.css';

const HomeVacina = () => {
  return (
    <div className={styles.div}>
      <h1 className={styles.h1}>Vacinas</h1>
      <nav className={styles.nav}>
        <h1 className={styles.h1}>Aqui você pode monitorar suas vacinas! <br /> Cadastre, atualize, delete e liste para seu próprio controle!</h1>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <Link href="cadastroVacina" className={styles.a}>Cadastro de Vacinas</Link>
          </li>
          <li className={styles.li}>
            <Link href="atualizarVacina" className={styles.a}>Atualização de Vacinas</Link>
          </li>
          <li className={styles.li}>
            <Link href="deletarVacina" className={styles.a}>Deletar Vacinas</Link>
          </li>
          <li className={styles.li}>
            <Link href="listarVacina" className={styles.a}>Listar Vacinas</Link>
          </li>
        </ul>
      </nav>
      <li className={styles.li}><Link href="../home" className={styles.a}>Voltar</Link></li>
    </div>
  );
};

export default HomeVacina;
