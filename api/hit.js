// api/hit.js

let totalRequests = 0;
let ipCount = {};
let logs = []; // Log global in-memory

export default async function handler(req, res) {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket.remoteAddress ||
    "unknown";

  totalRequests++;
  ipCount[ip] = (ipCount[ip] || 0) + 1;

  const entry = {
    time: Date.now(),
    ip,
    total: totalRequests
  };

  logs.push(entry);

  // Limit log biar tidak terlalu besar
  if (logs.length > 2000) logs.shift();

  res.status(200).json({
    status: "ok",
    totalRequests,
    requestsByIP: ipCount[ip],
    yourIP: ip
  });
}

// Export logs for /api/logs
export const hitLogs = logs;
