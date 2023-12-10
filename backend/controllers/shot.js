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
    addShot: (req, res) => {
        let type = req.body.type;
        let attempt = req.body.attempt;
        let success = req.body.success;
        let date = req.body.date;
        let user_id = req.body.user_id;

        let query = "INSERT INTO `shots` (type, attempt, success, date, user_id) VALUES ('" +
        type + "', '" + attempt + "', '" + success + "', '" + date + "', '" + user_id + "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json('Created');
        });
    },
};