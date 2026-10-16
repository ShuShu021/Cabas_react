import { useCallback } from "react";
import { Link, useParams } from "react-router";
import { ApiError, getProductById } from "../services/api";
import { useFetch } from "../hooks/useFetch";
import { formatPrice, getFinalPrice } from "../utils/price";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";

export default function ProductPage() {
  const { id } = useParams();

  const fetcher = useCallback(
    (signal: AbortSignal) => getProductById(id ?? "", signal),
    [id],
  );
  const { data: product, loading, error, reload } = useFetch(fetcher);

  if (loading) return <Loader />;

  if (error) {
    if (error instanceof ApiError && error.status === 404) {
      return (
        <EmptyState message="Produit introuvable">
          <Link to="/" className="button">
            Retour au catalogue
          </Link>
        </EmptyState>
      );
    }
    return (
      <ErrorMessage
        message="Impossible de charger ce produit."
        onRetry={reload}
      />
    );
  }

  if (!product) return null;

  const finalPrice = getFinalPrice(product);
  const hasDiscount = finalPrice < product.price;

  return (
    <article className="product">
      <Link to="/">← Retour au catalogue</Link>

      <img
        className="product__image"
        src={product.images[0] ?? product.thumbnail}
        alt={product.title}
      />

      <h1>{product.title}</h1>
      <p>
        * {product.rating.toFixed(1).replace(".", ",")} (
        {product.reviews.length} avis) ·{" "}
        {product.brand ?? "Marque non renseignée"} · Stock : {product.stock}
      </p>
      <p>
        <strong>{formatPrice(finalPrice)}</strong>{" "}
        {hasDiscount && (
          <>
            <s>{formatPrice(product.price)}</s> (-
            {Math.round(product.discountPercentage)} %)
          </>
        )}
      </p>

      <button type="button" disabled={product.stock === 0}>
        {product.stock === 0 ? "Rupture de stock" : "+ Ajouter au panier"}
      </button>

      <h2>Description</h2>
      <p>{product.description}</p>

      <h2>Caractéristiques</h2>
      <dl className="specs">
        <div>
          <dt>Référence</dt>
          <dd>{product.sku}</dd>
        </div>
        <div>
          <dt>Poids</dt>
          <dd>{product.weight}</dd>
        </div>
        <div>
          <dt>Garantie</dt>
          <dd>{product.warrantyInformation}</dd>
        </div>
        <div>
          <dt>Livraison</dt>
          <dd>{product.shippingInformation}</dd>
        </div>
        <div>
          <dt>Retour</dt>
          <dd>{product.returnPolicy}</dd>
        </div>
      </dl>

      <h2>Avis clients</h2>
      <ul>
        {product.reviews.map((r) => (
          <li key={`${r.reviewerName}-${r.date}`}>
            * {r.rating} {r.comment} ({r.reviewerName})
          </li>
        ))}
      </ul>
    </article>
  );
}
