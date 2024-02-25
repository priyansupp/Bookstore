import React, { useState } from "react";
import { Link } from "react-router-dom";
import NoImageSelected from '../../assets/no-image-selected.jpg'


const CreateBook = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [author, setAuthor] = useState("")
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState('Other');
    const [isbn, setISBN] = useState('');
    const [image, setImage] = useState(NoImageSelected);
    const [submitted, setSubmitted] = useState(false);

    const createBook = async (e) => {
      e.preventDefault();
      // console.table(title);
  
      const formData = {
        "title": title,
        "desc": description,
        "category": category,
        "author": author,
        "quantity": quantity,
        "price": price,
        "ISBN": isbn,
        "img": image
      }
      console.log(formData);
  

      try {
        const response = await fetch("http://localhost:4000/books/", {
          method: "POST",
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
        if(e.target.files && e.target.files[0]) {
          setImage(URL.createObjectURL(e.target.files[0]));
        }
      }
      
      return (
        <div>
        <h1>Create your own book</h1>
        
        {submitted ? (
          <div>
              <h3>Data submitted successfully!</h3>
              <Link to='/books'>⬅️ Books</Link>
            </div>
        ) : (
          
          <form onSubmit={createBook} className="bookdetails">
            <div className="col-1">
                <label>Upload Book Image</label>
                <img src={image} alt="Preview Image" style={{ maxHeight: 400, maxWidth: 300, margin: 'auto' }}/>
                <input type="file" accept="image/gif, image/jpeg, image/png" onChange={onImageChange}/>
            </div>

            <div className="col-2">
                <div>
                    <label>Title</label>
                    <input required type="text" placeholder="Add a title" value={title} onChange={(e) => setTitle(e.target.value)}/>
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
                <label>ISBN</label>
                <input required
                placeholder="ISBN(Must be unique)"
                type="text"
                value={isbn}
                onChange={(e) => setISBN(e.target.value)}
                />
            </div>

                <div>
                    <input type="submit" style={{ borderRadius: 20, }}/>
                </div>
            </div>

        </form>
        )}

    </div>
  )
}
export default CreateBook