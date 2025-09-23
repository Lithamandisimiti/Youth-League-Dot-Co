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
    const { name, email, pass } = payload;
    if (!name || !email || !pass) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "name, email and pass are required" }) };
    }

    // TODO: replace with real signup (migrate from YLphp-backend)
    return { statusCode: 200, headers, body: JSON.stringify({ ok: true, message: "Signed up", email, name }) };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Server error" }) };
  }
};


