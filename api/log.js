// api/logs.js
import { hitLogs } from "./hit.js";

export default async function handler(req, res) {
  res.status(200).json({
    status: "ok",
    logs: hitLogs
  });
}
