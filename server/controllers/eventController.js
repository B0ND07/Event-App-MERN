const Event = require("../models/EventSchema");

exports.createEvent = async (req, res) => {
  try {
    const newEvent = req.body;
    const savedEvent = await Event.create(newEvent);
    res.json(savedEvent);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const id = req.params.id;
    await Event.findByIdAndDelete(id);
    res.json("deleted");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUserEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const getEvent = await Event.find({username: id});
    res.json(getEvent);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const getEvent = await Event.find({_id: id});
    res.json(getEvent);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.getEvents = async (req, res) => {
  try {
    const updateEvent = await Event.find();
    res.json(updateEvent);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.searchEvents = async (req, res) => {
  try {
    const { query } = req.params;
    const foundEvents = await Event.find({ city: query });
    if (foundEvents.length === 0) {
      return res.json("No Events found in the specified city");
    }
    res.json(foundEvents);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


