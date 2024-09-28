import Organizer from '../models/Organizer.js';

const index = async (req, res) => {
    const organizers = await Organizer.findAll();
    return res.status(200).json(organizers);
};

export default { index };
