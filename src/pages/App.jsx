import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Navbar } from "../components/Navbar/Navbar";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Post } from "../components/Post/Post";

function App() {
  const [data, setData] = useState([]);
  const [daysAgo, setDaysAgo] = useState(8);
  const [loadingMsg, setLoadingMsg] = useState("");

  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

  const getTodayDate = () => {
    const today = new Date();
    today.setDate(today.getDate() - 1); // Subtract 1 day
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const getDateSpecifiedDaysAgo = (days) => {
    const today = new Date();
    const specifiedDaysAgo = new Date(today);
    specifiedDaysAgo.setDate(today.getDate() - days);

    const year = specifiedDaysAgo.getFullYear();
    const month = String(specifiedDaysAgo.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
    const day = String(specifiedDaysAgo.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const fetchData = (days) => {
    axios
      .get(
        `${apiUrl}&start_date=${getDateSpecifiedDaysAgo(
          days
        )}&end_date=${getTodayDate()}&thumbs=true`
      )
      .then((response) => {
        const newData = response.data;
        setData((prevData) => {
          // Filter out duplicates
          const filteredData = newData.filter(
            (item) => !prevData.some((prevItem) => prevItem.date === item.date)
          );
          // Concatenate and sort
          const updatedData = [...prevData, ...filteredData].sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          return updatedData;
        });
      });
  };

  useEffect(() => {
    fetchData(daysAgo);
    setLoadingMsg("Loading more photos...");
    setTimeout(() => {
      setLoadingMsg("");
    }, 10000);
  }, [daysAgo]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 10
      ) {
        setDaysAgo((prevDaysAgo) => prevDaysAgo + 8);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [daysAgo]);

  return (
    <div className="app-container">
      <Navbar />
      <div className="container-fluid" style={{ maxWidth: "700px" }}>
        {data.length === 0 ? (
          <p className="text-white">Loading for a long time? Refresh the page or try again later.</p>
        ) : (
          data.map((data) => {
            return <Post data={data} key={data.date} />;
          })
        )}
        <p className="text-light">{loadingMsg}</p>
      </div>
    </div>
  );
}

export default App;
