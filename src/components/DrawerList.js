import Box from '@mui/material/Box';

import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import ChecklistIcon from '@mui/icons-material/Checklist';
import VisibilityIcon from '@mui/icons-material/Visibility';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

import { getLists, displayList, createList, deleteList } from '../api/lists'

import { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ListItem } from '@mui/material';

export default function DrawerList() {
    
  const user = useSelector(state => state.user.value)

  const [openDisplayList, setOpenDisplayList] = useState(true);
  const [openDeleteList, setOpenDeleteList] = useState(false);
  const [openCreationDialog, setOpenCreationDialog] = useState(false);
  const [openDeletionDialog, setOpenDeletionDialog] = useState(false);
  const [newList, setNewList] = useState(''); // input list creation dialog
  const [listToDelete, setListToDelete] = useState();

  const [lists, setLists] = useState([]); 

  const [error, setError] = useState("");


  //Fonction pour gérer déplier/replier les sous-menus
  const handleClickDisplayList = () => {
    setOpenDisplayList(!openDisplayList);
  };

  const handleClickDisplayDelete = () => {
    setOpenDeleteList(!openDeleteList);
  };

  // Hook d'effet pour stocker les listes dans un état
  useEffect(() => {
    getLists(user.userId, user.accessToken)
      .then((data) => {
        if (data) {
          setLists(data);
        }
      })
      .catch((error) => {
        setError("Échec de la récupération des listes: " + error.message);
        console.error("Erreur API:", error);
      });
  }, [newList, openCreationDialog, openDeletionDialog]);

  const handleListDisplay = listId => {
    console.log('click affichage', listId)
    //lancer un get et vérifier si re-render de la home pour afficher le contenu
  }

  
  // ------ Map des listes à afficher dans le sous-menu de "Consulter" ------ // 
  const listsForDisplay = lists.map((list) => {
    return (
      <List component="div" disablePadding key={list.id}>
<ListItemButton sx={{ pl: 4 }} onClick={() => handleListDisplay(list.id)}>
<ListItemIcon>
    <ChecklistIcon />
  </ListItemIcon>
  <ListItemText primary={list.title} />
</ListItemButton>
</List>
    )
  })
  
  
  // ------ Modale de création de liste ------ //
  
  const handleClickOpenCreationDialog = () => {
    console.log('click ouverture')
    setOpenCreationDialog(true);
  };
  
  const handleCloseCreationDialog = () => {
    console.log('click fermeture')
    setOpenCreationDialog(false);
  };
  
  const handleSubmitCreationDialog = async (newList) => {
    const title = newList;
    setNewList('');
    createList(title, user)
    .then((data) => {
      if (data) {
        handleCloseCreationDialog();
      }
    })
    .catch((error) => {
      setError("Échec de la récupération des listes: " + error.message);
      console.error("Erreur API:", error);
    });
  };
  
  // ------ Map des listes à supprimer à afficher les listes dans le sous-menu de "Supprimer" ------ //

  const listsForDeletion = lists.map((list) => {
      return (
  <ListItemButton sx={{ pl: 4 }} key={list.id} onClick={() => handleClickOpenDeletionDialog(list.id)}>
  <ListItemIcon>
      <DeleteIcon />
    </ListItemIcon>
    <ListItemText primary={list.title} />
  </ListItemButton>
      )
    })

  // ------ Modale de suppression de liste ------ //

  const handleClickOpenDeletionDialog = (listId) => {
    console.log('click poubelle ouverture modale', listId)
    setListToDelete(listId)
    setOpenDeletionDialog(true);
  };

  const handleCloseDeletionDialog = () => {
    console.log('click fermeture')
    setListToDelete('')
    setOpenDeletionDialog(false);
  };

  const handleClickConfirmDeletion = () => {
    console.log('click poubelle', listToDelete)
    //api avec listToDelete et re-render ?
    deleteList(listToDelete, user)
    .then((data) => {
      if (data) {
        handleCloseDeletionDialog();
      }
    })
    .catch((error) => {
      setError("Échec de la récupération des listes: " + error.message);
      console.error("Erreur API:", error);
    });
  };
  

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
    >
      <Dialog
      open={openCreationDialog}
        onClose={handleCloseCreationDialog}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            setNewList(event.currentTarget)
            handleSubmitCreationDialog(newList)

          }
        }}
      >
        <DialogTitle>Créer une nouvelle liste</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Veuillez saisir le nom de votre nouvelle liste de tâches. Ce nom doit être unique parmi vos listes.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="listName"
            name="listName"
            label="Nom de la nouvelle liste"
            type="texte"
            fullWidth
            variant="standard"
            onChange={(e) => setNewList(e.target.value)}
            value={newList}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreationDialog}>Annuler</Button>
          <Button type="submit">Créer</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDeletionDialog}
        onClose={handleCloseCreationDialog}
        aria-labelledby="alert-dialog-deletion"      >
        <DialogTitle id="alert-dialog-title">
          {"Voulez-vous vraiment supprimer la liste ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            La liste que vous tentez de supprimer contient peut-être des tâches. Si vous supprimez cette liste, vous supprimerez également les tâches qu'elle contient.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeletionDialog}>Annuler</Button>
          <Button onClick={handleClickConfirmDeletion} autoFocus>
            Supprimer la liste et les tâches associées
          </Button>
        </DialogActions>
      </Dialog>
      <ListItemButton onClick={handleClickOpenCreationDialog}>

      
        <ListItemIcon>
          <CreateNewFolderIcon />
        </ListItemIcon>
        <ListItemText primary="Créer une liste" />
      </ListItemButton>
      <ListItemButton onClick={handleClickDisplayList}>
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary="Consulter une liste" />
        {openDisplayList ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={openDisplayList} timeout="auto" unmountOnExit>
        {listsForDisplay}
      </Collapse>
      <ListItemButton onClick={handleClickDisplayDelete}>
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText primary="Supprimer une liste" />
        {openDeleteList ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openDeleteList} timeout="auto" unmountOnExit>
      {listsForDeletion}
      </Collapse>
    </List>
  );
}