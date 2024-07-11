import styles from '../styles/Login.module.css';
import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { apiSignUp } from "../api/users";



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

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        setValidMatch(email === matchEmail && matchEmail && pwd === matchPwd && matchPwd); // les deux champs de confirmation sont remplis et identique au premier champ
    }, [email, matchEmail, pwd, matchPwd])

    const handleSignUp = async () => {
      const data = await apiSignUp(first_name,
        surname,
        email,
        pwd);
      if (!data.error || !data.message) {
        setUserHasRegistered(true);

      } else {
        setError(`Sign up failed: ${data ? data.error : "Erreur inconnue"}`);
      }

      };

      if (userHasRegistered === false) {
        return (
          <Box
            sx={{
              width: "35%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2>Créer un compte</h2>

            <TextField
              type="text"
              variant="standard"
              label="Prénom"
              size="small"
              required
              id="first_name"
              fullWidth
              onChange={(e) => setFirst_name(e.target.value)}
              value={first_name}
            />
            <TextField
              type="text"
              variant="standard"
              label="Nom"
              size="small"
              required
              fullWidth
              id="surname"
              onChange={(e) => setSurname(e.target.value)}
              value={surname}
            />
            <TextField
              type="text"
              variant="standard"
              label="Email"
              size="small"
              fullWidth
              required
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <TextField
              type="text"
              variant="standard"
              label="Confirmer l'email"
              size="small"
              required
              fullWidth
              id="email-confirmation"
              onChange={(e) => setMatchEmail(e.target.value)}
              value={matchEmail}
            />
            {matchEmail && email === matchEmail && (
              <div className={styles.warningMsg}>
                <p>Adresses email identiques</p>
                <FontAwesomeIcon icon={faCheck} className={styles.valid} />
              </div>
            )}
            {matchEmail && email !== matchEmail && (
              <div className={styles.warningMsg}>
                <p>Veuillez saisir la même adresse email</p>
                <FontAwesomeIcon icon={faTimes} className={styles.invalid} />
              </div>
            )}
            <TextField
              type="password"
              variant="standard"
              label="Mot de passe"
              size="small"
              fullWidth
              required
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
            />
            <TextField
              type="password"
              variant="standard"
              label="Confirmer le mot de passe"
              size="small"
              fullWidth
              required
              id="password-confirmation"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
            />
            {matchPwd && pwd === matchPwd && (
              <p className={styles.warningMsg}>
                Mots de passe identiques
                <FontAwesomeIcon icon={faCheck} className={styles.valid} />
              </p>
            )}
            {matchPwd && pwd !== matchPwd && (
              <p className={styles.warningMsg}>
                Veuillez saisir le même mot de passe
                <FontAwesomeIcon icon={faTimes} className={styles.invalid} />
              </p>
            )}
            {pwd && !validPwd && (
              <p className={styles.warningMsg}>
                Le mot de passe ne doit pas contenir de caractère spécial et
                doit avoir entre 8 et 24 caractères.
                <FontAwesomeIcon icon={faInfoCircle} className={styles.info} />
              </p>
            )}

            <Button
              variant="contained"
              id="signUp"
              sx={{ margin: "20px" }}
              disabled={!validMatch || !validPwd ? true : false} // le bouton est inactif si les deux champs de confirmation ne sont pas OK et si le mdp ne respecte pas le test regex
              onClick={() => handleSignUp()}
            >
              S'enregistrer
            </Button>
          </Box>
        );

      } else {
        return (
        <Box
        sx={{   width: "35%"}}>
            <p>Bravo vous avez créé votre compte ! Vous pouvez maintenant vous connecter.</p>
        </Box>
        )
      }
   }
   
   export default SignUp;