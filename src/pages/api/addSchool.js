// pages/api/addSchool.js
import db from '../../../db';
// import fs from 'fs';
import path from 'path';
const formidable = require("formidable");

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm({
      uploadDir: './public/schoolImages',
      keepExtensions: true,
      filename: (name, ext, part) => `${Date.now()}${path.extname(part.originalFilename)}`,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form data:', err);  // Log errors if any
        return res.status(500).json({ error: 'Error parsing form data' });
      }

      // Log the incoming fields and files
      console.log('Fields:', fields);
      console.log('Files:', files);

      // Extract values correctly
      const name = fields.name[0];
      const address = fields.address[0];
      const city = fields.city[0];
      const state = fields.state[0];
      const contact = fields.contact[0];
      const email_id = fields.email_id[0];
      const image = files.image ? `/schoolImages/${path.basename(files.image[0].filepath)}` : null;

      if (!name || !address || !city || !state || !contact || !email_id || !image) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      try {
        const [result] = await db.execute(
          'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [name, address, city, state, contact, image, email_id]
        );
        res.status(201).json({ message: 'School added successfully', id: result.insertId });
      } catch (error) {
        console.error('Database error:', error);  // Log database errors if any
        res.status(500).json({ error: error.message });
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
