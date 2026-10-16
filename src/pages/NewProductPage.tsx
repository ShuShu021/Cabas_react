import { useId, useMemo, useState, type FormEvent } from "react";
import { createProduct } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { CATEGORIES } from "../utils/catalog";
import {
  EMPTY_PRODUCT_FORM,
  toNewProduct,
  validate,
  type ProductFormField,
  type ProductFormValues,
} from "../utils/validateProduct";

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; id: number; title: string }
  | { status: "error"; message: string };

type Touched = Partial<Record<ProductFormField, boolean>>;

export default function NewProductPage() {
  const { user } = useAuth();
  const idPrefix = useId();

  const [values, setValues] = useState<ProductFormValues>(EMPTY_PRODUCT_FORM);
  const [touched, setTouched] = useState<Touched>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submit, setSubmit] = useState<SubmitState>({ status: "idle" });

  const errors = useMemo(() => validate(values), [values]);
  const isValid = Object.keys(errors).length === 0;
  const isSubmitting = submit.status === "submitting";

  function visibleError(field: ProductFormField): string | undefined {
    return touched[field] || submitAttempted ? errors[field] : undefined;
  }

  function handleChange(field: ProductFormField, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleBlur(field: ProductFormField) {
    setTouched((prev) => (prev[field] ? prev : { ...prev, [field]: true }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitAttempted(true);
    if (!isValid || isSubmitting) return;
    if (!user) {
      setSubmit({
        status: "error",
        message: "Vous devez être connecté pour proposer un produit.",
      });
      return;
    }

    setSubmit({ status: "submitting" });
    try {
      const created = await createProduct(toNewProduct(values, user.id));
      setSubmit({ status: "success", id: created.id, title: created.title });
      setValues(EMPTY_PRODUCT_FORM);
      setTouched({});
      setSubmitAttempted(false);
    } catch {
      setSubmit({
        status: "error",
        message:
          "L'envoi du produit a échoué. Vérifiez votre connexion et réessayez.",
      });
    }
  }

  function fieldProps(field: ProductFormField) {
    const error = visibleError(field);
    const inputId = `${idPrefix}-${field}`;
    return {
      id: inputId,
      name: field,
      value: values[field],
      onBlur: () => handleBlur(field),
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? `${inputId}-error` : undefined,
    } as const;
  }

  function renderError(field: ProductFormField) {
    const error = visibleError(field);
    if (!error) return null;
    return (
      <p id={`${idPrefix}-${field}-error`} className="field-error">
        <span aria-hidden="true">⚠ </span>
        {error}
      </p>
    );
  }

  return (
    <section>
      <h1>Proposer un produit</h1>
      <p>
        Les champs marqués d'un astérisque (<span aria-hidden="true">*</span>
        <span className="sr-only">astérisque</span>) sont obligatoires.
      </p>

      {submit.status === "success" && (
        <p role="status" className="notice notice--success">
          Produit « {submit.title} » envoyé avec succès (identifiant n°{" "}
          {submit.id}).
        </p>
      )}
      {submit.status === "error" && (
        <p role="alert" className="alert">
          {submit.message}
        </p>
      )}

      <form className="form form--wide" onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor={`${idPrefix}-title`}>Nom du produit *</label>
          <input
            {...fieldProps("title")}
            type="text"
            required
            placeholder="Gourde isotherme 500 ml"
            onChange={(e) => handleChange("title", e.target.value)}
          />
          {renderError("title")}
        </div>

        <div className="form__row">
          <div>
            <label htmlFor={`${idPrefix}-category`}>Catégorie *</label>
            <select
              {...fieldProps("category")}
              required
              onChange={(e) => handleChange("category", e.target.value)}
            >
              <option value="">Choisir…</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
            {renderError("category")}
          </div>

          <div>
            <label htmlFor={`${idPrefix}-brand`}>Marque</label>
            <input
              {...fieldProps("brand")}
              type="text"
              placeholder="CABAS"
              onChange={(e) => handleChange("brand", e.target.value)}
            />
            {renderError("brand")}
          </div>
        </div>

        <div className="form__row">
          <div>
            <label htmlFor={`${idPrefix}-price`}>Prix (€) *</label>
            <input
              {...fieldProps("price")}
              type="text"
              inputMode="decimal"
              required
              placeholder="19,90"
              onChange={(e) => handleChange("price", e.target.value)}
            />
            {renderError("price")}
          </div>

          <div>
            <label htmlFor={`${idPrefix}-stock`}>Stock *</label>
            <input
              {...fieldProps("stock")}
              type="text"
              inputMode="numeric"
              required
              placeholder="25"
              onChange={(e) => handleChange("stock", e.target.value)}
            />
            {renderError("stock")}
          </div>
        </div>

        <div>
          <label htmlFor={`${idPrefix}-description`}>Description *</label>
          <textarea
            {...fieldProps("description")}
            required
            rows={4}
            placeholder="Gourde en inox qui garde l'eau fraîche pendant 24 heures."
            onChange={(e) => handleChange("description", e.target.value)}
          />
          {renderError("description")}
        </div>

        <div>
          <label htmlFor={`${idPrefix}-tags`}>Tags * (un par ligne)</label>
          <textarea
            {...fieldProps("tags")}
            required
            rows={3}
            placeholder={"sport\ngourde"}
            onChange={(e) => handleChange("tags", e.target.value)}
          />
          {renderError("tags")}
        </div>

        <button type="submit" disabled={!isValid || isSubmitting}>
          {isSubmitting ? "Envoi…" : "Envoyer le produit"}
        </button>
      </form>
    </section>
  );
}
