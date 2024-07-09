export const apiSignIn = async (email, pwd) => {
    try {
      const response = await fetch(`http://localhost:3000/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            pwd: pwd,
          }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };