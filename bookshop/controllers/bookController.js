const axios = require('axios');

exports.getBooks = async (req, res) => {
  try {
    const response = await axios.get(`${process.env.EXTERNAL_API_URL}/books`);
    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getBookByISBN = (req, res) => {
  axios
    .get(`${process.env.EXTERNAL_API_URL}/books/isbn/${req.params.isbn}`)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send('Server error');
    });
};

exports.getBooksByAuthor = async (req, res) => {
  try {
    const response = await axios.get(`${process.env.EXTERNAL_API_URL}/books/author/${req.params.author}`);
    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getBooksByTitle = async (req, res) => {
  try {
    const response = await axios.get(`${process.env.EXTERNAL_API_URL}/books/title/${req.params.title}`);
    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
