import editProfileService from "../services/editProfileService";
import DBConnection from "../configs/DBConnection";
import path from "path";

let editProfile = async (req, res) => {
    var id;
    try {
        id = req.user.id;
    } catch (err) {
        console.log("catchhh")
        id = req.params.id;
    }
    DBConnection.query("SELECT * FROM v_details WHERE Vid = ?", [id],
        (err, userRows) => {
            if (err) {
                console.log(err);
            }
            // if (userRows.length > 0) {
            //     console.log("userdetails: ", userRows[0]);

                // DBConnection.query(
                //     "SELECT * FROM images WHERE id = ?", [id],
                //     function (err, imgRows) {
                //         if (imgRows.length > 0) {
                //             console.log("images: ", imgRows[0])
                //             return res.render("editProfile.ejs", {
                //                 user: req.user,
                //                 userDetails: userRows[0],
                //                 images: imgRows[0]
                //             });
                //         }
                //         else {
                //             console.log("no image found")
                //             return res.render("editProfile.ejs", {
                //                 user: req.user,
                //                 userDetails: userRows[0],
                //                 images: ""
                //             });
                //         }
                //     });
            // }
            // else {
                return res.render("register1.ejs", {
                    user: req.user,
                  
                });
            // }
            
        });
};


let editProfileUser = async (req, res) => {
    // console.log("jggdfd");
    // console.log(req.body);
    var id;
    try {
        id = req.user.id;
    } catch (err) {
        console.log("catchhh")
        id = req.params.id;
    }
    var inst;
    if(req.body.institution=='Other'){
        inst=req.body.other_inst;
    }else{
        inst=req.body.institution;
    }
    var org;
    if(req.body.organizations=='Other'){
        console.log("other");
        org=req.body.other_org;
    }else{
        org=req.body.organizations;
    }
    console.log("org: ",org);
    console.log("inst: ",inst);
    let userDetails = {
        Vid: id,
        dob: req.body.dob,
        address: req.body.address,
        // proff_address: req.body.proff_address,
        gender: req.body.gender,
        city: req.body.city,
        nationality: req.body.nationality,
        contact:req.body.contact,
        partner_inst: inst,
        organization: org,
        qualification: req.body.qualification,
        occupation: req.body.occupation,
        reasons:req.body.wish
    };
    try {
        await editProfileService.addDetails(userDetails);
        return res.redirect("/editProfile");
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/editProfile");
    }
};

module.exports = {
    editProfile: editProfile,
    editProfileUser: editProfileUser,
};