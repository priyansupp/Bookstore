import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import NoImageSelected from '../../assets/no-image-selected.jpg'

const EditBook = () => {

    const navigate = useNavigate();
    const {id} = useParams()
    const baseUrl = `http://localhost:4000/books/${id}`;
  
    const [bookId, setBookId] = useState("");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [author, setAuthor] = useState("")
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState('Other');
    const [image, setImage] = useState(NoImageSelected);
    const [submitted, setSubmitted] = useState(false);
  
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);
  
        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }
  
        const data = await response.json();
        setBookId(data._id.toString());
        setTitle(data.title);
        setCategory(data.category);
        setDescription(data.desc);
        setPrice(data.price);
        setQuantity(data.quantity);
        setAuthor(data.author);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const editBook = async (e) => {
      e.preventDefault();
      // console.table(title);
  
      const formData = {
        "title": title,
        "desc": description,
        "category": category,
        "author": author,
        "quantity": quantity,
        "price": price,
        "ISBN": 'abcd',
      }
      console.log(formData);
  

      try {
        const response = await fetch(`http://localhost:4000/books/${id}`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });
        
        if (response.ok) {
          setTitle("");
          setSubmitted(true);
        } else {
          console.log(response.body);
          console.log("Failed to submit data.");
        }
      } catch (error) {
        console.log(error);
      }
    };
  
  
    const onImageChange = (e) => {
      if (e.target.files && e.target.files[0]) {
        setImage(URL.createObjectURL(e.target.files[0]));
      }
    };
  
    const removeBook = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch(
          "http://localhost:4000/books/" + bookId,
          {
            method: "DELETE",
          }
        );
  
        if (response.ok) {
          navigate("/books");
          window.alert(`Book ${bookId} removed`)
          console.log("Book removed.");
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h1>Edit Book</h1>
            <button onClick={removeBook} className="delete" style={{ height: 50, marginTop: 10, borderRadius: 5 }}>
              Delete Book
            </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Link to={`/book/${id}`}>⬅️ Book Details</Link>
          </div>
        <p>
          Edit any information relevant to the Book.
        </p>
  
  
        {submitted ? (
          <div>
            <p>Book edited successfully.</p>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Link to='/books'>⬅️ Books</Link>
              <Link to={`/editbook/${id}`}>📝 Edit</Link>
            </div>
          </div>
        ) : (
          <form className="bookdetails" onSubmit={editBook}>
            <div className="col-1">
              <label>Upload Image</label>
  
              {image ? (
                <img src={`${image}`} alt="preview image" />
              ) : (
                <></>
              )}
              <input
                onChange={onImageChange}
                type="file"
                accept="image/gif, image/jpeg, image/png"
              />
            </div>
            <div className="col-2">
              <div>
                <label>Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
  
              <div>
                  <label>Author</label>
                  <input required
                  placeholder="Author name"
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  />
              </div>

                <div>
                    <label>Price (&#8377;)</label>
                    <input required
                    placeholder="Price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    />
                </div>

                <div>
                    <label>Quantity</label>
                    <input required
                    placeholder="Quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>


            <div>
              <label>Description</label>
              <textarea
                rows="4"
                cols="50"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
            </div>


            <div>
              <label>Category</label>
              <select value={category} onChange={(e)=> setCategory(e.target.value)}>
              <option value="Romance">Romance</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Crime">Crime</option>
              <option value="Adventure">Adventure</option>
              <option value="Thriller">Thriller</option>
              <option value="Fiction">Fiction</option>
              <option value="Other">Other</option>
            </select>
            </div>

                <div>
                    <input type="submit" style={{ borderRadius: 20, }}/>
                </div>
            </div>
          </form>
        )}
      </div>
    );
  }
  
  export default EditBook;