import express from "express";
import homePageController from "../controllers/homePageController";
import registerController from "../controllers/registerController";
import loginController from "../controllers/loginController";
import editProfileController from "../controllers/editProfileController";
import editPreffController from "../controllers/editPreffController";
import skillsController from "../controllers/skillsController.js";
import volunteeractivityController from "../controllers/volunteeractivityController.js";
import adminController from "../controllers/adminController";
import auth from "../validation/authValidation";
import passport from "passport";
import initPassportLocal from "../controllers/passportLocalController";

// Init all passport
initPassportLocal();

let router = express.Router();

let initWebRoutes = (app) => {

    router.get("/", loginController.checkLoggedIn, homePageController.handleHelloWorld);
    router.get("/login",loginController.checkLoggedOut, loginController.getPageLogin);
    router.post("/login", passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    }));
    console.log("We Are in routing!");
    router.get("/register", registerController.getPageRegister);
    router.post("/register", auth.validateRegister, registerController.createNewUser);
    router.get("/logout", loginController.postLogOut);
    router.post("/logout", loginController.postLogOut);

    router.get("/editProfile",loginController.checkLoggedIn,editProfileController.editProfile);
    router.post("/editProfile/:id", editProfileController.editProfileUser);

    router.get("/editPreff",loginController.checkLoggedIn,editPreffController.editPreference);
    router.post("/editPreff/:id", editPreffController.editPreffUser);


    router.get("/editSkill",loginController.checkLoggedIn,skillsController.editSkill);
    router.post("/editSkill/:id", skillsController.editSkillUser);
    
    router.get("/activity/:id",loginController.checkLoggedIn,volunteeractivityController.viewactivity);
    router.get("/admin-login", adminController.getPageAdminLogin);
    router.post(
        "/admin-login",
        passport.authenticate("local", {
            successRedirect: "/admin",
            failureRedirect: "/admin-login",
            successFlash: true,
            failureFlash: true,
        })
    );
    router.post("/apply/:id",loginController.checkLoggedIn,volunteeractivityController.apply);
    // router.get("/success",loginController.checkLoggedIn,volunteeractivityController.success)

    // router.get("/admin", adminController.authenticate, adminController.getPage);
    router.get("/admin", adminController.authenticate, adminController.getPage);
    
    router.get("/logout-admin", adminController.postLogOut);
    router.post("/logout-admin", adminController.postLogOut);

    router.get("/search/:id", adminController.authenticate,  adminController.getvolunteer);
    router.post("/search/:id", adminController.authenticate,  adminController.getvolunteer);
    // /mapping/<%=matched_activity_types[i].Aid%>

    router.post("/mapping/:id", adminController.authenticate,  adminController.mapping);
    
    router.post("/reject/:id", adminController.authenticate,  adminController.reject);
    router.post("/attended/:id", adminController.authenticate,  adminController.attended);
    router.post("/absent/:id", adminController.authenticate,  adminController.absent);

    return app.use("/", router);
};
module.exports = initWebRoutes;
