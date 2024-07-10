import Box from '@mui/material/Box';
import React, { Fragment } from "react"

import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { displaySingleTask, deleteTask } from '../api/tasks';

import Button from '@mui/material/Button';

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';


export default function DetailedView(props) {

    const user = useSelector(state => state.user.value)
    const displaying = useSelector(state => state.displaying.value)

    const [task, setTask] = useState('')
    const [openDeletionDialog, setOpenDeletionDialog] = useState(false);
    const [ taskToDelete, setTaskToDelete] = useState();

    const [error, setError] = useState("");



    // ------ Hook d'effet pour stocker les infos de la tâche dans un état ------ // 

    useEffect(() => {
        console.log("rentré dans useeffect")

        displaySingleTask(displaying.taskId, user.accessToken)
            .then((data) => {
            if (data) {
                setTask(data);
                setTaskToDelete(data.id);
                console.log('data recue',data)
            }
            })
            .catch((error) => {
            setError("Échec de la récupération de la tâche: " + error.message);
            console.error("Erreur API:", error);
            });
        }, []);

  // ------ Modale de suppression de tâche ------ //

  const handleClickOpenDeletionDialog = () => {
    setOpenDeletionDialog(!openDeletionDialog);
  };

  const handleCloseDeletionDialog = () => {
    setTaskToDelete('');
    setOpenDeletionDialog(false);
  };

  const handleClickConfirmDeletion = () => {
    console.log('click poubelle', displaying)
    deleteTask(taskToDelete, user)
    .then((data) => {
      if (data) {
        handleCloseDeletionDialog();
      }
    })
    .catch((error) => {
      setError("Échec dans la suppression de la tâche " + error.message);
      console.error("Erreur API:", error);
    });
  };
          return (
            <Box>
                {task.title}, {task.description}, {task.deadline}
                <Tooltip title="Delete">
                <IconButton>
                    <DeleteIcon onClick={() => handleClickOpenDeletionDialog()}/>
                </IconButton>
                </Tooltip>
                <Dialog
        open={openDeletionDialog}
        onClose={handleCloseDeletionDialog}
        aria-labelledby="alert-dialog-deletion"      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Voulez-vous vraiment supprimer la tâche ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseDeletionDialog()}>Annuler</Button>
          <Button onClick={() => handleClickConfirmDeletion()} autoFocus>
            Supprimer la tâche
          </Button>
        </DialogActions>
      </Dialog>
            </Box>
          );
        }
