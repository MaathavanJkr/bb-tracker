module.exports = {
    getShot: (req, res) => {
        let shotId = req.params.id;
        let query = "SELECT * FROM `shots` WHERE ID = '" + shotId + "'";

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
    getAllShots: (req, res) => {
        let query = "SELECT * FROM `shots`";

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(result);
        });
    },
    getPlayerShots: (req, res) => {
        let playerId = req.params.player;
        let query = "SELECT * FROM `shots` WHERE user_id = '" + playerId + "'";

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(result);
        });
    },
    addShot: (req, res) => {
        let type = req.body.type;
        let attempt = req.body.attempt;
        let success = req.body.success;
        let date = req.body.date;
        let user_id = req.user;

        let query = "INSERT INTO `shots` (type, attempt, success, date, user_id) VALUES ('" +
        type + "', '" + attempt + "', '" + success + "', '" + date + "', '" + user_id + "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(400).json({
                message: "Created",
                success: true,
            });
        });
    },
    editShot: (req, res) => {
        let shotId = req.params.id;
        let type = req.body.type;
        let attempt = req.body.attempt;
        let success = req.body.success;
        let date = req.body.date;

        let query = "UPDATE `shots` SET `type` = '" + type + "', `attempt` = '" + attempt + "', `success` = '" + success + "', `date` = '" + date + "' WHERE `shots`.`id` = '" + shotId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json('Edited');
        });
    },
    deleteShot: (req, res) => {
        let shotId = req.params.id;
        let deleteUserQuery = 'DELETE FROM shots WHERE id = "' + shotId + '"';
        db.query(deleteUserQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json('Deleted');
        });
    }
};