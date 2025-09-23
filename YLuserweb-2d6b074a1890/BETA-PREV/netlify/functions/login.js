exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method Not Allowed" }) };
  }

  try {
    const payload = JSON.parse(event.body || "{}");
    const { email, pass } = payload;
    if (!email || !pass) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "email and pass are required" }) };
    }

    // TODO: replace with real auth (from YLphp-backend-857a381148cb logic)
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, message: "Logged in", email }) };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Server error" }) };
  }
};


