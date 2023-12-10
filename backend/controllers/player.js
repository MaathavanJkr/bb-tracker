module.exports = {
    getPlayer: (req, res) => {
        let playerId = req.params.id;
        let query = "SELECT * FROM `players` WHERE ID = '" + playerId + "'";

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                res.json(result[0]);
            } else {
                return res.json("user doesnot exist");
            }
        });
    },
    getAllPlayers: (req, res) => {
        let query = "SELECT * FROM `players`";

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(result);
        });
    },
    addPlayer: (req, res) => {
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let position = req.body.position;
        let number = req.body.number;
        let username = req.body.username;

        let usernameQuery = "SELECT * FROM `players` WHERE user_name = '" + username + "'";

        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                return res.json("username exist");
            } else {
                // send the player's details to the database
                let query = "INSERT INTO `players` (first_name, last_name, position, number, user_name) VALUES ('" +
                    first_name + "', '" + last_name + "', '" + position + "', '" + number + "', '" + username + "')";
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.json('Created');
                });
            }
        });
    },
    editPlayer: (req, res) => {
        let playerId = req.params.id;
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let position = req.body.position;
        let number = req.body.number;

        let query = "UPDATE `players` SET `first_name` = '" + first_name + "', `last_name` = '" + last_name + "', `position` = '" + position + "', `number` = '" + number + "' WHERE `players`.`id` = '" + playerId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json('Edited');
        });
    },
    deletePlayer: (req, res) => {
        let playerId = req.params.id;
        let deleteUserQuery = 'DELETE FROM players WHERE id = "' + playerId + '"';
        db.query(deleteUserQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json('Deleted');
        });
    }
};