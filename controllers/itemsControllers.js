const { validationResult } = require("express-validator");

const Item = require("../models/item")
const { ApiResponseCodes } = require('../helpers/responseHelpers')


exports.createItem = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(ApiResponseCodes.BAD_REQUEST).json({ errors: errors.array() });
    }
    const { name, stock } = req.body;

    try {
        const newItem = new Item({ name, stock });
        await newItem.save();
        res.status(ApiResponseCodes.CREATED).json({ message: 'Item added successfully', item: newItem });
    } catch (error) {
        res.status(ApiResponseCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error adding item', error });
    }
}


exports.viewItems = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(ApiResponseCodes.BAD_REQUEST).json({ errors: errors.array() });
    }

    const { page = 1, limit = 10 } = req.query; // Default values: page 1, limit 10

    try {
        const items = await Item.find()
            .sort({ createdAt: -1 }) 
            .skip((page - 1) * limit) 
            .limit(parseInt(limit)); 

        const totalItems = await Item.countDocuments(); 

        res.status(ApiResponseCodes.ACCEPTED).json({
            items,
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: parseInt(page),
        });
    } catch (error) {
        res.status(ApiResponseCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error retrieving items', error });
    }
}