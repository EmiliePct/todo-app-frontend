import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { updateCompletionTask, updateUnCompletionTask } from '../api/tasks'
import { useSelector } from "react-redux";
import { useState } from 'react';



function TaskItemList(props) {

    const user = useSelector(state => state.user.value)
    const [error, setError] = useState("");
    const [changesCount, setChangesCount] = useState(0)



    //Couleur de fond différente (à gérer dnas le composant au dessus)
    //dans une box
// une icone fait ou pas fait
//Task Title
//Task Deadline
//Bouton en voir Plus
// Buton marquer comme réalisée (color success / color error)

    let button = '';


    const handleTaskUnCompleted = async (id) => {
        const data = await updateUnCompletionTask(id, user);
            if (data) {
            console.log(data)
            } else {
            setError(`${data ? data.error : "Erreur inconnue"}`);
            }
    }

    const handleTaskCompleted = async (id) => {
        const data = await updateCompletionTask(id, user);
            if (data) {
            console.log(data)
            } else {
            setError(`${data ? data.error : "Erreur inconnue"}`);
            }
    }

    console.log(props)
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
        <Button 
        variant="outlined" 
      color="secondary"
      size="small"

        >En voir +
        </Button>
    </Box>

 )
}

export default TaskItemList;