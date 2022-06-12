import editskillsService from "../services/editskillsService";
import DBConnection from "../configs/DBConnection";
import path from "path";

let editSkill = async (req, res) => {
    var id;
    try {
        id = req.user.id;
    } catch (err) {
        console.log("catchhh")
        id = req.params.id;
    }
    DBConnection.query("SELECT * FROM v_skills WHERE Vid = ?", [id],
        (err, userRows) => {
            if (err) {
                console.log(err);
            }else{
                return res.render("editSkills.ejs", {
                    user: req.user,
                });
            }            
        });
};


let editSkillUser = async (req, res) => {
   console.log("skillsController.editSkillUser");
    var id;
    try {
        id = req.user.id;
    } catch (err) {
        console.log("catchhh")
        id = req.params.id;
    }
   
    let skilldetails = {
        Vid: id,
        Skill1: req.body.Skill1,
        Skill2: req.body.Skill2,
        Skill3: req.body.Skill3,
        Skill4: req.body.Skill4,
           };
    console.log(skilldetails);
    try {
        await editskillsService.addSkills(skilldetails);
        return res.redirect("/");
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/editskill");
    }
};

module.exports = {
    editSkill: editSkill,
    editSkillUser: editSkillUser
};