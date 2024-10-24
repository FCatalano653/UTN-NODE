import rateLimit from 'express-rate-limit'

const rateLimiterConfig = rateLimit({
    windowsMs: 1000 * 60 * 7,
    max: 500,
    message: "Too Many requests from this IP, try again later"
})

export default rateLimiterConfig