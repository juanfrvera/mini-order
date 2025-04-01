const express = require('express')
var cors = require('cors')
const app = express()
const port = 3000
const catalogs = {};

// Middleware to add CORS headers
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

app.post('/publishCatalog', (req, res) => {
  console.log(req);
  const { shopUrl, items, phone } = req.body;
  console.log('Received items:', JSON.stringify(items));
  console.log('Received phone:', phone);

  catalogs[shopUrl] = { items, phone };

  // Here you would typically handle the items and phone
  res.status(200).json({ message: 'Catalog published successfully!' });
});

app.get('/catalog/:shopUrl', (req, res) => {
  const { shopUrl } = req.params; // Extract the 'url' path parameter
  console.log('Requested catalog URL:', shopUrl);

  if (catalogs[shopUrl]) {
    res.status(200).json(catalogs[shopUrl]); // Return the catalog if it exists
  } else {
    res.status(404).json({ message: 'Catalog not found' }); // Return 404 if not found
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})