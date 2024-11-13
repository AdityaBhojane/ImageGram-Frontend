import { Routes, Route } from 'react-router-dom';

import NavigationBar from '../components/navigationBar/NavigationBar';
import Home from '../pages/home/Home';
import SignUpPage from '../pages/signup/SignUpPage';
import SignInPage from '../pages/signin/SignInPage';
import CreatePost from '../pages/createPost/CreatePost';
import UserPosts from '../pages/UserPosts/UserPost';

const AppRoutes = () => {
  return (
      <>
        <NavigationBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/user-post" element={<UserPosts />} />
        </Routes>
      </>
  );
};

export default AppRoutes;
