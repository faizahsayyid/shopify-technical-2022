import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useAppDispatch } from "../../app/hooks";
import { queryImagesAsync } from "../image-card/imageCardSlice";
import styles from "./SearchBar.module.css";

export const SearchBar = () => {
  const [currentQuery, setCurrentQuery] = useState("");
  const dispatch = useAppDispatch();

  const onQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentQuery(e.target.value);
  };

  const onSearch = () => {
    dispatch(queryImagesAsync({ query: currentQuery }));
  };

  const onSearchKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className={styles["search-bar"]}>
      <input
        type="text"
        className={styles["search-field"]}
        onChange={onQueryChange}
        placeholder="Search images from NASA"
        onKeyDown={onSearchKeyDown}
      />
      <button className={styles["search-btn"]} onClick={onSearch}>
        <FaSearch size="1.5rem" />
      </button>
    </div>
  );
};
