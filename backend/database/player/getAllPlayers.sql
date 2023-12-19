SELECT
    u.id AS user_id,
    u.username,
    SUM(CASE WHEN s.type = 'three' THEN s.attempt ELSE 0 END) AS three_point_attempts,
    SUM(CASE WHEN s.type = 'three' THEN s.success ELSE 0 END) AS three_point_success,
    SUM(CASE WHEN s.type = 'two' THEN s.attempt ELSE 0 END) AS two_point_attempts,
    SUM(CASE WHEN s.type = 'two' THEN s.success ELSE 0 END) AS two_point_success,
    SUM(CASE WHEN s.type = 'free' THEN s.attempt ELSE 0 END) AS free_throw_attempts,
    SUM(CASE WHEN s.type = 'free' THEN s.success ELSE 0 END) AS free_throw_success
FROM
    users u
JOIN
    shots s
ON
    u.id = s.user_id
GROUP BY
    u.id, u.username;