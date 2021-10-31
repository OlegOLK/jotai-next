import { Suspense, Fragment } from "react";
import { useAtom } from "jotai";

import { postId, postData } from "../store";

const isSSR = typeof window === "undefined";

const SsrSuspense = isSSR ? Fragment : Suspense;

const PostId = () => {
  const [id, setId] = useAtom(postId);
  const next = () => setId((x) => x + 1);
  return (
    <div>
      id: {id} <button onClick={next}>Next</button>
    </div>
  );
};

const PostTitle = () => {
  const [data] = useAtom(postData);
  return (
    <div>
      <h1>{data.title}</h1>
      <a href={data.url}>{data.url}</a>
      <p>{data.text}</p>
    </div>
  );
};

export default function IndexPage() {
  return (
    <div>
      <PostId />
      <SsrSuspense fallback="Loading...">
        <PostTitle />
      </SsrSuspense>
    </div>
  );
}
