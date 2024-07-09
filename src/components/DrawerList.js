import Box from '@mui/material/Box';

import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';

import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

import { useState } from "react";


export default function DrawerList() {
    
  const [openDisplayList, setOpenDisplayList] = useState(true);
  const [openDeleteList, setOpenDeleteList] = useState(false);

  const handleClickDisplayList = () => {
    setOpenDisplayList(!openDisplayList);
  };

  const handleClickDisplayDelete = () => {
    setOpenDeleteList(!openDeleteList);
  };

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
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={handleClickDisplayDelete}>
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText primary="Supprimer une liste" />
        {openDeleteList ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openDeleteList} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
