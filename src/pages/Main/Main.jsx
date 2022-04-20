import { Route } from "react-router-dom";
import { Blog } from "../../components/Blog/Blog";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { user } from "../../utils/data";
import { Favourite } from "../Favourite/Favourite";
import { PostPage } from "../PostPage/PostPage";

export const Main = ({ setIsLoggedIn }) => {
  return (
    <main>
      <Sidebar userName={user.name} setIsLoggedIn={setIsLoggedIn} />

      <Route exact path="/blog" component={Blog} />
      <Route exact path="/favourite" component={Favourite} />
      <Route exact path="/blog/:postId" component={PostPage} />
    </main>
  );
};
