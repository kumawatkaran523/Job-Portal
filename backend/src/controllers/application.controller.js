import { Application } from "../models/application.model.js"
import { Job } from "../models/job.model.js";

const applyJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const applicant = req.user.id;
        const { location, whatInterestAboutWork, yearOfExperience} = req.body;

        if (!jobId) {
            return res.status(400).json({
                message: "Job id is not available in the URL.",
                success: false
            });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(400).json({
                message: "Job not found",
                success: false
            });
        }

        const existingApplication = await Application.findOne({ job: jobId, applicant });
        if (existingApplication) {
            return res.status(400).json({
                message: "Already applied for the job",
                success: false
            });
        }

        const appliedToJob = await Application.create({
            job: jobId,
            applicant,
            location,
            yearOfExperience,
            whatInterestAboutWork,
        });

        if (!appliedToJob) {
            return res.status(400).json({
                message: "Error while applying to the job",
                success: false
            });
        }

        job.applications.push(appliedToJob._id);
        await job.save();

        return res.status(200).json({
            message: "Successfully applied to the job",
            success: true
        });

    } catch (error) {
        console.error(error); 
        return res.status(500).json({
            message: "Error while applying to the job",
            success: false
        });
    }
};


const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.user.id;

        const applications = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: 'job', 
            options: { sort: { createdAt: -1 } }, 
            populate: {
                path: 'company',
                options: { sort: { createdAt: -1 } },
            }
        });

        if (!applications || applications.length === 0) {
            return res.status(400).json({
                message: "No jobs found that you have applied to.",
                success: false
            });
        }

        return res.status(200).json({
            applications,
            success: true
        });
    } catch (error) {
        console.error(error); 
        return res.status(500).json({
            message: "Error while fetching applied jobs",
            success: false
        });
    }
};

const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId).populate({
            path: 'applications', 
            populate: {
                path: 'applicant', 
                // select: 'name email' 
            }
        }).sort({ createdAt: -1 });

        if (!job) {
            return res.status(404).json({
                message: 'Job not found.',
                success: false
            });
        }

        return res.status(200).json({
            job,
            success: true
        });
    } catch (error) {
        console.error(error); 
        return res.status(500).json({
            message: 'Error retrieving applicants',
            success: false
        });
    }
};

const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        const application = await Application.findByIdAndUpdate(applicationId, {
            $set: {
                status: status.toLowerCase()
            }
        }, {
            new: true
        });

        if (!application) {
            return res.status(404).json({
                message: "Application not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Status updated successfully.",
            data: application,
            success: true,
        });
    } catch (error) {
        console.error(error); 
        return res.status(500).json({
            message: "Error updating application status",
            success: false
        });
    }
};

export {
    applyJob,
    getApplicants,
    getAppliedJobs,
    updateStatus
};
