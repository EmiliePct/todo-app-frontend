import moment from 'moment';
 
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

  // Post création d'une nouvelle tâche
  export const createTask = async (
    title, description, deadline, user, listId
  ) => {
    try {
        const convertedDeadline = moment(deadline).add(1, 'day').toISOString();
      const response = await fetch(
        `http://localhost:3000/tasks`,
        {
          method: "POST",
          headers: 
          {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify({
            title: title,
            description: description,
            deadline: convertedDeadline,
            is_done: false,
            listId: listId,
          }),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error.message);
    }
  };