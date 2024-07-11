import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import React, { Fragment } from "react"
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import moment from 'moment';

import { displaySingleTask, deleteTask } from '../api/tasks';

import { useRouter } from "next/router";

export default function DetailedView(props) {
  const user = useSelector((state) => state.user.value);
  const displaying = useSelector((state) => state.displaying.value);

  const [task, setTask] = useState("");
  const [openDeletionDialog, setOpenDeletionDialog] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState();

  const [error, setError] = useState("");
  const router = useRouter();

  // ------ Hook d'effet pour stocker les infos de la tâche dans un état ------ //

  useEffect(() => {
    displaySingleTask(displaying.taskId, user.accessToken)
      .then((data) => {
        if (!data.error) {
          setTask(data);
          setTaskToDelete(data.id);        }
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
    setTaskToDelete("");
    setOpenDeletionDialog(false);
  };

  const handleClickConfirmDeletion = () => {
    deleteTask(taskToDelete, user)
      .then((data) => {
        if (!data.error) {
          handleCloseDeletionDialog();
          router.reload();
        }
      })
      .catch((error) => {
        setError("Échec dans la suppression de la tâche " + error.message);
        console.error("Erreur API:", error);
      });
  };

  // ------ Formatage des dates ------ // 

  const convertedTaskDeadline = moment(task.deadline).format("L");
  const convertedTaskCreationDate = moment(task.createdAt).format("L");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", margin: "30px" }}>
      <Box sx={{ marginTop: "30px" }}>
        Nom de la tâche :<br />
        {task.title}
      </Box>
      <Box sx={{ marginTop: "30px" }}>
        Description de la tâche :<br />
        {task.description}
      </Box>
      <Box sx={{ marginTop: "30px" }}>
        Echéance :<br />
        {convertedTaskDeadline}
      </Box>
      <Box sx={{ marginTop: "30px" }}>
        Tâche créée le :<br />
        {convertedTaskCreationDate}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", margin: "30px" }}>
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon onClick={() => handleClickOpenDeletionDialog()} />
          </IconButton>
        </Tooltip>
      </Box>
      <Dialog
        open={openDeletionDialog}
        onClose={handleCloseDeletionDialog}
        aria-labelledby="alert-dialog-deletion"
      >
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