import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';

import { updateCompletionTask, updateUnCompletionTask } from '../api/tasks'
import { useDispatch, useSelector } from 'react-redux';
import { displayingTask } from '../reducers/displaying';
import React, { Fragment } from "react"
import DetailedView from './DetailedView';


import { useState } from 'react';



function TaskItemList(props) {

    const user = useSelector(state => state.user.value)
    const displaying = useSelector(state => state.displaying.value)
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    let button = '';

      // ------ Affichage de la right sidebar ------ // 
      const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      });
    
     const toggleDrawer = (anchor, open, id) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }

        handleViewMore(id)
        setState({ ...state, [anchor]: open });
      };

    // ------ Gestion des changements de statut fait/pas fait pour la tâche ------ // 

    const handleTaskUnCompleted = async (id) => {
        const data = await updateUnCompletionTask(id, user);
            if (!data.error) {
            props.updateMade();
            } else {
            setError(`${data ? data.error : "Erreur inconnue"}`);
            }
    }

    const handleTaskCompleted = async (id) => {
      const data = await updateCompletionTask(id, user);
      if (!data.error) {
        props.updateMade();
      } else {
        setError(`${data ? data.error : "Erreur inconnue"}`);
      }
    }

    // ------ Affichage des boutons pour changer le statut de la tâche ------ // 

    if (props.isCompleted) {
        button = (
            <Button 
            variant="outlined" 
        color="error"
        size="small"
        onClick={() => handleTaskUnCompleted(props.id)}
            >Marquer comme non réalisée
            </Button>
        )
    } else {
        button = (
            <Button 
            variant="contained" 
        color="success"
        size="small"
        onClick={() => handleTaskCompleted(props.id)}
            >Marquer comme réalisée
            </Button>
        )
    }

    const handleViewMore = async (taskId) => {
      dispatch(displayingTask({ taskId }));
  }

 return (
    <Box
    maxWidth="90vh" 
        sx={{ 
            display: "flex",
            flexDirection: "row",
            alignItems:"flex-start",
            justifyContent:"space-between",
            }}>
        {button}
        <Box>{props.title}</Box>
        <Box>{props.deadline}</Box>
        <Fragment key='right'>
          <Button onClick={toggleDrawer('right', true, props.id)}>En voir +</Button>
          <Drawer
            anchor='right'
            size="md"
            open={state['right']}
            onClose={toggleDrawer('right', false)}
          >
            <Box
      sx={{ width: 'right' === 'top' || 'right' === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer('right', false)}
      onKeyDown={toggleDrawer('right', false)}
            >
</Box>
<DetailedView />

          </Drawer>
          </Fragment>

    </Box>

 )
}

export default TaskItemList;