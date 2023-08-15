const Data = require('../models/dataModel');

exports.getData = async (req, res) => {
  try {
    const filters = req.query;
    const data = await Data.find(filters);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};