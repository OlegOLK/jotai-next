import { useHydrateAtoms } from "jotai/utils";
import { postCache } from "../store";

export default function App({ Component, pageProps }) {
  const { initialState } = pageProps;
  useHydrateAtoms(
    initialState ? [[postCache, initialState.prefetchedPostData]] : []
  );

  return <Component {...pageProps} />;
}
