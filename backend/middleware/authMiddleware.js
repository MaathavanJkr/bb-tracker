const jwt = require('jsonwebtoken')
const config = require("../config");

exports.adminAuth = (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from the header
            token = req.headers.authorization.split(' ')[1]
            // Verify 
            jwt.verify(token, config.jwtSecret, (err, decodedToken) => {
                if (err) {
                    return res.status(401).json({ message: "Not authorized" })
                } else {
                    if (decodedToken.role !== "admin") {
                        return res.status(401).json({ message: "Not authorized" })
                    } else {
                        req.user = decodedToken.id
                        next()
                    }
                }
            })
        } catch (error) {
            console.log(error)
            return res.status(401).json({ message: "Not authorized" })
        }
    }
    if (!token) {
        return res.status(401).json({ message: "Not authorized" })
    }
}

exports.userAuth = (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from the header
            token = req.headers.authorization.split(' ')[1]
            // Verify 
            jwt.verify(token, config.jwtSecret, (err, decodedToken) => {
                if (err) {
                    return res.status(401).json({ message: "Not authorized" })
                } else {
                    if (decodedToken.role) {
                        req.user = decodedToken.id
                        next()
                    } else {
                        return res.status(401).json({ message: "Not authorized" })
                    }
                }
            })
        } catch (error) {
            console.log(error)
            return res.status(401).json({ message: "Not authorized" })
        }
    }
    if (!token) {
        return res.status(401).json({ message: "Not authorized" })
    }
}