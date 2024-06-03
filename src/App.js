import { useEffect, useState } from "react";
import "./App.css";
import { useCallback } from "react";

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const fetchdata = async () => {
    setLoading(true);
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=9&_page=${page}`
    );
    const res = await response.json();
    setData((prev) => [...prev, ...res]);
    setLoading(false);
  };
  useEffect(() => {
    fetchdata();
  }, [page]);
  const handlescroll = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    console.log(scrollHeight, scrollTop, clientHeight);
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage((prev) => prev + 1);
    }
  }, [loading]);
  useEffect(() => {
    window.addEventListener("scroll", handlescroll);
    return () => {
      window.removeEventListener("scroll", handlescroll);
    };
  }, []);
  return (
    <>
      <div className="Main-Container">
        {data &&
          data.map((item) => (
            <div className="card-container" key={item.id}>
              <h1>{item.id}</h1>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
      </div>
      {loading ? <h1>loading....</h1> : null}
    </>
  );
}

export default App;
