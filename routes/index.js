const express = require('express');

const salesRoutes = require('./salesRoutes');
const itemRoutes = require('./itemRoutes');

const apiRoutes = express.Router();

apiRoutes.use('/sales', salesRoutes);
apiRoutes.use('/items', itemRoutes);

function startRoutes(app) {
    app.use('/api', apiRoutes);
}

module.exports = { startRoutes };
