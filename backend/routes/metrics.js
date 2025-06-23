const express = require("express");
const router = express.Router();
const Defect = require("../models/Defects");
const multer = require('multer');
const fs = require('fs');

// Create a new defect
router.post('/', async (req, res) => {
  try {
    console.log('in post: ', JSON.stringify(req.body));
    const defect = new Defect(req.body);
    await defect.save();
    res.status(201).json(defect);
  } catch (err) {
    console.log('error in post', err.message);
    res.status(400).json({ error: err.message });
  }
});

// Get all defects
router.get('/', async (req, res) => {
  try {
    const defects = await Defect.find();
    res.status(200).json(defects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get metrics
router.get('/metrics', async (req, res) => {
  try {
    const total = await Defect.countDocuments();
    const types = await Defect.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 }
        }
      }
    ]);

    const metrics = {
      total,
      byType: types.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {})
    };

    res.status(200).json(metrics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Use multer for file parsing
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const raw = fs.readFileSync(req.file.path);
    const json = JSON.parse(raw);

    const items = Array.isArray(json) ? json : [json];

    const toInsert = items.map(item => ({
      type: item.defect_type,
      timestamp: item.timestamp || new Date().toISOString(),
      location: {
        lat: item.coordinates?.[0],
        lng: item.coordinates?.[1]
      }
    }));

    await Defect.insertMany(toInsert);

    res.status(200).json({ message: `${toInsert.length} defects uploaded.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to process file' });
  }
});

module.exports = router;
