import { DynamoDBClient, ListTablesCommand } from "@aws-sdk/client-dynamodb";
import express from "express";
import cors from "cors";
import dbRoutes from "./routes/dbRoutes.js";

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json());
app.use(cors());

app.use("/db", dbRoutes);

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  //Log a message to terminal to show that connection is successful
  console.log(`Listening on port ${PORT}`);

  //Test that we have access to our DB tables.
  (async () => {
    const client = new DynamoDBClient({ region: "ap-southeast-2" });
    const command = new ListTablesCommand({});
    try {
      const results = await client.send(command);
      console.log(results.TableNames.join("\n"));
    } catch (err) {
      console.error(err);
    }
  })();
});
