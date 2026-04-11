import mongoose from 'mongoose'

const appSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    company: {
        type: String
    },
    role: {
        type: String
    },
    status: {
        type: String,
        enum: ["applied", "Phone Screen", "Interview", "Offer", "Rejected"],
        default: "applied"
    },
    dateapplied: {
        type: Date
    },
    notes: {
        type: String
    },
    salaryRange: {
        type: String
    }
}, { timestamps: true })

const appModel = mongoose.model("App", appSchema);

export default appModel
