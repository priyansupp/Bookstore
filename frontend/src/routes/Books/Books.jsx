import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Books = () => {
  const baseUrl = "http://localhost:4000/books/";
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    const fetchData = async () => {
      console.log(selectedCategory);
      try {
        let url = baseUrl;
        if(selectedCategory){
          url += `?category=${selectedCategory}`
        }

        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Failed to fetch any data!");
        }
        const jsonData1 = await res.json();
        if(selectedCategory != 'all') {
          let jsonData2 = [];
          jsonData1.map(x => {
            if(x.category == selectedCategory) {
              jsonData2.push(x);
            }
          });
          setData(jsonData2);
        } else {
          setData(jsonData1);
        }
        
        setIsLoading(false)
      } catch (error) {
        console.log(error);
        setError("Error while data fetching. Please try again later...")
        setIsLoading(false)
      }
    };
    fetchData();
  }, [selectedCategory]);

  // console.log(selectedCategory)

  return (
    <div>
      <h1>Books</h1>
      <Link to='/createbook'> Create New Book</Link>

      <h2>Search for Books</h2>
      
      <div className="filters">
        <label>Filter by Category</label>
        <select onChange={(e)=> setSelectedCategory(e.target.value)}>
          <option value="all">All</option>
          <option value="Romance">Romance</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Crime">Crime</option>
          <option value="Adventure">Adventure</option>
          <option value="Thriller">Thriller</option>
          <option value="Fiction">Fiction</option>
          <option value="Other">Other</option>
        </select>
      </div>

    { isLoading ? (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress color="success" />
      </Box>
    ) : error ? (
      <p>No books in this category</p>
    ) : (
      <ul className="books">
        {data.map((item) => (
          <li key={item._id.toString()}>
            <Link to={`/book/${item._id.toString()}`}>
              <img
                src={`${data?.img}`}
                alt={item.title}
                />
              <h3>{item.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    )}
    </div>
  );
};

export default Books;
