const { MongoClient } = require('mongodb');

// Connection URI
const uri = "mongodb://127.0.0.1:27017";

// Database and Collection Names
const dbName = "myDatabase";
const collectionName = "certificates";

// MongoDB Client
const client = new MongoClient(uri, {
  tls: true,
  tlsCAFile: "D:\\MongoDB\\Server\\8.0\\certificates\\ca.pem",
  tlsCertificateKeyFile: "D:\\MongoDB\\Server\\8.0\\certificates\\server.pem",
  tlsInsecure: true
});

async function run() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    // Access Database and Collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Insert a Document
    const result = await collection.insertOne({
      name: "server-cert-ext",
      certificate: `-----BEGIN CERTIFICATE-----
MIIDsjCCApoCAQEwDQYJKoZIhvcNAQELBQAwgZwxCzAJBgNVBAYTAlVTMRMwEQYD
... (truncated for brevity) ...
-----END CERTIFICATE-----`
    });
    console.log("Document inserted:", result.insertedId);

    // Query the Collection
    const documents = await collection.find().toArray();
    console.log("Documents:", documents);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  } finally {
    // Close the Connection
    await client.close();
  }
}

run();