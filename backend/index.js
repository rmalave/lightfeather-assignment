import fetch from 'node-fetch';
import express from 'express';

const PORT = process.env.port || 3001;

const app = express();
app.use(express.json());

const fetchManagers = async () => {
    const res = await fetch('https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers');
    const data = await res.json();
    return data;
}

app.get('/api/supervisors', (req, res) => {
    fetchManagers().then(m => res.send(m));
});

app.post('/api/supervisors', (req, res) => {
    const { body } = req;
    res.send(body);
});

app.listen(PORT, () => console.log('listening on port', PORT));