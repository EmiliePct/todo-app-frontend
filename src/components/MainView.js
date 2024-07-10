import Box from '@mui/material/Box';
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';





export default function MainView() {
    const user = useSelector(state => state.user.value)
    const displaying = useSelector(state => state.displaying.value)

    console.log('je vais afficher', displaying.listId)

  
    return (
        <Box
      height={200}
      width={200}
      my={4}
      display="flex"
      alignItems="center"
      gap={4}
      p={2}
      sx={{ border: '2px solid grey' }}
    >
      je montre l'ID de la liste à afficher : {displaying.listId}
    </Box>    );
  }