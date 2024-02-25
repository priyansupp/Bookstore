const router = require('express').Router();
const Book = require('./models.js');

router.get('/', async (req, res) => {
    await Book.find()
    .then((docs) => {
        console.log(`The following docs are retrieved: ${docs}`);
        res.send(docs);
    })
    .catch(err => {
        console.log(`Books could not be fetched. Error: ${err}`);
        res.send({
            error: "Books could not be fetched."
        });
    });
    
});

router.get('/:id', async (req, res) => {
    await Book.findById(req.params.id)
    .then((doc) => {
        console.log(`The following docs are retrieved: ${doc}`);
        res.send(doc);
    })
    .catch(err => {
        console.log(`Book could not be fetched. Error: ${err}`);
        res.send({
            error: "Book could not be fetched."
        });
    });

});

router.post('/', async (req, res) => {
    // validate first

    const { title, author, ISBN, price, quantity, desc, category, img } = req.body;

    // encode image
    const encodedImage = img.toString('base64');

    // store book details
    const book = new Book({
        title: title,
        author: author,
        ISBN: ISBN,
        price: price,
        quantity: quantity,
        desc: desc,
        category: category,
        img: encodedImage
    });
    await book.save()
    .then((doc) => {
        console.log(`The document has been saved: ${doc}`);
        res.send({
            success: "Book saved successfully."
        });
    })
    .catch(err => {
        console.log(`Document could not be saved. Error: ${err}`);
        res.send({
            error: "Book could not be saved."
        });
    });
});

router.put('/:id', async (req, res) => {
    // validate first
    let book = await Book.findById(req.params.id);
    const { title, author, ISBN, price, quantity, desc, category } = req.body;
    book.title = title;
    book.author = author;
    book.price = price;
    book.quantity = quantity;
    book.desc = desc;
    book.category = category;
    await book.save()
    .then((doc) => {
        console.log(`The document has been saved: ${doc}`);
        res.send({
            success: "Book updated successfully."
        });
    })
    .catch(err => {
        console.log(`Document could not be saved. Error: ${err}`);
        res.send({
            error: "Book could not be updated."
        });
    });
});

router.delete('/:id', async (req, res) => {
    await Book.deleteOne({ "_id": Object(req.params.id) })  // there is no deleteById method
    .then(() => {
        console.log(`The document has been deleted`);
        res.send({
            success: "Deleted successfully."
        });
    })
    .catch(err => {
        console.log(`The document could not be deleted. Error: ${err}`);
        res.send({
            error: "Book could not be deleted."
        });
    });
});

module.exports = router;
