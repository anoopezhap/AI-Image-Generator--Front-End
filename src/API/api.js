import useAxios from "../hooks/useAxios";

const axios = useAxios();

export async function generateImage(prompt) {
  const res = await axios.post("/api/generateImage", { prompt });

  return res;
}

export async function postImage(body) {
  const res = await axios.post("/api/post", body);
  return res;
}

export async function getAllPosts() {
  const res = await axios.get("/api/post");
  return res;
}
