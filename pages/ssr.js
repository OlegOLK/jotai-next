import Index from "./index";

import { preparePostData } from "../store";

export default function SSR() {
  return <Index />;
}

export async function getServerSideProps() {
  const prefetchedPostData = await preparePostData();
  return { props: { initialState: { prefetchedPostData } } };
}
