import styles from '../styles/Login.module.css';
import { useState } from "react";

function SignIn() {

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');

    const handleSignIn = () => {
        fetch("http://localhost:3000/auth/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify({
            email: email,
            pwd: pwd,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            //il faut récupérer le token et l'enregistrer qq part
            // et vider les champs ?
              console.log(data)
            })
      };

    return (
      <div className={styles.main}>
        <div className={styles.loginSection}>
          <h2>On se connait déjà ?</h2>
          <input
            className={styles.inputlogin}
            type="email"
            placeholder="Email"
            id="email-signin"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            className={styles.inputlogin}
            type="password"
            placeholder="Mot de passe"
            id="password-signin"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
          />
          <button
            className={styles.buttonconfirminput}
            id="signIn"
            onClick={() => handleSignIn()}
          >
            Connexion
          </button>
        </div>
      </div>
    );
   }
   
   export default SignIn;