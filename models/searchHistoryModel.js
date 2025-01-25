import mongoose from 'mongoose';

const searchHistorySchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    }
})

const SearchHistoryModel = mongoose.model('SearchHistory', searchHistorySchema);
export default SearchHistoryModel;
