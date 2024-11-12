import mongoose, { Schema } from "mongoose";

const JobSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    positionType: {
        type: String,
        required: true
    },
    workExperience: {
        type: String
    },
    skill: [{
        type: String
    }],
    location: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    applications: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Application'
        }
    ]
}, { timestamps: true });

export const Job = mongoose.model("Job", JobSchema);
