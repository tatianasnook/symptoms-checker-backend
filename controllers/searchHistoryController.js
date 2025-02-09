import SearchHistoryModel from '../models/searchHistoryModel.js';

//GET
export const getRecord = async (req, res) => {
    try {
        const records = await SearchHistoryModel.find().sort({ date: -1});
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch search history" });
    }
}

//POST
export const saveRecord = async (req, res) => {
    try {
        const { symptoms, conditions, date } = req.body;
        const newRecord = await SearchHistoryModel.create({ symptoms, conditions, date });
        res.status(201).json(newRecord);
    } catch (error) {
        res.status(500).json({ error: "Failed to save search history" });
    }
}

//DELETE
export const deleteRecord = async (req, res) => {
    try {
        const { id } = req.params;
        await SearchHistoryModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Record deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete record" });
    }
};

