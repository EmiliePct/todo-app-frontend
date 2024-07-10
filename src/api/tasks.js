 //Get les tâches ? d'une liste d'un user, à vérifier si elle fonctionne
 export const displayTasks = async (listId, accessToken) => {
    try {
        console.log("rentré dans Api")
      const response = await fetch(`http://localhost:3000/tasks/${listId}`, 
        {
            method: 'GET',
            mode: 'cors',
            headers: { "Authorization": `Bearer ${accessToken}` },
          }
      )
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };