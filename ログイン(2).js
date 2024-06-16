const { OAuth2Client } = require('google-auth-library');
const express = require('express');
const app = express();
const client = new OAuth2Client('YOUR_CLIENT_ID');

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: 'YOUR_CLIENT_ID',
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
}

app.post('/tokensignin', (req, res) => {
    const token = req.body.idtoken;
    verify(token).then(() => {
        res.send('Successfully logged in');
    }).catch(console.error);
});

app.listen(8000, () => {
    console.log('Server started on http://localhost:8000');
});
