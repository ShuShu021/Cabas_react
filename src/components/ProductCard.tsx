import { Link } from "react-router";
import type { Product } from "../types";
import { formatPrice, getFinalPrice } from "../utils/price";
import { getCategoryLabel } from "../utils/catalog";

export default function ProductCard({ product }: { product: Product }) {
  const finalPrice = getFinalPrice(product);
  const hasDiscount = finalPrice < product.price;

  return (
    <Link to={`/produits/${product.id}`} className="card">
      <img src={product.thumbnail} alt={product.title} loading="lazy" />
      <div className="card__body">
        <h2 className="card__title">{product.title}</h2>
        <p>★ {product.rating.toFixed(1).replace(".", ",")}</p>
        <p>
          <strong>{formatPrice(finalPrice)}</strong>{" "}
          {hasDiscount && <s>{formatPrice(product.price)}</s>}
        </p>
        <p className="badges">
          <span className="badge">{product.availabilityStatus}</span>
          <span className="badge">{getCategoryLabel(product.category)}</span>
        </p>
      </div>
    </Link>
  );
}
