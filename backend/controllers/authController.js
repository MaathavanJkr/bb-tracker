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
        let role = req.body.role;
        let password = req.body.password;

        bcrypt.hash(password, 10).then((hash) => {
            let usernameQuery = "SELECT * FROM `users` WHERE user_name = '" + username + "'";

            db.query(usernameQuery, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                if (result.length > 0) {
                    return res.json("username exist");
                } else {
                    // send the player's details to the database
                    let query = "INSERT INTO `users` (first_name, last_name, position, number, role, user_name, hash) VALUES ('" +
                        first_name + "', '" + last_name + "', '" + position + "', '" + number + "', '" + role + "', '" + username + "', '" + hash + "')";
                    db.query(query, (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.json({
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
            })
        }

        let usernameQuery = "SELECT * FROM `users` WHERE user_name = '" + username + "'";

        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length == 0) {
                return res.json("username doesnot exist");
            } else {
                let user = result[0]
                bcrypt.compare(password, user.hash).then(function (result) {
                    result
                        ? res.status(200).json({
                            message: "Login successful",
                            user,
                            token: generateJwtToken({ id: user.id, username: user.username, role: user.role })
                        })
                        : res.status(400).json({ message: "Login not succesful" })
                    return
                })
            }
        });
    }
};

// Generate JWT
const generateJwtToken = (data) => {
    const maxAge = 3 * 60 * 60;
    return jwt.sign(data, config.jwtSecret, {
        expiresIn: maxAge
    })
}