import { Search } from "../Search/Search";
import { SubMenu } from "../SubMenu/SubMenu";
import "./Header.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Reddit from "../../Utilities/Reddit";
import redditLogo from "./reddit-logo.png";
import searchIcon from "./search-icon.png";
import hamburger from "./hamburger-clear.png";
import { chooseSub, selectSubReddit } from "../../Features/subRedditSlice";
import {
  selectFirstChildren,
  setFirstChildren,
  setNextChildren,
} from "../../Features/childrenSlice";
import { setSearchState } from "../../Features/searchSlice";
import InfiniteScroll from "react-infinite-scroller";

export const Header = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState(null);
  const [display, setDisplay] = useState(false);
  const [nextAfter, setNextAfter] = useState("");
  const subState = useSelector(selectSubReddit);
  const childrenArray = useSelector(selectFirstChildren);

  //Fetches content from home page on initial render and each time subState(Sub Reddit endpoint) changes
  useEffect(() => {
    async function populateReddit() {
      const data = await fetch(`https://www.reddit.com/${subState}.json`);
      const jsonData = await data.json();
      const childVar = await jsonData.data.children;
      setResults(jsonData);
      dispatch(setFirstChildren(childVar));
      setNextAfter(jsonData.data.after);
    }
    populateReddit();
  }, [subState, dispatch]);

  //Loads subReddit from dropdown menu
  const handleSubChange = (e) => {
    dispatch(chooseSub(e.currentTarget.dataset.sub));
    window.scrollTo(0, 0);
  };

  //Gets value from search term
  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };
  //Search all of Reddit or within subReddit
  const handleSubmit = async () => {
    dispatch(setSearchState(searchTerm));
    const data = await fetch(
      `https://www.reddit.com/${subState}search.json?q=${searchTerm}&restrict_sr=on`
    );
    const jsonData = await data.json();
    const childVar = await jsonData.data.children;
    setResults(jsonData);
    dispatch(setFirstChildren(childVar));
    setNextAfter(jsonData.data.after);
    setSearchTerm("");
    window.scrollTo(0, 0);
  };

  //Toggles subReddit Menu displaying
  const handleDisplay = () => {
    if (!display) {
      setDisplay(true);
      document.getElementById("slide-menu").style.width = "20rem";
    } else {
      setDisplay(false);
      document.getElementById("slide-menu").style.width = "0";
    }
  };
  //Allows search submit via enter key
  const keyPressed = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  const goHome = () => {
    window.location.reload();
  };

  //Loads next content for infinte scroll
  let nextJson;
  const loadMore = async () => {
    if (results && results.data) {
      nextJson = await Reddit.loadMore(nextAfter);
      const nextJsonArray = await nextJson.data.children;
      const afterVar = await nextJson.data.after;
      setNextAfter(afterVar);
      dispatch(setNextChildren(nextJsonArray));
    }
  };

  return (
    <div>
      <div className='header'>
        <div className='logo clickable' onClick={goHome} data-sub=''>
          <img src={redditLogo} alt='' className='reddit-logo' />
          <h1 className='reddit-logo-typed'>reddit dark</h1>
        </div>

        <div className='input-box'>
          <input
            type='text'
            placeholder='search'
            value={searchTerm}
            onChange={handleSearchTerm}
            onKeyPress={keyPressed}
          />
          <img
            src={searchIcon}
            onClick={handleSubmit}
            className='search-icon'
            alt=''
          />
        </div>
        <h4 onClick={handleDisplay} className='sub-menu-link'>
          r/explore
        </h4>
        <img
          onClick={handleDisplay}
          className='mobile-sub-menu-link'
          src={hamburger}
          alt=''
        />
      </div>
      <SubMenu
        display={display}
        handleSubChange={handleSubChange}
        handleDisplay={handleDisplay}
      />

      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={true}
        loader={<img className='loader' key={0} src={redditLogo} alt='' />}
        threshold={2000}
        initialLoad={false}
      >
        <Search
          results={results}
          children={childrenArray}
          handleSubChange={handleSubChange}
          loadMore={loadMore}
          className='search'
        />
      </InfiniteScroll>
    </div>
  );
};