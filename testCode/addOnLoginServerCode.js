const findNetId = fs.readFileSync('../src/database/Queries/UserLogin/findNetId.sql').toString();

app.post('/login', (req, res) => {
    const { netid, password } = req.body;

    // Check if the username exists in the database
    DROP_TABLE_db.query(findNetId, [netid], (err, results) => {
        if (err) {
            console.error('Error executing the query:', err);
            res.status("Netid does not exist. Please register first");
        }
        else
        {
            if (results.length === 0)
            {
                res.json("Please reenter netId");
            }
            else
            {
                // Compare the supplied password with the one in the database
                const user = results[0];
                if (user.password === password) {
                    res.status("Login successful");
                } else {
                    res.status("Incorrect password");
                }
            }
        }
    });
});