import mongoose, { Schema } from "mongoose";

const companySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    market: {
        type: String,
        required: true
    },
    employee_number: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps:true});

export const Company = mongoose.model("Company", companySchema);