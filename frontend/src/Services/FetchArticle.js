export const fetchArticleUpload = async (title, content, author, image) => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("author", author);
    if (image) {
      formData.append("image", image);
    }

    const response = await fetch("http://localhost:5000/api/articles/upload", {
      method: "POST",
      body: formData,
    });

    const uploadPost = await response.json();

    return uploadPost;
  } catch (error) {
    console.error("Error during article upload:", error);
    alert("A apărut o eroare. Te rugăm să încerci din nou.");
  }
};

export const fetchArticleGetRecent = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/articles/get", {
      method: "GET",
    });

    const uploadPost = await response.json();

    return uploadPost;
  } catch (error) {
    console.error("Error during article upload:", error);
    alert("A apărut o eroare. Te rugăm să încerci din nou.");
  }
};

export const fetchArticleGetById = async (userId) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/articles/get/${userId}`,
      {
        method: "GET",
      },
    );

    const getPosts = await response.json();

    return getPosts;
  } catch (error) {
    console.error("Error fetching articles by user ID:", error);
    alert("A apărut o eroare. Te rugăm să încerci din nou.");
  }
};

export const fetchArticleDelete = async (postId) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/articles/delete/${postId}`,
      {
        method: "DELETE",
      },
    );

    const deletePost = await response.json();

    return deletePost;
  } catch (error) {
    console.error("Error fetching articles by user ID:", error);
    alert("A apărut o eroare. Te rugăm să încerci din nou.");
  }
};

export const fetchArticleEdit = async (postId, title, content, image) => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    const response = await fetch(
      `http://localhost:5000/api/articles/edit/${postId}`,
      {
        method: "POST",
        body: formData,
      },
    );

    const editedPost = await response.json();
    return editedPost;
  } catch (error) {
    console.error("Error editing article:", error);
    alert("A apărut o eroare. Te rugăm să încerci din nou.");
  }
};
