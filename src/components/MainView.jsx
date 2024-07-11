import Box from '@mui/material/Box';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

import { displayTasks, createTask } from '../api/tasks';
import TaskItemList from './TaskItemList';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import displaying from '@/reducers/displaying';

export default function MainView() {
    const user = useSelector(state => state.user.value)
    const displaying = useSelector(state => state.displaying.value)

    const [tasks, setTasks] = useState([]); 
    const [error, setError] = useState("");
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskDeadline, settaskDeadline] = useState();
    const [changesCount, setChangesCount] = useState(0)

    const updateMade = () => (
        setChangesCount(changesCount+1)
    )

    // ------ Hook d'effet pour stocker les tâches dans un état ------ // 
    useEffect(() => {
        displayTasks(displaying.listId, user.accessToken)
            .then((data) => {
            if (!data.error) {
                setTasks(data);
            }
            })
            .catch((error) => {
            setError("Échec de la récupération des listes: " + error.message);
            console.error("Erreur API:", error);
            });
        }, [displaying.listId, changesCount]);
        
    const handleSubmit = async () => {
        if (!taskTitle || !taskDeadline) {
            setError("Le nom et la date sont obligatoires.");
            return;
        }
        const data = await createTask(taskTitle, taskDescription, taskDeadline, user, displaying.listId);
            if (!data.error) {
                setChangesCount(changesCount+1);
            } else {
            setError(`${data ? data.error : "Erreur inconnue"}`);
            }
        }

// ------ Filtre les tâches à afficher en fonction du statut ------ // 
const getCompletedTasks = tasks.filter(task => task.is_done);
const getUncompletedTasks = tasks.filter(task => !task.is_done);

const displayUnCompletedTasks = getUncompletedTasks.map((task)  => {
    return (
        <AccordionDetails>
            <TaskItemList title={task.title} key={task.id} id={task.id} isCompleted={false} updateMade={updateMade} />
        </AccordionDetails>
      
    )
  })

  const displayCompletedTasks = getCompletedTasks.map((task)  => {
    return (
        <AccordionDetails>
            <TaskItemList title={task.title} key={task.id} id={task.id} isCompleted={true} updateMade={updateMade}/>
        </AccordionDetails>
    )
  })


    return (
      <Container   
        maxWidth="90vh" 
        sx={{ 
            display: "flex",
            flexDirection: "column",
            alignItems:"flex-start",
            justifyContent:"center",
            paddingTop:"65px" }}>
        <Box       
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{ bgcolor: "#fff", height: "auto", width:"100%", padding:"20px"}}>
            <Box
              display="flex"
              alignItems="flex-start"
              flexDirection="column"
              sx={{ bgcolor: "#fff", height: "100%", width:"45%"}}
              >
                <TextField
                    required
                    id="taskname-required"
                    label="Nom de la nouvelle tâche"
                    variant="outlined"
                    sx={{ marginBottom: "10px"}}
                    fullWidth
                    size="small"
                    onChange={(e) => setTaskTitle(e.target.value)}
                    value={taskTitle}
                />
                <TextField
                    id="taskdescription-input"
                    label="Description de la nouvelle tâche"
                    variant="outlined"
                    multiline
                    rows={2}
                    size="small"
                    margin="0"
                    fullWidth
                    onChange={(e) => setTaskDescription(e.target.value)}
                    value={taskDescription}
                />
            </Box>
            <Box
              sx={{ height: "100%", width:"45%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "space-between"}}>
                <DesktopDatePicker
                label={"Echéance*"}
                disablePast
                onChange={settaskDeadline}
                value={taskDeadline }
              />
              <Button variant="contained" sx={{ margin: "20px"}} onClick={() => handleSubmit()} >Créer</Button>
            </Box>
        </Box>
        <Divider 
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            backgroundColor: 'background.paper',
            width: '100%',
          }

          }/>
        <Box       
          display="flex"
          flexDirection="column"
          alignItems="space-between"
          sx={{ height: "auto", width:"100%", padding:"20px"}}>
            <Accordion defaultExpanded sx={{ bgcolor: '#E9EDEF'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>Tâches à réaliser</Typography>
        </AccordionSummary>
        <AccordionDetails>
        {displayUnCompletedTasks}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>Tâches réalisées</Typography>
        </AccordionSummary>
        <AccordionDetails>
        {displayCompletedTasks}
        </AccordionDetails>
      </Accordion>
        </Box>
      </Container>
);
  }