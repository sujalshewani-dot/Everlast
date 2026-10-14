import { Link } from "react-router-dom";
import "./MostSeller.css";

const products = [
{
id: 1,
routeId: "men-5",
name: "Office for men",
image: "/images/products/OFM.png",
reviews: 149,
price: "From Rs.2,300.00 PKR",
},
{
id: 2,
routeId: "men-8",
name: "Imagination ( Premium) - Louis Vuitton",
image: "/images/products/LV.png",
reviews: 25,
price: "From Rs.3,200.00 PKR",
},
{
id: 3,
routeId: "men-1",
name: "Nishane Hacivat",
image: "/images/products/nishane-hacivat.png",
reviews: 12,
price: "From Rs.3,200.00 PKR",
},
{
id: 4,
routeId: "hawas-ice",
name: "Hawas - Ice",
image: "/images/products/hawas-ice.png",
reviews: 7,
price: "Rs.2,200.00 PKR",
},
{
id: 5,
routeId: "premium-2",
name: "Imperial Valley - Gissah",
image: "/images/products/imperial-valley-gissah.png",
reviews: 8,
price: "From Rs.3,200.00 PKR",
},
{
id: 6,
routeId: "men-14",
name: "Angels' share by kilian",
image: "/images/products/angels-share-kilian.png",
reviews: 7,
price: "Rs.2,800.00 PKR",
soldOut: true,
},
{
id: 7,
routeId: "creed-aventus",
name: "Creed Aventus",
image: "/images/products/creed-aventus.png",
reviews: 4,
price: "Rs.3,200.00 PKR",
},
{
id: 8,
routeId: "men-16",
name: "Stronger with you - intense",
image: "/images/products/stronger-with-you-intense.png",
reviews: 2,
price: "Rs.2,800.00 PKR",
},
];

function MostSeller() {
return ( <section className="most-seller-section"> <div className="most-seller-container"> <h2 className="talking-heading">
EVERYONE IS TALKING ABOUT </h2>

    <h3 className="most-seller-heading">
      MOST SELLER
    </h3>

    <div className="most-seller-grid">
      {products.map((product) => (
        <Link
          to={`/product/${product.routeId}`}
          className="most-seller-card"
          key={product.id}
        >
          <div className="most-seller-image">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
            />

            {product.soldOut && (
              <span className="most-seller-badge">
                
                Sold out
              </span>
            )}
          </div>

          <div className="most-seller-details">
            <p className="most-seller-name">
              {product.name}
            </p>

            <div className="most-seller-reviews">
              <span className="most-seller-stars">
                ★★★★★
              </span>

              <span>
                {product.reviews} reviews
              </span>
            </div>

            <p className="most-seller-price">
              {product.price}
            </p>
          </div>
        </Link>
      ))}
    </div>

    <div className="view-all-container">
      <Link to="/men" className="view-all-button">
        View all
      </Link>
    </div>
  </div>
</section>


);
}

export default MostSeller;
