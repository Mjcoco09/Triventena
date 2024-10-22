import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Recent.css"; // Import the new CSS file

const RecentlyViewedPage = () => {
  const recentlyViewed = useSelector(
    (state) => state.recent.recentlyViewedItems
  );

  return (
    <div className="recentlyViewedContainer">
      <h2>Recently Viewed Products</h2>
      {recentlyViewed && recentlyViewed.length === 0 ? (
        <p className="noItemsMessage">No recently viewed products.</p>
      ) : (
        <div className="recentlyViewedList">
          {recentlyViewed &&
            recentlyViewed.map((product) => (
              <Link
                to={`/product/${product.product}`}
                key={product.product}
                className="recentlyViewedItemLink"
              >
                <div className="recentlyViewedItem">
                  <img src={product.imageUrl} alt={product.name} />
                  <p>{product.name}</p>
                  <p className="price">${product.price}</p>
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
};

export default RecentlyViewedPage;
