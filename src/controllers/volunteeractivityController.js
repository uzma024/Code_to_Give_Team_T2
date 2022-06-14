import DBConnection from "../configs/DBConnection";
import volunteerServices from "../services/volunteerServices";
let viewactivity = async (req, res) => {
  let render = {
    activity: "",
  };
  DBConnection.query(
    "select * from activity where activity.Aid=? ",
    req.params.id,
    (err, activity) => {
      if (err) {
        console.log(err);
      }
      render.activity = activity;
      // render.rounds = rounds;
      render.activity.forEach((act) => {
        var date = new Date(act.date);
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var day = date.getDate();
        var date_string = day + "/" + month + "/" + year;
        act.date = date_string;
      });
    }
  );

  setTimeout(() => {
    res.render("activity.ejs", render);
  }, 1000);
};

let apply = async (req, res) => {
    let mapDetails = {
      Vid: req.user.id,
      Aid: req.params.id,
      status: "accepted",
    };
    // let activityid= req.params.id;
    // let activityname= activityid.name;
    
    volunteerServices
    try {
      await volunteerServices.addmapping(mapDetails);
      return res.render("success.ejs",mapDetails);
      // return res.redirect("/success");
     
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/activity/"+req.params.id);
    }
 
};


module.exports = {
  viewactivity: viewactivity,
  apply:apply,
  
};
