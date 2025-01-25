import mongoose from 'mongoose';

const searchHistorySchema = new mongoose.Schema({
    symptoms: {
        type: String,
        required: true
    },
    conditions: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})

const SearchHistoryModel = mongoose.model('SearchHistory', searchHistorySchema);
export default SearchHistoryModel;
