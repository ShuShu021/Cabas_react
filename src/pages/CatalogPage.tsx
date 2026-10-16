import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";
import { searchProducts } from "../services/api";
import { useFetch } from "../hooks/useFetch";
import { useDebounce } from "../hooks/useDebounce";
import {
  CATEGORIES,
  parseSort,
  sortProducts,
  type SortKey,
} from "../utils/catalog";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import SortSelect from "../components/SortSelect";
import ProductList from "../components/ProductList";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") ?? "";
  const category = CATEGORIES.find(
    (c) => c.slug === searchParams.get("categorie"),
  );
  const sort = parseSort(searchParams.get("tri"));

  // Seule la valeur "calmée" déclenche l'appel API
  const debouncedQuery = useDebounce(query, 400);

  const fetcher = useCallback(
    (signal: AbortSignal) => searchProducts(debouncedQuery.trim(), signal),
    [debouncedQuery],
  );
  const { data, loading, error, reload } = useFetch(fetcher);

  // Filtre + tri en mémoire, sans nouvel appel
  const visibleProducts = useMemo(() => {
    if (!data) return [];
    const filtered = category
      ? data.products.filter((p) => p.category === category.id)
      : data.products;
    return sortProducts(filtered, sort);
  }, [data, category, sort]);

  function updateParam(key: string, value: string) {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value) next.set(key, value);
        else next.delete(key);
        return next;
      },
      { replace: true }, // ne pas polluer l'historique à chaque frappe
    );
  }

  return (
    <section>
      <h1 className="sr-only">Catalogue</h1>

      <div className="toolbar">
        <SearchBar value={query} onChange={(v) => updateParam("q", v)} />
        <CategoryFilter
          value={category?.slug ?? ""}
          onChange={(v) => updateParam("categorie", v)}
        />
        <SortSelect
          value={sort}
          onChange={(v: SortKey) =>
            updateParam("tri", v === "pertinence" ? "" : v)
          }
        />
      </div>

      {loading && <Loader />}
      {error && (
        <ErrorMessage
          message="Impossible de charger les produits."
          onRetry={reload}
        />
      )}
      {!loading && !error && (
        <>
          <p aria-live="polite">
            {visibleProducts.length} produit
            {visibleProducts.length > 1 ? "s" : ""}
          </p>
          {visibleProducts.length === 0 ? (
            <EmptyState message="Aucun produit ne correspond à votre recherche." />
          ) : (
            <ProductList products={visibleProducts} />
          )}
        </>
      )}
    </section>
  );
}
