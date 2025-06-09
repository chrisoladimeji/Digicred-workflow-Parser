// notify-slack.js
require('dotenv').config();
const https = require('https');

const webhookUrl = process.env.SLACK_WEBHOOK_URL;
if (!webhookUrl) {
  console.error("Error: SLACK_WEBHOOK_URL is not defined in your .env file.");
  process.exit(1);
}

const testResult = process.argv[2]; // 'success' or 'failure'
const color = testResult === 'success' ? '#36a64f' : '#ff0000';
const message = testResult === 'success' ? 'All tests passed! ✅' : 'Some tests failed! ❌';
const title = "DigiCred Holdings - Unit Test Results";

const payload = JSON.stringify({
  attachments: [{
    fallback: `${title}: ${message}`,
    color: color,
    title: title,
    text: message,
    ts: Math.floor(new Date().getTime() / 1000)
  }]
});

const options = {
  method: 'POST',
  header: { 'Content-Type': 'application/json' },
};

console.log('Sending Slack notification...');

const req = https.request(webhookUrl, options, (res) => {
  if (res.statusCode >= 400) {
    console.error(`Error sending Slack notification: Status Code ${res.statusCode}`);
  } else {
    console.log('Slack notification sent successfully.');
  }
});

req.on('error', (e) => {
  console.error('Error with Slack request:', e.message);
});

req.write(payload);
req.end();