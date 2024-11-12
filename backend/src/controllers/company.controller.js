import asyncHandler from 'express-async-handler'
import { Company } from '../models/company.model.js';

const registerCompany = asyncHandler(async (req, res) => {
    try {
        const { name, description, website, location, market, employee_number } = req.body;

        if (!name || !description || !website || !location || !employee_number || !market) {
            return res.status(400).json({
                message: "All compulsory fields are required",
                success: false
            });
        }

        let company = await Company.findOne({ name });

        if (company) {
            return res.status(400).json({
                message: "You can't register the same company.",
                success: false
            });
        }

        // Create a new company with all provided fields
        company = await Company.create({
            name,
            description,
            website,
            location,
            market,
            employee_number,
            userId: req.user._id
        });

        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        });
    } catch (error) {
        console.error("Error registering company:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
});

const getCompany = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;
        const companies = await Company.find({ userId });
        if (companies.length === 0) {
            return res.status(400).json({
                message: "No company registered yet",
                success: false
            });
        }

        return res.status(200).json({
            message: "Fetched all registered company successfully",
            success: true,
            data: companies
        });
    } catch (error) {
        console.log("")
    }
})

const getCompanyById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: "Id is not available in the URL or could not be fetched",
                success: false,
            });
        }
        const company = await Company.findById(id);
        if (!company) {
            return res.status(404).json({
                message: "No company is registered with such ID",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Company fetched successfully",
            success: true,
            data: company
        });
    } catch (error) {
        console.error("Error while fetching single company:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
});

const updateCompany = asyncHandler(async (req, res) => {
    try {
        const { name, description, website, location, market, employee_number } = req.body;
    
        // Check if all required fields are provided
        if (!name || !description || !website || !location || !employee_number || !market) {
            return res.status(400).json({
                message: "All compulsory fields are required",
                success: false
            });
        }
    
        const company = await Company.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    name,
                    description,
                    website,
                    location,
                    market,
                    employee_number
                }
            },
            { new: true }
        );
    
        if (!company) {
            return res.status(404).json({
                message: "Company not found or could not be updated",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Company updated successfully",
            success: true,
            data: company
        });
    } catch (error) {
        console.error("Error while updating the company:", error); 
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
});


export {
    registerCompany,
    getCompany,
    getCompanyById,
    updateCompany
}
