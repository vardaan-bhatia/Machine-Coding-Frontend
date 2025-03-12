import { useState } from "react";
import { useFetch } from "../hooks/useFetch";

const Cards = () => {
  const [page, setPage] = useState(1);
  const cardPerPage = 6;
  const { data, error, loading } = useFetch("https://dummyjson.com/products");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message || "An error occurred"}</p>;
  if (!data || !data.products) return <p>No images available</p>;

  const totalPage = Math.ceil(data.products.length / cardPerPage);

  const handlePagination = (index) => setPage(index);
  const handleDecrement = () => page > 1 && setPage(page - 1);
  const handleIncrement = () => page < totalPage && setPage(page + 1);

  return (
    <div className="main">
      <ul className="image-grid">
        {data.products
          .slice((page - 1) * cardPerPage, page * cardPerPage)
          .map((product, index) => (
            <li key={index} className="item">
              <img src={product.thumbnail} alt={`Product ${index}`} />
            </li>
          ))}
      </ul>

      <div className="pagination">
        <button onClick={handleDecrement} disabled={page === 1}>
          ◀️
        </button>
        {[...Array(totalPage)].map((_, i) => (
          <button
            key={i}
            onClick={() => handlePagination(i + 1)}
            className={page === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={handleIncrement} disabled={page === totalPage}>
          ▶️
        </button>
      </div>
    </div>
  );
};

export default Cards;
