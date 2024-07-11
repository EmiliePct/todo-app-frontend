import styles from '../styles/Login.module.css';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';


import SignIn from './SignIn';
import SignUp from './SignUp';


function Login() {
 return (
   <body className={styles.body}>
     <header className={styles.header}>
       <h1>To-do App</h1>
     </header>
     <Container
       sx={{
         height: "100%",
         width: "90%",
         display: "flex",
         flexDirection: "row",
         justifyContent: "space-around",
         alignItems: "center",
       }}
     >
       <SignUp />
       <SignIn />
     </Container>
   </body>
 );
}

export default Login;