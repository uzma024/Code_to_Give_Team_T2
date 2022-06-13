import DBConnection from "../configs/DBConnection";

let authenticate = async (req, res, next) => {
  if (!req.user) {
    console.log("not logged in");
    res.redirect("/admin-login");
  } else if (req.user.id != -1) {
    // 4 is database id of admin
    console.log("not admin");
    res.redirect("/admin-login");
  } else {
    console.log("logged in");
    next();
  }
};

let getPage = async (req, res) => {
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
  // DBConnection.query("select * from activity_type", (err, activity) => {
  //     if (err) {
  //         console.log(err);
  //     }
  //     render.activity = activity;
  // });
  // DBConnection.query(
  //     "select job_id, title, name company, package, location, allowed_branches, allowed_gender, min_cpi from jobs natural join companies order by package desc;",
  //     (err, jobs) => {
  //         if (err) {
  //             console.log(err);
  //         }
  //         render.jobs = jobs;
  //         // console.log(jobs);
  //     }
  // );
  // DBConnection.query(
  //     "select application_id, fullname, job_id, name, title, package, status from applications natural join users natural join jobs natural join companies where applicant_id=id order by fullname;",
  //     (err, applications) => {
  //         if (err) {
  //             console.log(err);
  //         }
  //         render.applications = applications;
  //     }
  // );
  // console.log("render: "+ render);
  // console.log("render: "+render.time);
  // setTimeout(() => {
  //     res.render("admin/adminPage.ejs", render);
  // }, 1000);
  setTimeout(() => {
    res.render("admin/adminEvent.ejs", render);
  }, 1000);
};

let getPageAdminLogin = async (req, res) => {
  console.log("Rendering Admin login page");
  res.render("admin/adminSignIn.ejs");
};

let getvolunteer = async (req, res) => {
  console.log("Rendering getvolunteer page");
  var render = {
    matched_activity_types: "",
    // matched_location: ""
  };

  var next=0;
  console.log("req.params.id: ", req.params.id);
  console.log("success!!!!!!! ");
//   DBConnection.query(
//     "select * from activity where id = ?",
//     req.params.id,
//     (err, activ) => {
//       if (err) {
//         console.log("uff error ->>>>>>>> "+err);
//       }
//       render.activity = activ;
//     }
//   );
//   console.log("render.activity: "+render.activity);

//   console.log("query1 success!!!!!!! ");
//   DBConnection.query(
//     "select * from activity,activity_type where activity.Aid=activity_type.id and activity.id = ?",
//     req.params.id,
//     (err, activity_type) => {
//       if (err) {
//         console.log("uff error ->>>>>>>> "+err);
//       }
//       render.activity_type = activity_type;
//     }
//   );
//   console.log("query2 success!!!!!!! ");
  // DBConnection.query(
  //   "select users.fullname,users.email,v_details.contact,v_preferences.activity from users,v_details,v_preferences,activity,activity_type where users.id=v_preferences.Vid and users.id=v_details.Vid and v_preferences.activity =activity_type.name and activity.Aid=activity_type.id and  activity.id=?",
  //   req.params.id,
  //   (err, matched_activity_types) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     render.matched_activity_types = matched_activity_types;
  //   }
  // );
   DBConnection.query(
    "SELECT * from users,v_details,v_preferences,activity,activity_type,v_skills where users.id=v_preferences.Vid and users.id=v_details.Vid and activity.Aid=activity_type.id and v_skills.Vid=users.id and  activity.id=? and(v_preferences.activity =activity_type.name OR v_preferences.location =activity.venue OR v_preferences.work_mode =activity.mode  or v_preferences.days =activity.day) ORDER BY ( (v_preferences.activity =activity_type.name)+  (v_preferences.location =activity.venue)+ (v_preferences.work_mode =activity.mode)+ (v_preferences.days =activity.day)) DESC",
    req.params.id,
    (err, matched_activity_types) => {
      if (err) {
        console.log(err);
      }
      render.matched_activity_types = matched_activity_types;
    }
  );
  console.log("Activity success!!!!!!! ");
  // DBConnection.query(
  //   "select users.fullname,users.email,v_details.contact,v_preferences.activity from users,v_details,v_preferences,activity where users.id=v_preferences.Vid and users.id=v_details.Vid and v_preferences.location =activity.venue and  activity.id=?",
  //   req.params.id,
  //   (err, matched_location) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     render.matched_location = matched_location;
  //   }
  // );
  // console.log("Location success!!!!!!! ");
  // DBConnection.query(
  //   "select users.fullname,users.email,v_details.contact,v_preferences.activity from users,v_details,v_preferences,activity where users.id=v_preferences.Vid and users.id=v_details.Vid and v_preferences.work_mode =activity.mode and  activity.id=?",
  //   req.params.id,
  //   (err, matched_work_mode) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     render.matched_work_mode = matched_work_mode;
  //   }
  // );  
  // console.log("Work Mode success!!!!!!! ");
  
  // DBConnection.query(
  //   "select users.fullname,users.email,v_details.contact,v_preferences.activity from users,v_details,v_preferences,activity where users.id=v_preferences.Vid and users.id=v_details.Vid and v_preferences.days =activity.day and  activity.id=?",
  //   req.params.id,
  //   (err, matched_work_days) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     render.matched_work_days = matched_work_days;
  //   }
  // );
  // console.log("Days success!!!!!!! ");
  setTimeout(() => {
    res.render("admin/volunteerSearch.ejs", render);
  }, 1000);
};

let acceptApplication = async (req, res) => {
  console.log("req.params.id: ", req.params.id);
  DBConnection.query(
    "update applications set status = ? where application_id = ?",
    ["Accepted", req.params.id],
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
  setTimeout(() => {
    res.redirect("/admin");
  }, 100);
};

let rejectApplication = async (req, res) => {
  console.log("req.params.id: ", req.params.id);
  DBConnection.query(
    "update applications set status = ? where application_id = ?",
    ["Rejected", req.params.id],
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
  setTimeout(() => {
    res.redirect("/admin");
  }, 100);
};

let resetApplication = async (req, res) => {
  console.log("req.params.id: ", req.params.id);
  DBConnection.query(
    "update applications set status = ? where application_id = ?",
    ["Applied", req.params.id],
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
  setTimeout(() => {
    res.redirect("/admin");
  }, 100);
};

let deleteApplication = async (req, res) => {
  console.log("req.params.id: ", req.params.id);
  DBConnection.query(
    "delete from applications where application_id = ?",
    req.params.id,
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
  setTimeout(() => {
    res.redirect("/admin");
  }, 100);
};

module.exports = {
  authenticate: authenticate,
  getPage: getPage,
  getPageAdminLogin: getPageAdminLogin,
  getvolunteer: getvolunteer,
  // getEditUser: getEditUser,   // getEditUser
  // deleteUser: deleteUser,   // deleteUser
  // getEditCompany: getEditCompany,   // getEditCompany
  // updateCompany: updateCompany,   // updateCompany
  // deleteCompany: deleteCompany,   // deleteCompany
  // getEditJob: getEditJob,   // getEditJob
  // updateJob: updateJob,   // updateJob
  // deleteJob: deleteJob,   // deleteJob
  // getEditRound: getEditRound,   // getEditRound
  // updateRound: updateRound,   // updateRound
  // deleteRound: deleteRound,   // deleteRound
  // acceptApplication: acceptApplication,   // acceptApplication
  // rejectApplication: rejectApplication,   // rejectApplication
  // resetApplication: resetApplication,   // resetApplication
  // deleteApplication: deleteApplication,   // deleteApplication
};
