import express from "express";
import homePageController from "../controllers/homePageController";
import registerController from "../controllers/registerController";
import loginController from "../controllers/loginController";
import editProfileController from "../controllers/editProfileController";
import editPreffController from "../controllers/editPreffController";
import skillsController from "../controllers/skillsController.js";

import adminController from "../controllers/adminController";
import auth from "../validation/authValidation";
import passport from "passport";
import initPassportLocal from "../controllers/passportLocalController";

// Init all passport
initPassportLocal();

let router = express.Router();

let initWebRoutes = (app) => {
    // console.log("We Are in routing!");
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
    // router.get("/admin", adminController.authenticate, adminController.getPage);
    router.get("/admin", adminController.authenticate, adminController.getPage);
    router.post("/search/:id", adminController.authenticate,  adminController.getvolunteer);
    return app.use("/", router);
};
module.exports = initWebRoutes;
