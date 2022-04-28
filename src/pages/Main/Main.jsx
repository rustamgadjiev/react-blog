import { Route } from "react-router-dom";
import { Blog } from "../../components/Blog/Blog";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { POSTS_URL } from "../../utils/constants";
import { user } from "../../utils/data";
import { useGetPosts } from "../../utils/hooks";
import { Favourite } from "../Favourite/Favourite";
import { PostPage } from "../PostPage/PostPage";

export const Main = ({ setIsLoggedIn }) => {
  const { blogPosts, setBlogPosts, isLoading, error } = useGetPosts(POSTS_URL);

  const getPostsData = { blogPosts, setBlogPosts, isLoading, error };
  return (
    <main>
      <Sidebar userName={user.name} setIsLoggedIn={setIsLoggedIn} />

      <Route exact path="/blog">
        <Blog {...getPostsData} />
      </Route>
      <Route exact path="/favourite" component={Favourite} />
      <Route exact path="/blog/:postId">
        <PostPage blogPosts={blogPosts} setBlogPosts={setBlogPosts} />
      </Route>
    </main>
  );
};
