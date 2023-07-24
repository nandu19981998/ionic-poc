import express from "express";
import { join } from "path";
import serveStatic from "serve-static";
import { readFileSync } from "fs";
import cors from "cors";
import { getStores, getPaginatedStores,searchStores } from "./helper/store-helper.js";
const PORT = parseInt(
    process.env.BACKEND_PORT || process.env.PORT || "3001",
    10
  );


const STATIC_PATH = 
  process.env.NODE_ENV === "prod"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;


const app = express();
const corsOptions = {
  origin: "*", // Allow all origins
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", 
  preflightContinue: false,
  optionsSuccessStatus: 204
}

app.use(cors(corsOptions));

app.get('/stores', async (req, res) => {
  //const stores = await getStores();
  const page = parseInt(req.query.page) || 1; // current page number
  const limit = parseInt(req.query.limit) || 5; // items per page
  const data = await getPaginatedStores(page, limit);
  res.json(data);
});

app.get('/search', async (req, res) => {
  //const stores = await getStores();
  const term = req.query.term 
  
  const data = await searchStores(term);;
  res.json(data);
});

app.get('/storeAvailability', (req, res) => {
  const { sku, latitude, longitude, limit } = req.query;

  // Geospatial query logic to get nearest stores
  // You might need to store your lat/long data in a specific format to allow for efficient geospatial querying.

  const params = {
    TableName: 'Stores',
    // Your query params go here
  };

  // docClient.query(params, (err, data) => {
  //   if (err) {
  //     console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
  //     res.status(500).json(err);  // An error occurred
  //   } else {
  //     console.log("Query succeeded.");
  //     res.status(200).json(data);  // Successful query
  //   }
  // });
});



// Serve static files from the React app

let isProd = process.env.HOST !== undefined;
console.log("isProd = ",isProd);
// Serve static files from the React app
app.use(serveStatic(STATIC_PATH, { index: false }));
app.use("/*", async (_req, res, _next) => {
  console.log("Serve Static Path: ",STATIC_PATH);
    return res
      .status(200)
      .set("Content-Type", "text/html")
      .send(readFileSync(join(STATIC_PATH, "index.html")));
  });

// app.use(serveStatic(STATIC_PATH, { 
//   index: false,
//   setHeaders: (res, path) => {
//     if (process.env.NODE_ENV === 'prod') {
//       const newPath = '/prod' + res.req.originalUrl;
//       res.set('Content-Location', newPath);
//     }
//   }
// }));

// app.use("/*", async (_req, res, _next) => {
//   console.log("Serve Static Path: ",STATIC_PATH);
//   return res
//     .status(200)
//     .set("Content-Type", "text/html")
//     .send(readFileSync(join(STATIC_PATH, "index.html")));
// });

app.listen(PORT);
console.log("HOST -> ",process.env.HOST);
console.log(`Server is listening on port ${PORT}`);

export default app;
