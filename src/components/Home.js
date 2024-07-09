// import styles from '../styles/Home.module.css';
// import { useDispatch, useSelector } from "react-redux";

// import { signOut } from "../reducers/user";
// import { Drawer, AppBar, Icon, IconButton, MenuIcon } from '@mui/material';


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
import { AppBar } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';

import { useState } from "react";


export default function TemporaryDrawer() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar>
      <header>      <Button onClick={toggleDrawer(true)}><MenuIcon color="secondary"></MenuIcon></Button><span>To-do App</span></header>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </AppBar>
  );
}

// function Home() {

//   const dispatch = useDispatch();


//   const handleSignOut = () => {
//     dispatch(signOut());
//   };


//   return (
//     <body>
//       <p>c'est la page home</p>
//       <AppBar>
//         {/* <IconButton color="secondary" aria-label="open menu">
//           <MenuIcon />
//         </IconButton> */}
//         <p>c'est l'AppBar</p>
//       </AppBar>
//       <Drawer>
//         <p>c'est le Drawer</p>
//       </Drawer>
//       <button
//         className={styles.buttonconfirminput}
//         id="signOut"
//         onClick={() => handleSignOut()}
//       >
//         Déconnexion
//       </button>
//     </body>
//   );
// }

// export default Home;
