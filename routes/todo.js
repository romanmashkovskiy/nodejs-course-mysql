const {Router} = require('express');
const Todo = require('../models/todo');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const todos = await Todo.findAll({raw: true});
        res.status(200).json({todos});
    } catch (e) {
        res.status(500).json({
            message: 'server error'
        })
    }
});

router.post('/', async (req, res) => {
    try {
        const {title} = req.body;
        const todo = await Todo.create({
            title,
            done: false
        });
        res.status(201).json({todo});
    } catch (e) {
        res.status(500).json({
            message: 'server error'
        })
    }
});

router.put('/:id', async (req, res) => {
    try {
        const todo = await Todo.findByPk(req.params.id);
        todo.done = true;
        await todo.save();
        res.status(200).json({todo});
    } catch (e) {
        res.status(500).json({
            message: 'server error'
        })
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Todo.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({message: 'delete success'});
    } catch (e) {
        res.status(500).json({
            message: 'server error'
        })
    }
});

module.exports = router;