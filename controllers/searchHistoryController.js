import SearchHistoryModel from '../models/searchHistoryModel.js';

//GET
export const getRecord = async (req, res) => {
    const myRecord = await SearchHistoryModel.find();
    res.send(myRecord)
}

//POST
export const saveRecord = async (req, res) => {
    try {
        const { text } = req.body;
        const newRecord = await SearchHistoryModel.create({ text });
        console.log('Record added:', newRecord);
        res.status(201).json(newRecord);
    } catch (error) {
        res.status(500).json({ error: "Failed to save search history" });
    }
}
