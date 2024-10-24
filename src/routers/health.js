import { Router } from "express";
import mongoose from "mongoose";

export const router = Router()
router.get('/', (req, res) => {
    try {
        const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'

        if(dbStatus !== 'connected'){
            return res.status(500).json({
                status: 'error',
                massage: 'Service is not healthy',
                dataBaseStatus: dbStatus
            })
        }

        res.status(200).json({
            status: 'ok',
            message: "Service is healthy"
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            massage: 'Service is not healthy',
            error: error.message
        })
    }
})