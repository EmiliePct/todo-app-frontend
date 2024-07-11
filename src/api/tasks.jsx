import moment from 'moment';
 
 //Get les tâches d'une liste d'un user
 export const displayTasks = async (listId, accessToken) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/tasksByListId${listId}`, 
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

   //Get les informations d'une tâche d'un user - à tester
  export const displaySingleTask = async (taskId, accessToken) => {
    try {
      const response = await fetch(
        `http://localhost:3000/tasks/taskByTaskId${taskId}`,
        {
          method: "GET",
          mode: "cors",
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
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

    // Patch update une tâche
    export const updateCompletionTask = async (
        taskId, user
      ) => {
        try {

          const response = await fetch(
            `http://localhost:3000/tasks/${taskId}`,
            {
              method: "PATCH",
              headers: 
              {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.accessToken}`,
              },
              body: JSON.stringify({
                is_done: true,
              }),
            }
          );
          const data = await response.json();
          return data;
        } catch (error) {
          console.error(error.message);
        }
      };

          // Patch update une tâche
    export const updateUnCompletionTask = async (
        taskId, user
      ) => {
        try {
          const response = await fetch(
            `http://localhost:3000/tasks/${taskId}`,
            {
              method: "PATCH",
              headers: 
              {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.accessToken}`,
              },
              body: JSON.stringify({
                is_done: false,
              }),
            }
          );
          const data = await response.json();
          return data;
        } catch (error) {
          console.error(error.message);
        }
      };

      // DELETE suppression d'une tâche
  export const deleteTask = async (
    taskId, user
  ) => {
    try {
      const response = await fetch(
        `http://localhost:3000/tasks/${taskId}`,
        {
          method: "delete",
          headers: 
          {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.accessToken}`,
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error.message);
    }
  };