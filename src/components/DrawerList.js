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

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

import { getLists } from '../api/lists'

import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";



export default function DrawerList() {
    
  const user = useSelector(state => state.user.value)
  console.log(user)

  const [openDisplayList, setOpenDisplayList] = useState(true);
  const [openDeleteList, setOpenDeleteList] = useState(false);
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false); // État pour le chargement

  const [error, setError] = useState("");


  const handleClickDisplayList = () => {

    setOpenDisplayList(!openDisplayList);
  };

  const handleClickDisplayDelete = () => {
    setOpenDeleteList(!openDeleteList);
  };



  // console.log(listsToDisplay)

  useEffect(() => {
    getLists(user.userId, user.accessToken)
      .then((data) => {
        if (data) {
          setLists(data);
        // } else {
        //   setError(
        //     "Aucune liste trouvée."
        //   );
        // const listsToDisplay = lists.map((list) => {
        //     <Collapse in={openDisplayList} timeout="auto" unmountOnExit key={list.id}>
        //     <List component="div" disablePadding>
        //       <ListItemButton /*sx={{ pl: 4 }}*/>
        //         <ListItemText primary="test" />
        //       </ListItemButton>
        //     </List>
        //   </Collapse>
        
        //   })
        }
      })
      .catch((error) => {
        setError("Échec de la récupération des listes: " + error.message);
        console.error("Erreur API:", error);
      });
  }, []);

  const listsForDisplay = lists.map((list) => {
    return (
      <List component="div" disablePadding key={list.id}>
<ListItemButton sx={{ pl: 4 }}>
<ListItemIcon>
    <ChecklistIcon />
  </ListItemIcon>
  <ListItemText primary={list.title} />
</ListItemButton>
</List>
    )
  })

  const listsForDeletion = lists.map((list) => {
    return (
      <List component="div" disablePadding key={list.id}>
<ListItemButton sx={{ pl: 4 }}>
<ListItemIcon>
    <DeleteIcon />
  </ListItemIcon>
  <ListItemText primary={list.title} />
</ListItemButton>
</List>
    )
  })

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
    >
      <ListItemButton>
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
