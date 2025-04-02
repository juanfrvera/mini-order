import { generateToken, verifyAndDecryptToken } from "./lib/auth";
import { RepoCoordinator } from "./lib/repo-coordinator";

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const repo = new RepoCoordinator();

// Middleware to add CORS headers
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// A shop publishing its catalog for the first time
app.post("/publishCatalog", async (req, res) => {
  console.log(req);
  const { shopUrl, items, phone } = req.body;
  console.log("Received items:", JSON.stringify(items));
  console.log("Received phone:", phone);

  repo.getCatalogRepo().saveCatalogForShop(shopUrl, items, phone);

  // This admin will have a token to edit their catalog
  const catalogEditToken = await generateToken({ sub: shopUrl });

  res.status(200).json({
    message: "Catalog published successfully!",
    catalogEditToken,
  });
});

// A final user getting the catalog of a shop
app.get("/catalog/:shopUrl", (req, res) => {
  const { shopUrl } = req.params; // Extract the 'url' path parameter
  console.log("Requested catalog URL:", shopUrl);

  const catalog = repo.getCatalogRepo().getCatalogForShop(shopUrl); // Get the catalog for the shop
  if (catalog) {
    res.status(200).json(catalog); // Return the catalog if it exists
  } else {
    res.status(404).json({ message: "Catalog not found" }); // Return 404 if not found
  }
});

app.put("/catalog/:shopUrl", async (req, res) => {
  const { shopUrl } = req.params; // Extract the 'url' path parameter
  const { items, phone, catalogEditToken } = req.body;
  console.log("Requested catalog URL:", shopUrl);
  console.log("Received items:", JSON.stringify(items));
  console.log("Received phone:", phone);

  // Verify the token and quit if invalid
  const result = await verifyAndDecryptToken(catalogEditToken);
  if (
    !result ||
    !result.payload ||
    !result.payload.sub ||
    result.payload.sub !== shopUrl
  ) {
    return res.status(403).json({ message: "Invalid token" });
  }

  // Save new catalog
  repo.getCatalogRepo().saveCatalogForShop(shopUrl, items, phone);

  res.status(200).json({
    message: "Catalog updated successfully!",
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
