const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const sequelize = require('./utils/database');
const routes = require('./routes/todo');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/todo', routes);

app.use((req, res, next) => {
    res.sendFile('/index.html');
});

const start = async () => {
    try {
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
};

start();