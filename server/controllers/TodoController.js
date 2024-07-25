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

const statusUpdate = async (req, res) => {
	try {
	  const isCompleted = req.body.is_completed;

	  const todo = await Todo.findOne({
		where: {
		  id: req.params.id,
		},
	  });

	  if (!todo) {
		return res.status(404).json({ error: 'Todo not found' });
	  }

	  todo.is_complete = isCompleted;  // Expecting a boolean value
	  await todo.save();

	  res.status(200).json(todo);
	} catch (error) {
	  res.status(500).json({ error: 'Internal server error' });
	}
  };

const destroy = async (req, res) => {
	await Todo.destroy({
		where:{
			id:req.params.id
		}
	});

	res.status(204).send()
};

export default { index, show, create, destroy, statusUpdate };
