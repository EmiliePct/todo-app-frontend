import styles from '../styles/Home.module.css';
import { useDispatch, useSelector } from "react-redux";

import { signOut } from "../reducers/user";



// par défaut : affiche texte qu'il n'y a rien à voir.
/* 

icone de menu 
- composant left sidebar si icone dépliée
qui contiendra lui même :
  - bouton de création de liste (ou champ de nom +icone ?)
  - composant list-item-menu autant de fois qu'il y a de listes avec deux icones voir et suppression
- main content avec :
  - par défaut : affiche texte qu'il n'y a rien à voir.
  - sinon composant 'task item overview' (en deux catégories ?)
- right sidebar sous forme de composant 

*/

function Home() {

  const dispatch = useDispatch();


  const handleSignOut = () => {
    dispatch(signOut());
  };


  return (
<body>
<p>c'est la page home</p>
<button
            className={styles.buttonconfirminput}
            id="signOut"
            onClick={() => handleSignOut()}
          >
            Déconnexion
          </button>
</body>
  );
}

export default Home;
