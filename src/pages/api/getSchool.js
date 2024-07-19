// pages/api/getSchools.js
import db from '../../../db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const [rows] = await db.execute('SELECT * FROM schools');
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

