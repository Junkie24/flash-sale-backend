const { validationResult } = require("express-validator");
const mongoose = require("mongoose")

const Sale = require("../models/sale")
const Item = require("../models/item")
const {ApiResponseCodes} = require('../helpers/responseHelpers')


exports.createSale = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(ApiResponseCodes.BAD_REQUEST).json({ errors: errors.array() });
    }

    const { item_id } = req.params;
    let { quantity } = req.body;

    quantity = Number(quantity)

     // Start a session to handle the transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const item = await Item.findOneAndUpdate(
            { _id: item_id, stock: { $gte: quantity } }, 
            { $inc: { stock: -quantity } },
            { new: true, session } 
        );

        if (!item) {
            await session.abortTransaction();
            session.endSession();
            return res.status(ApiResponseCodes.NOT_FOUND).json({ message: 'Item not found or insufficient stock' });
        }

        
        const sale = new Sale({ item: item_id, quantity });
        await sale.save({ session });

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        res.status(ApiResponseCodes.CREATED).json({ message: 'Sale successful', sale });

    } catch (error) {
        // Abort the transaction in case of any error
        await session.abortTransaction();
        session.endSession();
        console.log(error)
        res.status(ApiResponseCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error', error });
    }

}