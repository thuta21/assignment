import Event from '../models/Event.js';
import { body, validationResult } from 'express-validator';

const create = async (req, res) => {
  // Validate input fields
  await body('title').notEmpty().withMessage('Event title is required').run(req);
  await body('date').isDate().withMessage('Date must be a valid date').run(req);
  await body('description').optional().isLength({ max: 500 }).withMessage('Description too long').run(req);
  await body('location').notEmpty().withMessage('Location is required').run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, date, location } = req.body;
    const organizerId = req.user.id;

    // Handle the uploaded image
    const image = req.file ? req.file.filename : null; // Save the filename or null if no file was uploaded

    const event = await Event.create({
      title,
      description,
      date,
      location,
      organizerId,
      images: image,  // Save the image (nullable)
    });

    res.status(201).json(event);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create event' });
  }
};

const index = async (req, res) => {
  console.log('start');

  console.log(process.env.BASE_URL);

  console.log('end');


  try {
    const events = await Event.findAll();

    // Assuming your images are served from a specific URL
    const eventsWithImageUrl = events.map(event => {
      return {
        ...event.toJSON(),
        imageUrl: `${process.env.BASE_URL}/uploads/${event.images}`, // Adjust this path as necessary
      };
    });

    res.status(200).json(eventsWithImageUrl);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve events' });
  }
};

const show = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    // Include the image URL
    const eventWithImageUrl = {
      ...event.toJSON(),
      imageUrl: `${process.env.BASE_URL}/uploads/${event.images}`, // Adjust this path as necessary
    };
    res.status(200).json(eventWithImageUrl);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve event' });
  }
};

const update = async (req, res) => {
  // Validate input fields
  await body('title').optional().notEmpty().withMessage('Event title is required').run(req);
  await body('date').optional().isDate().withMessage('Date must be a valid date').run(req);
  await body('location').optional().notEmpty().withMessage('Location is required').run(req);
  await body('description').optional().isLength({ max: 500 }).withMessage('Description too long').run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, date, location } = req.body;

    const event = await Event.findByPk(req.params.id);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (event.organizerId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized action' });
    }

    // Handle the uploaded image if a new one is provided
    const image = req.file ? req.file.filename : event.images;  // Update image only if a new file is uploaded

    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date || event.date;
    event.location = location || event.location;
    event.images = image;  // Update image

    await event.save();
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update event' });
  }
};

const destroy = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (event.organizerId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized action' });
    }

    await event.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
};

export default { create, index, show, update, destroy };
