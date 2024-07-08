import styles from '../styles/Login.module.css';
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const PWD_REGEX = /^.{8,24}$/; // Vérifie que le mot de passe contient entre 8 et 24 caractères
//Rajouter regex pour vérifier adresse email ?

function SignUp() {

    const [first_name, setFirst_name] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [matchEmail, setMatchEmail] = useState(''); // deuxième champ de saisie de l'email
    const [pwd, setPwd] = useState('');
    const [matchPwd, setMatchPwd] = useState(''); // deuxième champ de saisie du mdp
    const [validPwd, setValidPwd] = useState(false); // Vérifie que le mdp est conforme à la regex
    const [validMatch, setValidMatch] = useState(false); // Vérifie correspondance de l'ensemble des inputs de confirmation
    const [userHasRegistered, setUserHasRegistered] = useState(false);
    // const [errMsg, setErrMsg] = useState(''); 

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        setValidMatch(email === matchEmail && matchEmail && pwd === matchPwd && matchPwd); // les deux champs de confirmation sont remplis et identique au premier champ
    }, [email, matchEmail, pwd, matchPwd])

    // useEffect(() => {
    //     setErrMsg('');
    // }, [email,matchEmail, pwd, matchPwd])

    // Mettre un message de succès comme quoi il peut se connecter ?

    const handleSignUp = () => {
        console.log(            {first_name: first_name,
            surname: surname,
            email: email,
            pwd: pwd});
        fetch("http://localhost:3000/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify({
            first_name: first_name,
            surname: surname,
            email: email,
            pwd: pwd,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
            });

            setUserHasRegistered(true);
      };

      if (userHasRegistered === false) {
        return (
              <div className={styles.loginSection}>
                          <h2>Créer un compte</h2>

              <input
                  className={styles.inputlogin}
                  type="text"
                  placeholder="Prénom"
                  id="first_name"
                  onChange={(e) => setFirst_name(e.target.value)}
                  value={first_name}
                  required
                />
              <input
                  className={styles.inputlogin}
                  type="text"
                  placeholder="Nom"
                  id="surname"
                  onChange={(e) => setSurname(e.target.value)}
                  value={surname}
                  required
                />
                <input
                  className={styles.inputlogin}
                  type="text"
                  placeholder="Email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
                <input
                  className={styles.inputlogin}
                  type="text"
                  placeholder="Confirmer l'email"
                  id="email-confirmation"
                  onChange={(e) => setMatchEmail(e.target.value)}
                  value={matchEmail}
                  required
                />
                /* à simplifier en ternaire si possible */
                          {matchEmail && email === matchEmail && <div className={styles.warningMsg}><p>Adresses email identiques</p><FontAwesomeIcon icon={faCheck} className={styles.valid}/></div>}
                          {matchEmail && email !== matchEmail && <div className={styles.warningMsg}><p>Veuillez saisir la même adresse email</p><FontAwesomeIcon icon={faTimes} className={styles.invalid}/></div>}
                <input
                  className={styles.inputlogin}
                  type="password"
                  placeholder="Mot de passe"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                />
                  <input
                  className={styles.inputlogin}
                  type="password"
                  placeholder="Confirmer le mot de passe"
                  id="password-confirmation"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  required
                />
                {matchPwd && pwd === matchPwd && <p className={styles.warningMsg}>Mots de passe identiques<FontAwesomeIcon icon={faCheck} className={styles.valid}/></p>}
                {matchPwd && pwd !== matchPwd && <p className={styles.warningMsg}>Veuillez saisir le même mot de passe<FontAwesomeIcon icon={faTimes} className={styles.invalid}/></p>}
                {pwd && !validPwd && <p className={styles.warningMsg}>Le mot de passe ne doit pas contenir de caractère spécial et doit avoir entre 8 et 24 caractères.<FontAwesomeIcon icon={faInfoCircle} className={styles.info}/></p>}
      
                {/* {errMsg && <p>{errMsg}</p>} */}
                
                <button
                  className={styles.buttonconfirminput}
                  id="signUp"
                  disabled={!validMatch || !validPwd ? true : false} // le bouton est inactif si les deux champs de confirmation ne sont pas OK et si le mdp ne respecte pas le test regex
                  onClick={() => handleSignUp()}
                >
                  S'enregistrer
                </button>
              </div>
          );

      } else {
        return (
        <div className={styles.loginSection}>
            <p>Bravo vous avez créé votre compte ! Vous pouvez maintenant vous connecter.</p>
        </div>
        )
      }
   }
   
   export default SignUp;