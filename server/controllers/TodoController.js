import Todo from '../models/Todo.js';

const index = async (req, res) => {
    const todos = await Todo.findAll();
    return res.status(200).json(todos);
};

const show = async (req, res) => {
	const todo = await Todo.findOne({
        where: {
            id:req.params.id
        }
    });

    res.status(200).json(todo)
};

const create = async (req, res) => {
	const todo = await Todo.create({
		title:req.body.title,
		description:req.body.description
	});

	res.status(201).json(todo)
};

const destroy = async (req, res) => {
	await Todo.destroy({
		where:{
			id:req.params.id
		}
	});

	res.status(204).send()
};

export default { index, show, create, destroy };
