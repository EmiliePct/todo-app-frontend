import Box from '@mui/material/Box';
import React, { Fragment } from "react"

import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { displayingTask } from '../reducers/displaying';

import { displaySingleTask } from '../api/tasks';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';


export default function DetailedView() {

    const user = useSelector(state => state.user.value)
    const displaying = useSelector(state => state.displaying.value)

    const [task, setTask] = useState('')


    // ------ Hook d'effet pour stocker les infos de la tâche dans un état ------ // 

    useEffect(() => {
        console.log("rentré dans useeffect")

        displaySingleTask(displaying.taskId, user.accessToken)
            .then((data) => {
            if (data) {
                setTask(data);
                console.log('data recue',data)
            }
            })
            .catch((error) => {
            setError("Échec de la récupération de la tâche: " + error.message);
            console.error("Erreur API:", error);
            });
        }, [displaying.taskId]);

          return (
            <Box>
                {task.title}, {task.description}, {task.deadline}
            </Box>
          );
        }
