import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const SingleBook = () => {
    const [data, setData] = useState([]);
    const { id } = useParams();
    const baseUrl = `http://localhost:4000/books/${id}`;

    useEffect(() => {
        const fetchData = async () => {
          try {
    
            const res = await fetch(baseUrl);
            if (!res.ok) {
              throw new Error("Failed to fetch any data!");
            }
            const jsonData = await res.json();
            setData(jsonData);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, []);


  return (
    <div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Link to='/books'>⬅️ All Books</Link>
            <Link to={`/editbook/${id}`}>📝 Edit</Link>
        </div>

        <div className="bookdetails">
            <div className="col-1">
                <img src={`${data?.img}`}
                alt={data?.title} 
                style={{ marginTop: 10 }}
                />
            </div>

            <div className="col-2">
                <h1>{data?.title}</h1>
                <p>Description: { data?.desc }</p>
                <p>Category: {data?.category}</p>
                <p>Author: {data?.author}</p>
                <p>Price (&#8377;): {data?.price}</p>
                <p>Quantity: {data?.quantity}</p>
            </div>

        </div>

    </div>
  )
}

export default SingleBook