export const fetchLoginUser = async (email, password) => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (response.ok) {
      // Save the token to localStorage or sessionStorage
      localStorage.setItem("token", result.token);
      localStorage.setItem("username", result.username);
      localStorage.setItem("userId", result.userId);
      // Redirect to the home page
    }

    return result;
  } catch (error) {
    console.error("Error during login:", error);
    alert("An error occurred. Please try again.");
  }
};

export const fetchRegisterUser = async (username, name, email, password) => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, name, email, password }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error during login:", error);
    alert("An error occurred. Please try again.");
  }
};

export const fetchGetUsers = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/getAllUsers", {
      method: "GET",
    });
    return await response.json();
  } catch (error) {
    console.log("Error getting users");
    alert("An error occurred. Please try again.");
  }
};

export const fetchDeleteUser = async (userId) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/auth/deleteUser/${userId}`,
      {
        method: "DELETE",
      },
    );
    return await response.json();
  } catch (error) {
    console.log("Error deleting user");
    alert("An error occurred. Please try again.");
  }
};
