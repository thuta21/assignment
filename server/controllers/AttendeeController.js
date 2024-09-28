import Attendee from '../models/Attendee.js';

const index = async (req, res) => {
    const attendees = await Attendee.findAll();
    return res.status(200).json(attendees);
};

export default { index };
