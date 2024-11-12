import { Job } from '../models/job.model.js'

const postJob = async (req, res) => {
    try {
        const { title, description, positionType, workExperience, skill, location, salary, position, company } = req.body;
        const userId = req.user._id;

        if (!title || !description || !positionType || !workExperience || !skill || !location || !salary || !position || !company) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            });
        }

        const job = await Job.create({
            title,
            description,
            positionType,
            workExperience,
            skill: skill.split(","),
            location,
            salary: Number(salary),
            position,
            company,
            created_by: userId
        });

        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error. Please try again later.",
            success: false
        });
    }
}
const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query)
            .populate({
                path: "company"
            }).sort({ createdAt: -1 });

        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId)
            .populate({
                path: "applications"
            });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}
const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.user.id;
        console.log(adminId);
        const jobs = await Job.find({ created_by: adminId })
            .populate({
                path: 'company',
                // createdAt:-1
            });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export {
    postJob,
    getAllJobs,
    getJobById,
    getAdminJobs
}