import DBConnection from "../configs/DBConnection";

let handleHelloWorld = async (req, res) => {
  // DBConnection.query("SELECT * FROM v_details WHERE Vid = ?", [req.user.id],
  //     (err, userRows) => {
  //         if (err) {
  //             console.log(err);
  //             res.status(500).send(err);
  //         }
  //         else{
  //             // console.log("userdetails: ", userRows[0]);
  //             res.render("events.ejs", {
  //                 user : req.user,
  //                 userRows: userRows
  //             });
  //         }
  //     }
  // );
  var render = {
    activity_type: "",
  };
  DBConnection.query("SELECT * FROM activity_type ", (err, activity_type) => {
    if (err) {
      console.log(err);
    }
    render.activity_type = activity_type;
  });

  setTimeout(() => {
    res.render("events.ejs", render);
  }, 1000);
};


module.exports = {
  handleHelloWorld: handleHelloWorld,
};
