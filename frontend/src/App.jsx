import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Authentication from "./Pages/Authentication.jsx";
import SideBar from "./components/Bars/SideBar.jsx";
import UserArea from "./Pages/UserArea.jsx";
import Register from "./components/Register.jsx";
import Users from "./components/Users.jsx";
import CreatePost from "./components/CreatePost.jsx";
import EditPosts from "./components/EditPosts.jsx";
import EditPostPage from "./components/EditPostPage.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/auth"} element={<Authentication />} />
        <Route path={"/admin"} element={<UserArea />}>
          <Route path={"add-user"} element={<Register />} />
          <Route path={"users"} element={<Users />} />
          <Route path={"create-post"} element={<CreatePost />} />
          <Route path={"edit-posts"} element={<EditPosts />} />
          <Route path={"edit-post-page"} element={<EditPostPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
