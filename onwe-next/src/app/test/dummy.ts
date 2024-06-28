import axios from "axios";

const getData = async (getToken) => {
  const res = await axios.get("http://localhost:3000", {
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
  });
  console.log(res.data);

  return res.data;
};

export const getDataHandler = async (getToken) => {
  const data = await getData(getToken);
  return data;
};
