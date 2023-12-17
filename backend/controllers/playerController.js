module.exports = {
    getPlayer: (req, res) => {
        let playerId = req.params.id;
        let query = `SELECT
        u.id AS user_id,
        u.first_name,
        u.last_name,
        u.user_name,
        u.position,
        u.number,
        COALESCE(SUM(CASE WHEN s.type = 'three' THEN s.attempt ELSE 0 END), 0) AS total_three_attempts,
        COALESCE(SUM(CASE WHEN s.type = 'three' THEN s.success ELSE 0 END), 0) AS total_three_success,
        COALESCE(SUM(CASE WHEN s.type = 'two' THEN s.attempt ELSE 0 END), 0) AS total_two_attempts,
        COALESCE(SUM(CASE WHEN s.type = 'two' THEN s.success ELSE 0 END), 0) AS total_two_success,
        COALESCE(SUM(CASE WHEN s.type = 'free' THEN s.attempt ELSE 0 END), 0) AS total_free_attempts,
        COALESCE(SUM(CASE WHEN s.type = 'free' THEN s.success ELSE 0 END), 0) AS total_free_success
    FROM
        users u
    LEFT JOIN
        shots s
    ON
        u.id = s.user_id
    WHERE
        u.id = ${playerId}
    GROUP BY
        u.id, u.user_name;`;

        timeQuery = `SELECT
        YEAR(s.date) AS year_number,
        MONTH(s.date) AS month_number,
        COALESCE(SUM(CASE WHEN s.type = 'three' THEN s.attempt ELSE 0 END), 0) AS three_attempts,
        COALESCE(SUM(CASE WHEN s.type = 'three' THEN s.success ELSE 0 END), 0) AS three_success,
        COALESCE(SUM(CASE WHEN s.type = 'two' THEN s.attempt ELSE 0 END), 0) AS two_attempts,
        COALESCE(SUM(CASE WHEN s.type = 'two' THEN s.success ELSE 0 END), 0) AS two_success,
        COALESCE(SUM(CASE WHEN s.type = 'free' THEN s.attempt ELSE 0 END), 0) AS free_attempts,
        COALESCE(SUM(CASE WHEN s.type = 'free' THEN s.success ELSE 0 END), 0) AS free_success
    FROM
        users u
    LEFT JOIN
        shots s
    ON
        u.id = s.user_id
    WHERE
        u.id = ${playerId}
        AND s.date >= DATE_SUB(NOW(), INTERVAL 7 MONTH)
    GROUP BY
        u.id, u.user_name, year_number, month_number
    ORDER BY
        year_number ASC, month_number ASC;`;

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                db.query(timeQuery, (err, result2) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    if (result2.length > 0) {
                        let out = {...result[0], stat: result2} 
                        res.json(out);
                    } else {
                        return res.json("Error");
                    }
                });
            } else {
                return res.json("user doesnot exist");
            }
        });
    },
    getAllPlayers: (req, res) => {
        let query = `SELECT
        u.id AS user_id,
        u.first_name,
        u.last_name,
        u.user_name,
        u.position,
        u.number,
        COALESCE(SUM(CASE WHEN s.type = 'three' THEN s.attempt ELSE 0 END), 0) AS three_attempts,
        COALESCE(SUM(CASE WHEN s.type = 'three' THEN s.success ELSE 0 END), 0) AS three_success,
        COALESCE(SUM(CASE WHEN s.type = 'two' THEN s.attempt ELSE 0 END), 0) AS two_attempts,
        COALESCE(SUM(CASE WHEN s.type = 'two' THEN s.success ELSE 0 END), 0) AS two_success,
        COALESCE(SUM(CASE WHEN s.type = 'free' THEN s.attempt ELSE 0 END), 0) AS free_attempts,
        COALESCE(SUM(CASE WHEN s.type = 'free' THEN s.success ELSE 0 END), 0) AS free_success
    FROM
        users u
    LEFT JOIN
        shots s
    ON
        u.id = s.user_id
    WHERE
        u.role = 'player'
    GROUP BY
        u.id, u.user_name;`;

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

        let usernameQuery = "SELECT * FROM `users` WHERE user_name = '" + username + "'";

        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                return res.json("username exist");
            } else {
                // send the player's details to the database
                let query = "INSERT INTO `users` (first_name, last_name, position, number, user_name) VALUES ('" +
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

        let query = "UPDATE `users` SET `first_name` = '" + first_name + "', `last_name` = '" + last_name + "', `position` = '" + position + "', `number` = '" + number + "' WHERE `users`.`id` = '" + playerId + "'";
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