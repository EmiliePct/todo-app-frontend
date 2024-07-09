export const getLists = async (userId, accessToken) => {
    try {
        console.log('rentré dans API', userId, accessToken)
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