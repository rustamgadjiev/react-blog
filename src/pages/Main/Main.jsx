import { Route } from "react-router-dom";
import { Blog } from "../../components/Blog/Blog";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { POSTS_URL } from "../../utils/constants";
import { useGetPosts } from "../../utils/hooks";
import { Favourite } from "../Favourite/Favourite";
import { PostPage } from "../PostPage/PostPage";

export const Main = () => {
  const getPostsData = useGetPosts(POSTS_URL);

  return (
    <main>
      <Sidebar />

      <Route exact path="/blog">
        <Blog {...getPostsData} />
      </Route>
      <Route exact path="/favourite" component={Favourite} />
      <Route exact path="/blog/:postId">
        <PostPage blogPosts={getPostsData.blogPosts} setBlogPosts={getPostsData.setBlogPosts} />
      </Route>
    </main>
  );
};
