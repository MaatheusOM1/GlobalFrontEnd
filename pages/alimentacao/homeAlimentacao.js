import Link from 'next/link';
import styles from '../../styles/HomePaginas.module.css';
import '../../styles/global.css';

const HomeAlimentacao = () => {
  return (
    <div className={styles.div}>
      <h1 className={styles.h1}>Alimentação</h1>
      <nav className={styles.nav}>
        <h1 className={styles.h1}>Aqui você pode monitorar suas alimentações! <br /> Cadastre, atualize, delete e liste para seu próprio controle!</h1>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <Link href="cadastroAlimentacao" className={styles.a}>Cadastro de Alimentações</Link>
          </li>
          <li className={styles.li}>
            <Link href="atualizarAlimentacao" className={styles.a}>Atualização de Alimentações</Link>
          </li>
          <li className={styles.li}>
            <Link href="deletarAlimentacao" className={styles.a}>Deletar Alimentações</Link>
          </li>
          <li className={styles.li}>
            <Link href="listarAlimentacao" className={styles.a}>Listar Alimentações</Link>
          </li>
        </ul>
      </nav>
      <li className={styles.li}><Link href="../home" className={styles.a}>Voltar</Link></li>
    </div>
  );
};

export default HomeAlimentacao;
