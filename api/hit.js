// api/hit.js
let totalRequests = 0;
let ipCount = {};

export default async function handler(req, res) {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket.remoteAddress ||
    "unknown";

  totalRequests++;

  if (!ipCount[ip]) ipCount[ip] = 0;
  ipCount[ip]++;

  res.status(200).json({
    status: "ok",
    totalRequests,
    requestsByIP: ipCount[ip],
    yourIP: ip,
    timestamp: Date.now()
  });
}
