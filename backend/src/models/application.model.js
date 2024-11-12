import mongoose ,{Schema} from "mongoose";

const applicationSchema = new Schema({
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job',
        required:true
    },
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    location:{
        type:String,
        required:true
    },
    whatInterestAboutWork:{
        type:String,
    },
    yearOfExperience:{
        type:Number,
        required:true
    },
    // resume:{
    //     type:String,
    //     required:true,
    // },
    status: {
        type: String,
        enum: [
            'pending',     // Application submitted but not yet reviewed
            'under_review', // Application is being reviewed by the employer
            'interview_scheduled', // Candidate has been invited for an interview
            'interviewed', // Candidate has completed the interview process
            'offer_made',  // A job offer has been made to the candidate
            'accepted',    // Candidate has accepted the job offer
            'rejected',    // Application was not successful
            'withdrawn',   // Candidate withdrew their application
            'hired',       // Candidate has been hired
            'on_hold'      // Application is on hold for any reason
        ],
        default: 'pending'
    }
},{timestamps:true});

export const Application  = mongoose.model("Application", applicationSchema);