import { atom } from "jotai";

const isSSR = typeof window === "undefined";

const INITIAL_POST_ID = 1;
const EMPTY_POST_DATA = {
  title: "",
  url: "",
  text: ""
};

const fetchData = async (id) => {
  const response = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  );
  const data = await response.json();
  return data;
};

export const preparePostData = async () => {
  const id = INITIAL_POST_ID;
  const prefetched = await fetchData(id);
  return { [id]: prefetched };
};

export const postId = atom(INITIAL_POST_ID);
export const postCache = atom({});

export const postData = atom((get) => {
  const id = get(postId);
  const cache = get(postCache);
  if (isSSR || cache[id]) {
    return cache[id] || EMPTY_POST_DATA;
  }
  return fetchData(id);
});
