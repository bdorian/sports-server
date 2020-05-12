// Require:
var postmark = require("postmark");

// Send an email:
var client = new postmark.Client("49dd1b43-ee30-482d-81fa-1d12d056eb5b");

client.sendEmail({
  "From": "info@fsmelees.com",
  "To": "info@fsmelees.com",
  "Subject": "Test",
  "TextBody": "Hello from Postmark!"
});
