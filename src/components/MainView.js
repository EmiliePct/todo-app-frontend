import styles from '../styles/MainView.module.css';

import Box from '@mui/material/Box';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';



import { displayTasks } from '../api/tasks';


import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import displaying from '@/reducers/displaying';

//Il faut un texte par défaut
//Les états pour stocker informations de la nouvelle tâche
//2 accordéons, un plié l'autre non
//et le drawer (autre composant ?)





export default function MainView() {
    const user = useSelector(state => state.user.value)
    const displaying = useSelector(state => state.displaying.value)

    const [tasks, setTasks] = useState([]); 
    const [error, setError] = useState("");
    const [date, setDate] = useState();


    console.log('je vais afficher', displaying.listId)

    // ------ Hook d'effet pour stocker les tâches dans un état ------ // 
    useEffect(() => {
        displayTasks(displaying.listId, user.accessToken)
            .then((data) => {
            if (data) {
                setTasks(data);
            }
            })
            .catch((error) => {
            setError("Échec de la récupération des listes: " + error.message);
            console.error("Erreur API:", error);
            });
        }, [/*newList, openCreationDialog, openDeletionDialog*/]);
        
        console.log(tasks)
  
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
          sx={{ bgcolor: "#cfe8fc", height: "auto", width:"100%", padding:"20px"}}>
            <Box
              display="flex"
              alignItems="flex-start"
              flexDirection="column"
              sx={{ bgcolor: "#cfe8fc", height: "100%", width:"45%"}}
              >
                <TextField
                    required
                    id="taskname-required"
                    label="Nom de la nouvelle tâche"
                    variant="filled"
                    sx={{ marginBottom: "10px"}}
                    fullWidth
                    size="small"
                />
                <TextField
                    required
                    id="taskdescription-input"
                    label="Description de la nouvelle tâche"
                    variant="filled"
                    multiline
                    rows={2}
                    size="small"
                    margin="0"
                    fullWidth
                />
            </Box>
            <Box
            //   display="flex"
            //   flexDirection="column"
            //   alignItems="space-between"
              sx={{ bgcolor: "#cfe8fc", height: "100%", width:"45%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "space-between"}}>
                <DesktopDatePicker
                label={"JJ/MM/AA"}
                disablePast
                onChange={setDate}
                value={date}

                // styles
                // sx={{
                //   input: { color: "#fff" },
                //   border: "1px solid #3F88C5",
                //   borderRadius: "16px",
                //   openPickerIcon: { color: "#fff" },
                // }}
              />
              <Button variant="contained" sx={{ margin: "20px"}}>Créer</Button>
                

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
          alignItems="center"
          sx={{ bgcolor: '#cfe8ac', height: "auto", width:"100%", padding:"20px"}}>
          Je montre les tâches de la liste
        </Box>
      </Container>
);
  }