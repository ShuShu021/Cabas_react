import { useCallback, useEffect, useState } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useFetch<T>(fetcher: (signal: AbortSignal) => Promise<T>) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });
  const [reloadCount, setReloadCount] = useState(0);
  const [prevKey, setPrevKey] = useState({ fetcher, reloadCount });

  if (prevKey.fetcher !== fetcher || prevKey.reloadCount !== reloadCount) {
    setPrevKey({ fetcher, reloadCount });
    setState({ data: null, loading: true, error: null });
  }

  useEffect(() => {
    const controller = new AbortController();

    fetcher(controller.signal)
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setState({
          data: null,
          loading: false,
          error: err instanceof Error ? err : new Error("Erreur inconnue"),
        });
      });

    return () => controller.abort();
  }, [fetcher, reloadCount]);

  const reload = useCallback(() => setReloadCount((c) => c + 1), []);

  return { ...state, reload };
}
