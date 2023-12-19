const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const config = require("../config");

module.exports = {
    registerUser: (req, res) => {
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let position = req.body.position;
        let number = req.body.number;
        let username = req.body.username;
        let role = "player";
        let password = req.body.password;

        bcrypt.hash(password, 10).then((hash) => {
            let usernameQuery = "SELECT * FROM `users` WHERE user_name = '" + username + "'";

            db.query(usernameQuery, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                if (result.length > 0) {
                    return res.json({
                        message: "Username Exist",
                        success: false
                    });
                } else {
                    // send the player's details to the database
                    let query = "INSERT INTO `users` (first_name, last_name, position, number, role, user_name, hash) VALUES ('" +
                        first_name + "', '" + last_name + "', '" + position + "', '" + number + "', '" + role + "', '" + username + "', '" + hash + "')";
                    db.query(query, (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.json({
                            success: true,
                            message: "User successfully created",
                            id: result.insertId,
                            username,
                            token: generateJwtToken({ id: result.insertId, username, role })
                        });
                    });
                }
            });
        });
    },
    loginUser: (req, res) => {
        const { username, password } = req.body
        // Check if username and password is provided
        if (!username || !password) {
            return res.status(400).json({
                message: "Username or Password not present",
                success: false
            })
        }

        let usernameQuery = "SELECT * FROM `users` WHERE user_name = '" + username + "'";

        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length == 0) {
                return res.json({
                    message: "username doesnot exist",
                    success: false
                });
            } else {
                let user = result[0]
                bcrypt.compare(password, user.hash).then(function (result) {
                    result
                        ? res.status(200).json({
                            success: true,
                            message: "Login successful",
                            user,
                            token: generateJwtToken({ id: user.id, username: user.username, role: user.role })
                        })
                        : res.status(400).json({
                            message: "Wrong Password",
                            success: false,
                        })
                    return
                })
            }
        });
    }
};

// Generate JWT
const generateJwtToken = (data) => {
    const maxAge = 31 * 24 * 60 * 60;
    return jwt.sign(data, config.jwtSecret, {
        expiresIn: maxAge
    })
}