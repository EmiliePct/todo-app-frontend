import styles from '../styles/MainView.module.css';

import Box from '@mui/material/Box';
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';

import Container from '@mui/material/Container';

//Il faut un texte par défaut
//Les états pour stocker informations de la nouvelle tâche
//2 accordéons, un plié l'autre non
//et le drawer (autre composant ?)



export default function MainView() {
    const user = useSelector(state => state.user.value)
    const displaying = useSelector(state => state.displaying.value)

    console.log('je vais afficher', displaying.listId)

  
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
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{ bgcolor: "#cfe8fc", height: "auto", width:"100%", padding:"20px"}}>
          Je montre la saisie d'une nouvelle tâche
        </Box>
        <Box       
          display="flex"
          alignItems="center"
          sx={{ bgcolor: '#cfe8ac', height: "auto", width:"100%", padding:"20px"}}>
          Je montre les tâches de la liste
        </Box>
      </Container>
);
  }