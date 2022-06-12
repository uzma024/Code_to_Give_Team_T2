import DBConnection from "./../configs/DBConnection";

let addDetails = (data) => {
    return new Promise((resolve, reject) => {
        let v_details = {
            Vid: data.Vid,
            dob: data.dob,
            address: data.address,
            gender: data.gender,
            city:data.city,
            nationality:data.nationality,
            contact: data.contact,
            partner_inst: data.partner_inst,
            organization: data.organization,
            qualification: data.qualification,
            occupation:data.occupation,
            reasons:data.reasons        
        };
        // console.log("user details");
        // console.log(userDetails);
        DBConnection.query(
            "SELECT * FROM v_details WHERE Vid = ?", [data.Vid],
            function (err, rows) {
                if (err) {
                    console.log(err);
                }
                // console.log("rows: ",rows);
                if (rows.length > 0) {
                    console.log("rows: ",rows);
                    if (data.dob != null) {
                        DBConnection.query("UPDATE v_details SET dob = ? WHERE Vid = ?", [v_details.dob, v_details.Vid], (err, result) => {
                            if (err) {
                                console.log(err);
                                reject(err);
                            }
                            else {
                                resolve(result);
                            }
                        });
                    }
                    if (data.address != null) {
                        DBConnection.query("UPDATE v_details SET address = ? WHERE Vid = ?", [v_details.address, v_details.Vid], (err, result) => {
                            if (err) {
                                console.log(err);
                                reject(err);
                            }
                            else {
                                resolve(result);
                            }
                        });
                    }
                    if (data.gender != null) {
                        DBConnection.query("UPDATE v_details SET gender= ? WHERE Vid = ?", [v_details.gender, v_details.Vid], (err, result) => {
                            if (err) {
                                console.log(err);
                                reject(err);
                            }
                            else {
                                resolve(result);
                            }
                        });
                    }
                    if (data.city != null) {
                        DBConnection.query("UPDATE v_details SET city = ? WHERE Vid = ?", [v_details.city, v_details.Vid], (err, result) => {
                            if (err) {
                                console.log(err);
                                reject(err);
                            }
                            else {
                                resolve(result);
                            }
                        });
                    }
                    if (data.nationality != null) {
                        DBConnection.query("UPDATE v_details SET nationality = ? WHERE Vid = ?", [v_details.nationality, v_details.Vid], (err, result) => {
                            if (err) {
                                console.log(err);
                                reject(err);
                            }
                            else {
                                resolve(result);
                            }
                        });
                    }
                    if (data.ccontact != null) {
                        DBConnection.query("UPDATE v_details SET contact = ? WHERE Vid = ?", [v_details.contact, v_details.Vid], (err, result) => {
                            if (err) {
                                console.log(err);
                                reject(err);
                            }
                            else {
                                resolve(result);
                            }
                        });
                    }
                    if (data.partner_inst != null) {
                        DBConnection.query("UPDATE v_details SET partner_inst = ? WHERE Vid = ?", [v_details.partner_inst, v_details.Vid], (err, result) => {
                            if (err) {
                                console.log(err);
                                reject(err);
                            }
                            else {
                                resolve(result);
                            }
                        });
                    }
                    if (data.organization != null) {
                        DBConnection.query("UPDATE v_details SET  organization = ? WHERE Vid = ?", [v_details.organization, v_details.Vid], (err, result) => {
                            if (err) {
                                console.log(err);
                                reject(err);
                            }
                            else {
                                resolve(result);
                            }
                        });
                    }
                    if (data.qualification != null) {
                        DBConnection.query("UPDATE v_details SET qualification = ? WHERE Vid = ?", [v_details.qualification, v_details.Vid], (err, result) => {
                            if (err) {
                                console.log(err);
                                reject(err);
                            }
                            else {
                                resolve(result);
                            }
                        });
                    }
                    if (data.reasons != null) {
                        DBConnection.query("UPDATE v_details SET reasons = ? WHERE Vid = ?", [v_details.reasons, v_details.Vid], (err, result) => {
                            if (err) {
                                console.log(err);
                                reject(err);
                            }
                            else {
                                resolve(result);
                            }
                        });
                    }
                    
                }
                else {

                    console.log("Inserting new volunteer details");
                    DBConnection.query(
                        "INSERT INTO v_details set ?",
                        v_details,
                        function (err, rows) {
                            if (err) {
                                console.log(err);
                                reject(false);
                            }
                            resolve("Details added successfully");
                        }
                    );
                }
            });
    });
}

module.exports = {
    addDetails: addDetails
}