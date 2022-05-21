import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { Blog } from "../../components/Blog/Blog";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { selectPostsData } from "../../store/slices/posts";
import { Account } from "../Account/Account";
import { Favourite } from "../Favourite/Favourite";
import { PostPage } from "../PostPage/PostPage";

export const Main = () => {
  const getPostsData = useSelector(selectPostsData);

  return (
    <main>
      <Sidebar />

      <Route exact path="/blog">
        <Blog {...getPostsData} />
      </Route>

      <Route exact path="/account">
        <Account />
      </Route>

      <Route exact path="/favourite" component={Favourite} />
      <Route exact path="/blog/:postId">
        <PostPage blogPosts={getPostsData.postsData} setBlogPosts={getPostsData.setBlogPosts} />
      </Route>
    </main>
  );
};
