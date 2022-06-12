import DBConnection from "./../configs/DBConnection";

let addSkills = (data) => {
  return new Promise((resolve, reject) => {
    console.log("data: ", data);
    let skills = {
      Vid: data.Vid,
      Skill1: data.Skill1,
      Skill2: data.Skill2,
      Skill3: data.Skill3,
      Skill4: data.Skill4,
    };
    console.log("user skills");
    console.log(skills);
    DBConnection.query(
      "SELECT * FROM v_skills WHERE Vid = ?",
      [data.Vid],
      function (err, rows) {
        if (err) {
          console.log(err);
        }
        // console.log("rows: ",rows);
        if (rows.length > 0) {
          console.log("rows: ", rows);
          if (data.Skill1 != null) {
            DBConnection.query(
              "UPDATE v_skills SET Skill1 = ? WHERE Vid = ?",
              [skills.Skill1, skills.Vid],
              (err, result) => {
                if (err) {
                  console.log(err);
                  reject(err);
                } else {
                  resolve(result);
                }
              }
            );
          }
          if (data.Skill2 != null) {
            DBConnection.query(
              "UPDATE v_skills SET Skill2= ? WHERE Vid = ?",
              [skills.Skill2, skills.Vid],
              (err, result) => {
                if (err) {
                  console.log(err);
                  reject(err);
                } else {
                  resolve(result);
                }
              }
            );
          }
          if (data.Skill3!= null) {
            DBConnection.query(
              "UPDATE v_skills SET Skill3= ? WHERE Vid = ?",
              [skills.Skill3, skills.Vid],
              (err, result) => {
                if (err) {
                  console.log(err);
                  reject(err);
                } else {
                  resolve(result);
                }
              }
            );
          }
          if (data.Skill4 != null) {
            DBConnection.query(
              "UPDATE v_skills SET Skill4= ? WHERE Vid = ?",
              [skills.Skill4, skills.Vid],
              (err, result) => {
                if (err) {
                  console.log(err);
                  reject(err);
                } else {
                  resolve(result);
                }
              }
            );
          }
        } else {
          console.log("Inserting new volunteer skills");
          DBConnection.query(
            "INSERT INTO v_skills set ?",
            skills,
            function (err, rows) {
              if (err) {
                console.log(err);
                reject(false);
              }
              resolve("Skills added successfully");
            }
          );
        }
      }
    );
  });
};

module.exports = {
    addSkills: addSkills,
};
