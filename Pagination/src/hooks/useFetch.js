import axios from "axios";
import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setdata] = useState([]);
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      seterror(null);
      setloading(true);
      try {
        const response = await axios.get(url);
        const data = response.data;
        setdata(data);
      } catch (error) {
        seterror(error);
      } finally {
        setloading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
};
