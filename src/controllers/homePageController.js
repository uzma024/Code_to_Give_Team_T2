import DBConnection from "../configs/DBConnection";

let handleHelloWorld = async (req, res) => {
    DBConnection.query("SELECT * FROM v_details WHERE Vid = ?", [req.user.id],
        (err, userRows) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            }
            else{
                // console.log("userdetails: ", userRows[0]);
                res.render("events.ejs", {
                    user : req.user,
                    userRows: userRows
                });
            }
        }
    );
};



module.exports = {
    handleHelloWorld: handleHelloWorld,
};