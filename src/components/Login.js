import styles from '../styles/Login.module.css';
import SignIn from './SignIn';
import SignUp from './SignUp';

function Login() {
 return <body className={styles.body}>
    <header className={styles.header}>
        <h1>To-do App</h1>
    </header>
    <main className={styles.main}>
    <SignUp />
    <SignIn />
    </main>
    </body>
}

export default Login;