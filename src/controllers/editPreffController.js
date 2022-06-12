import editPreffService from "../services/editPreffService";
import DBConnection from "../configs/DBConnection";
import path from "path";

let editPreference = async (req, res) => {
    var id;
    try {
        id = req.user.id;
    } catch (err) {
        console.log("catchhh")
        id = req.params.id;
    }
    DBConnection.query("SELECT * FROM v_preferences WHERE Vid = ?", [id],
        (err, userRows) => {
            if (err) {
                console.log(err);
            }else{
                return res.render("editPreff.ejs", {
                    user: req.user,
                });
            }            
        });
};


let editPreffUser = async (req, res) => {
   console.log("editPreffController.editPreffUser");
    var id;
    try {
        id = req.user.id;
    } catch (err) {
        console.log("catchhh")
        id = req.params.id;
    }
   
    let preffdetails = {
        Vid: id,
        work_mode:req.body.work_mode,
        loc_pref:req.body.loc_pref,
        workday_pref:req.body.workday_pref,
        activity:req.body.activity_pref,
    };
    console.log(preffdetails);
    try {
        await editPreffService.addPreferences(preffdetails);
        return res.redirect("/");
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/editPreff");
    }
};

module.exports = {
    editPreference: editPreference,
    editPreffUser: editPreffUser,
};