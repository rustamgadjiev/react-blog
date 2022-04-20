import s from "./SearchForm.module.scss";
import { ReactComponent as SearchIcon } from "../../../../../assets/images/icons/search.svg";

export const SearchForm = () => {
  return (
    <form>
      <div className={s.searchFrom}>
        <input type="text" placeholder="Найти" className={s.search} />
        <SearchIcon />
      </div>
    </form>
  );
};
