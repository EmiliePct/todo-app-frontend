// Get toutes les listes d'un user
export const getLists = async (userId, accessToken) => {
    try {
      const response = await fetch(`http://localhost:3000/lists/${userId}`, 
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

 

  // Post création d'une nouvelle liste
  export const createList = async (
    title, user
  ) => {
    try {
      const response = await fetch(
        `http://localhost:3000/lists`,
        {
          method: "POST",
          headers: 
          {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify({
            title: title,
            userId: user.userId
          }),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error.message);
    }
  };

  // DELETE suppression d'une liste et des tâches associées
  export const deleteList = async (listId, user) => {
    try {
      const response = await fetch(`http://localhost:3000/lists/${listId}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error.message);
    }
  };