const express = require('express');
const { sendMessage } = require('../services/whatsapp');

const router = express.Router();

// Route to send a WhatsApp message
router.post('/send', async (req, res) => {
  const { number, message } = req.body;
  try {
    await sendMessage(number, message);
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error });
  }
});

module.exports = router;
