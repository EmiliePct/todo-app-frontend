import styles from '../styles/Login.module.css';
import { useState } from "react";
import { apiSignIn } from "@/api/users"; 
import { useDispatch } from "react-redux";
import { sign } from 'jsonwebtoken';
import { signIn } from "../reducers/user";




function SignIn() {

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [error, setError] = useState("");


    const dispatch = useDispatch();


    const handleSignIn = async () => {
      if (!email || !pwd) {
        setError("L'email et le mot de passe sont obligatoires.");
        return;
      }
      const data = await apiSignIn(email, pwd);
        if (data) {
          dispatch(signIn({
            userId: data.userId,
            accessToken: data.accessToken,
            isConnected: true,
          }));
        } else {
          setError(`Login failed: ${data ? data.error : "Erreur inconnue"}`);
        }
    }

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