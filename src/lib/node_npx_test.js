import https from "https";

https.get("https://fakestoreapi.com/products", res => {
  console.log("Status code:", res.statusCode);
  res.on("data", chunk => console.log("Received data length:", chunk.length));
}).on("error", err => {
  console.error("Error:", err.message);
});