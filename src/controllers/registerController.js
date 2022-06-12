import registerService from "./../services/registerService";
import { validationResult } from "express-validator";

let getPageRegister = (req, res) => {
    return res.render("register.ejs", {
        errors: req.flash("errors")
    });
};

let createNewUser = async (req, res) => {
    //validate required fields
    let errorsArr = [];
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((item) => {
            errorsArr.push(item.msg);
        });
        req.flash("errors", errorsArr);
        return res.redirect("/register");
    }
    // console.log("We Are in register!");
    // var inst;
    // console.log("inst : "+req.body.institution);
    // if(req.body.institution=="None"){
    //     inst=req.body.institution_other;
    // }else{
    //     inst=req.body.institution;
    // }

    // console.log("inst : "+req.body.institution);
    
    // var orgs;
    // if(req.body.organizations=="None"){
    //     orgs=req.body.organization_other;
    // }else{
    //     orgs=req.body.organizations;
    // }
    
    // console.log("qualification : "+req.body.qualification);

    //create a new user
    let newUser = {
        fullname: req.body.fullname,
        // studentid: req.body.studentid,
        email: req.body.email,
        password: req.body.password,
    };
    
    //create a new user
    // let newUser = {
    //     fullname: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    //     dob:req.body.dob,
    //     gender:req.body.gender,
    //     address:req.body.address,
    //     contact:req.body.contact,
    //     institution: inst,
    //     org:orgs,
    //     qualification:req.body.qualification,
    //     occupation:req.body.occupation,
    //     lang1:req.body.lang1,
    //     lang2:req.body.lang2,
    //     lang3:req.body.lang3,
    //     lang4:req.body.lang4,
    //     nationality:req.body.nationality,
    //     work_mode:req.body.work_mode,
    //     loc_pref:req.body.loc_pref,
    //     skill1:req.body.skill1,
    //     skill2:req.body.skill2,
    //     skill3:req.body.skill3,
    //     workday_pref:req.body.workday_pref,
    //     wish:req.body.wish
    // };
    try {
        await registerService.createNewUser(newUser);
        return res.redirect("/login");
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/register");
    }
};




module.exports = {
    getPageRegister: getPageRegister,
    createNewUser: createNewUser
};
