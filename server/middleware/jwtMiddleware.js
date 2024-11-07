const jwt = require('jsonwebtoken');

// Example payload
const payload = { foo: 'bar' };

// Creation
const token = jwt.sign(payload, process.env.PRIVATE_KEY);
console.log('Generated Token:', token);

// Verification (synchronous)
try {
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    console.log('Decoded Token:', decoded);
} catch (err) {
    console.error("Token verification failed:", err.message);
}

// Verification (asynchronous with callback)
jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
    if (err) {
        console.error("Token verification failed:", err.message);
    } else {
        console.log('Decoded Token (Callback):', decoded.foo);
    }
});

// Invalid token example
try {
    const decoded = jwt.verify(token, 'wrong-secret');
} catch (err) {
    console.error("Invalid token:", err.message);
}
