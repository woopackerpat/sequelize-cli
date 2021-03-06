const createError = require("../utils/createError");
const { Todo, User } = require("../models");

exports.createTodo = async (req, res, next) => {
  try {
    const { title, completed, dueDate, userId } = req.body;

    const user = await User.findOne({ where: { id: userId ?? 0 } });
    if (!user) {
      createError("User not found", 400);
    }

    // if (!title) { //title มีการ validate ใน model อยู่แล้ว
    //   createError("title should not be null");
    // }
    // if (!userId) { //validate ตอน findone
    //   createError("userId should not be null");
    // }
    const todo = await Todo.create({ title, completed, dueDate, userId });
    res.status(201).json({ todo });
  } catch (err) {
    next(err);
  }
};

exports.getAllTodo = async (req, res, next) => {
  // const result = await Todo.findAll();
  // res.json(result);
  const { userId } = req.body;
  try {
    const todos = await Todo.findAll({ where: { userId } });
    res.json({ todos: todos });
  } catch (err) {
    next(err);
  }
};

exports.getTodoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const todo = await Todo.findOne({
      where: { id, userId },
    });
    res.json({ todo });
  } catch (err) {
    next(err);
  }
};

exports.deleteTodo = async (req, res, next) => {
  // try {
  //   const { id } = req.params;
  //   const allTodos = Todo.findAll({
  //     attributes: ["id"],
  //   });
  //   if (allTodos.find((el) => el.id === id)) {
  //     createError("user not found");
  //   }

  //   const result = Todo.destroy({ where: { id } });
  // } catch (err) {
  //   next(err);
  // }

  try {
    const { id } = req.params;
    const { userId } = req.body;
    const result = await Todo.destroy({ where: { id, userId } });
    if (result === 0) {
      createError("Todo with this id is not found", 400);
    }
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, completed, dueDate, userId } = req.body;
    // const newValue = {};
    // if (!title) {
    //   newValue.title = title
    // }
    // if (!completed) {
    //   newValue.completed = completed
    // }

    // if (!dueDate) {
    //   newValue.dueDate = dueDate;
    // }
    const result = await Todo.update(
      { title, completed, dueDate },
      { where: { id, userId } }
    );
    if (result[0] === 0) {
      createError('Todo with this id is not found', 400)
    }
    res.json({message: 'update todo succes'})
  } catch (err) {
    next(err)
  }
};
