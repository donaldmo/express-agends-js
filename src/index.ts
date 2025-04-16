import express from 'express';
import path from 'path';
import agenda from './lib/agenda';

const app = express();
const port = 5000;

app.use(express.json()); // ✅ necessary to get req.body as JSON

app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

app.post('/api/jobs/:jobName', async (req, res) => {
  const { jobName } = req.params;
  const data = req.body;

  try {
    // await agenda.now(jobName, data); // queue job immediately
    // await agenda.every('2 seconds', jobName, data);

    console.log(`Job '${jobName}' triggered with data:`, data);
    
    res.status(200).json({ message: `Job '${jobName}' triggered`, data });
  } catch (error) {
    console.error('Error triggering job:', error);
    res.status(500).json({ error: 'Failed to trigger job' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});