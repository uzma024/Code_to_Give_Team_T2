import adminServices from "../services/adminServices";
import DBConnection from "../configs/DBConnection";
import path from "path";

let authenticate = async (req, res, next) => {
  if (!req.user) {
    console.log("not logged in");
    res.redirect("/admin-login");
  } else if (req.user.id != 1) {
    // 4 is database id of admin
    console.log("not admin");
    res.redirect("/admin-login");
  } else {
    console.log("logged in");
    next();
  }
};
let getDashBoard = async (req, res) => {
  console.log("Rendering Admin Dashboard page");
  res.render("admin/DashBoard.ejs");

}

let getEventPage = async (req, res) => {
  console.log("Rendering Admin page, the user id is: ", req.user.id);
  var render = {
    users: "",
    activity: "",
    day: "",
  };
  DBConnection.query("select * from users", (err, users) => {
    if (err) {
      console.log(err);
    }
    render.users = users;
  });
  DBConnection.query("select * from activity", (err, activity) => {
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
  });

  setTimeout(() => {
    res.render("admin/EventManage.ejs", render);
  }, 1000);
};

let getPageAdminLogin = async (req, res) => {
  console.log("Rendering Admin login page");
  res.render("admin/adminSignIn.ejs");
};
let postLogOut = (req, res) => {
  req.session.destroy(function(err) {
      return res.redirect("/login");
  });
};

let getvolunteer = async (req, res) => {
  console.log("Rendering getvolunteer page");
  var render = {
    act_id: req.params.id,
    call_name:"/search/",
    mapped_vol:"",
    matched_activity_types: "",
    // matched_location: ""
  };

  // var next=0;
  console.log("req.params.id: ", req.params.id);
  console.log("success!!!!!!! ");

  DBConnection.query(
    "SELECT * from mapping,users,v_details,v_skills,v_preferences where users.id=v_preferences.Vid and users.id=v_details.Vid and v_skills.Vid=users.id and mapping.Vid=users.id and mapping.Aid=?",req.params.id,
    (err, mapped_vol) => {
      if (err) {
        console.log(err);
      }
      render.mapped_vol = mapped_vol;
    }
  );
  DBConnection.query(
    "SELECT * from users,v_details,v_preferences,activity,activity_type,v_skills where users.id=v_preferences.Vid and users.id=v_details.Vid and activity.Aid=activity_type.id and v_skills.Vid=users.id and  activity.id=? and(v_preferences.activity =activity_type.name OR v_preferences.location =activity.venue OR (v_preferences.work_mode =activity.mode or v_preferences.work_mode='Both')  or v_preferences.days =activity.day) ORDER BY ( (v_preferences.activity =activity_type.name)+  (v_preferences.location =activity.venue)+ (v_preferences.work_mode =activity.mode or v_preferences.work_mode='Both')+ (v_preferences.days =activity.day)) DESC",
    req.params.id,
    (err, matched_activity_types) => {
      if (err) {
        console.log(err);
      }
      render.matched_activity_types = matched_activity_types;
    }
  );
  console.log("Activity success!!!!!!! ");
  
  setTimeout(() => {
    res.render("admin/volunteerSearch.ejs", render);
  }, 1000);
};

let mapping = async (req, res) => {
  console.log("Rendering mapping page");
 
  let  act_id= req.params.id;
  let volunteerDetailslist= req.body.v;
  

  console.log("volunteerDetailslist: ", volunteerDetailslist);
  
  for(var i=0;i<volunteerDetailslist.length;i++){
    var renders = {
      Aid: act_id,
      Vid: volunteerDetailslist[i],
      status: "pending",
    };
    try {
        await adminServices.addmapping(renders);
    } catch (err) {
        req.flash("errors", err);
    }
  }
  console.log("successfully added "+ volunteerDetailslist);
  
  return res.redirect("/search/"+req.params.id);
  // setTimeout(() => {
  //   res.redirect("/search/"+req.params.id);
  // }, 100);
}

let reject = async (req, res) => {
  console.log("reject function");

  let volunteerDetailslist= req.body.A;
  for(var i=0;i<volunteerDetailslist.length;i++){
    DBConnection.query(
      "update mapping set status = ? where Vid = ? AND Aid= ?",
      ["rejected", volunteerDetailslist[i], req.params.id],
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  }
  console.log("volunteers rejected the invite "+ volunteerDetailslist);
  return res.redirect("/search/"+req.params.id);
}

let attended = async (req, res) => {
  console.log("attended function");

  let volunteerDetailslist= req.body.A;
  for(var i=0;i<volunteerDetailslist.length;i++){
    DBConnection.query(
      "update mapping set status = ? where Vid = ? AND Aid= ?",
      ["attended", volunteerDetailslist[i], req.params.id],
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  }
  console.log("volunteers attended the event "+ volunteerDetailslist);
  return res.redirect("/search/"+req.params.id);
}

let absent = async (req, res) => {
  console.log("absent function");

  let volunteerDetailslist= req.body.A;
  for(var i=0;i<volunteerDetailslist.length;i++){
    DBConnection.query(
      "update mapping set status = ? where Vid = ? AND Aid= ?",
      ["absent", volunteerDetailslist[i], req.params.id],
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  }
  console.log("volunteers was absent "+ volunteerDetailslist);
  return res.redirect("/search/"+req.params.id);
}

module.exports = {
  authenticate: authenticate,
  getDashBoard: getDashBoard,
  getEventPage: getEventPage,
  postLogOut:postLogOut,
  getPageAdminLogin: getPageAdminLogin,
  getvolunteer: getvolunteer,
  mapping:mapping,
  reject:reject,
  attended:attended,
  absent:absent,
};
