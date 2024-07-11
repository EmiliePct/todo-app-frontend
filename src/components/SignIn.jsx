import styles from '../styles/Login.module.css';
import { useState } from "react";
import { apiSignIn } from "@/api/users"; 
import { useDispatch } from "react-redux";
import { sign } from 'jsonwebtoken';
import { signIn } from "../reducers/user";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';




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
        if (!data.error) {
          dispatch(
            signIn({
              userId: data.userId,
              accessToken: data.accessToken,
              isConnected: true,
            })
          );
        } else {
          setError(`Login failed: ${data ? data.error : "Erreur inconnue"}`);
        }
    }

    return (
      <Box
      sx={{ width: "35%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}
>
          <h2>On se connait déjà ?</h2>
          <TextField
            type="email"
            variant="standard"
            label="Email"
            size="small"
            fullWidth
            required
            id="email-signin"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
                    <TextField
            type="password"
            variant="standard"
            label="Mot de passe"
            size="small"
            
            fullWidth
           id="password-signin"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
          />
          <Button
                            sx={{margin: "20px"}}

variant="contained"
            id="signIn"
            onClick={() => handleSignIn()}
          >
            Connexion
          </Button>
        </Box>
    );
   }
   
   export default SignIn;