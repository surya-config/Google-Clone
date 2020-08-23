import React from "react";
import "./SearchPage.css";
import { useStateValue } from "../../StateProvider";
import useGoogleSearch from "../../useGoogleSearch";

import Response from "../../response";
import { Link } from "react-router-dom";
import Search from "../../components/Search/Search";

import SearchIcon from "@material-ui/icons/Search";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import {
  LocalOffer,
  Room,
  Description,
  MoreVert,
  Image,
} from "@material-ui/icons";

function SearchPage() {
  const [{ term = "cs go" }, dispatch] = useStateValue();
  const { data } = useGoogleSearch(term);

  //const data = Response;

  console.log(data);

  return (
    <div className="searchPage">
      <div className="searchPage__header">
        <Link to="/">
          <img
            className="searchPage__logo"
            src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            alt=""
          />
        </Link>
        <div className="searchPage__headerBody">
          <Search hideButtons />

          <div className="searchPage__options">
            <div className="searchPage__optionsLeft">
              <div className="searchPage__option">
                <SearchIcon />
                <Link to="/all">All</Link>
              </div>
              <div className="searchPage__option">
                <Description />
                <Link to="/news">News</Link>
              </div>
              <div className="searchPage__option">
                <Image />
                <Link to="/images">Images</Link>
              </div>
              <div className="searchPage__option">
                <LocalOffer />
                <Link to="/shopping">Shopping</Link>
              </div>
              <div className="searchPage__option">
                <Room />
                <Link to="/maps">Maps</Link>
              </div>
              <div className="searchPage__option">
                <MoreVert />
                <Link to="/more">More</Link>
              </div>
            </div>
            <div className="searchPage__optionsRight">
              <div className="searchPage__option">
                <p>Settings</p>
              </div>
              <div className="searchPage__option">
                <Link to="/tools">Tools</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {true && (
        <div className="searchPage__results">
          <p className="searchPage__resultCount">
            About {data?.searchInformation.formattedTotalResults} results (
            {data?.searchInformation.formattedSearchTime} seconds) for {term}
          </p>

          {data?.items.map((item) => (
            <div className="searchPage__result">
              <a className="searchPage__resultdisplayLink" href={item.link}>
                {item.pagemap?.cse_image?.length > 0 &&
                  item.pagemap?.cse_image[0]?.src && (
                    <img
                      className="searchPage__resultImage"
                      src={item.pagemap?.cse_image[0]?.src}
                      alt=""
                    />
                  )}
                {item.displayLink} <ArrowDropDownIcon />
              </a>
              <a className="searchPage__resultTitle" href={item.link}>
                <h2>{item.title}</h2>
              </a>
              <p className="searchPage__resultSnippet">{item.snippet}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
