import { verify } from 'jsonwebtoken';

const escapeHtml = (text) => {
  return text.replace(/[&<>"']/g, function (match) {
    switch (match) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case "'":
        return '&#039;';
      default:
        return match;
    }
  });
};

function sanitizeQueryParams(params) {
  for (const key in params) {
    if (typeof params[key] === 'string') {
      params[key] = escapeHtml(params[key]);
    }
  }
}


function verifyRequest(req, res, next) {
  const bearerPresent = req.headers.authorization?.match(/Bearer (.*)/);

  if (!bearerPresent) {
    return res.status(401).json({ error: 'Bearer token missing' });
  }

  const token = bearerPresent[1];

  const contentType = req.headers['content-type'] || req.headers['Content-Type'];

  if (
    contentType &&
    !/application\/json/i.test(contentType) &&
    req.body
  ) {
    return res.status(400).json({ error: 'Invalid request format. Request body must be in JSON format.' });
  }

  try {
    // Verify the token using the jwt.verify() method
    const decoded = verify(token, 'your-secret-key'); // Replace 'your-secret-key' with your actual secret key

    // Sanitize the query parameters
    sanitizeQueryParams(req.query);

    // Attach the sanitized decoded token to the request object for later use, if needed
    req.user = decoded;

    // Call next() to proceed to the next middleware/route handler
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

export default verifyRequest;
