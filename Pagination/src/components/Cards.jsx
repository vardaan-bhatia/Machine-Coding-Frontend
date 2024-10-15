import React from "react";
import { useFetch } from "../hooks/useFetch";
import "../index.css";
import { useState } from "react";

const Cards = () => {
  const [page, setpage] = useState(1);
  const { data, error, loading } = useFetch(
    "https://dummyapi.online/api/pokemon"
  );

  if (error) {
    return <p>{error}</p>;
  }
  if (loading) {
    return <p>loading...</p>;
  }
  const cardperPage = 8;
  const totalPage = [...Array(Math.ceil(data.length / cardperPage))];

  const handlePagination = (index) => {
    setpage(index);
  };

  const handleDecrement = () => {
    if (page > 1) {
      setpage(page - 1);
    }
  };
  const handleIncrement = () => {
    if (page < totalPage.length) {
      setpage(page + 1);
    }
  };

  return (
    <>
      <div className="main">
        <ul className="pokemon">
          {data
            .slice(page * cardperPage - cardperPage, page * cardperPage)
            .map((e) => (
              <li key={e.id} className="item">
                <span>
                  <h1>
                    {e.id}- {e.pokemon}
                  </h1>
                  <h2>Ability: {e.abilities}</h2>
                  <img src={e.image_url} alt="" />
                </span>
              </li>
            ))}
        </ul>

        <div className="pagination">
          <span
            role="button"
            aria-label="Previous Page"
            onClick={handleDecrement}
            className={page === 1 ? "disabled" : ""}
          >
            ◀️
          </span>
          {totalPage.map((_, i) => (
            <span
              key={i}
              onClick={() => handlePagination(i + 1)}
              className={page === i + 1 ? "selected-page" : ""}
            >
              {i + 1}
            </span>
          ))}
          <span
            role="button"
            aria-label="Next Page"
            onClick={handleIncrement}
            className={page === totalPage.length ? "disabled" : ""}
          >
            ▶️
          </span>
        </div>
      </div>
    </>
  );
};

export default Cards;
