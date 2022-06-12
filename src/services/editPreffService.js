import DBConnection from "./../configs/DBConnection";

let addPreferences = (data) => {
  return new Promise((resolve, reject) => {
    console.log("data: ", data);
    let v_preferences = {
      Vid: data.Vid,
      location: data.loc_pref,
      work_mode: data.work_mode,
      days: data.workday_pref,
      activity: data.activity,
    };
    console.log("user preferences");
    console.log(v_preferences);
    DBConnection.query(
      "SELECT * FROM v_preferences WHERE Vid = ?",
      [data.Vid],
      function (err, rows) {
        if (err) {
          console.log(err);
        }
        // console.log("rows: ",rows);
        if (rows.length > 0) {
          console.log("rows: ", rows);
          if (data.work_mode != null) {
            DBConnection.query(
              "UPDATE v_preferences SET work_mode = ? WHERE Vid = ?",
              [v_preferences.work_mode, v_preferences.Vid],
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
          if (data.location != null) {
            DBConnection.query(
              "UPDATE v_preferences SET location= ? WHERE Vid = ?",
              [v_preferences.location, v_preferences.Vid],
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
          if (data.days != null) {
            DBConnection.query(
              "UPDATE v_preferences SET days= ? WHERE Vid = ?",
              [v_preferences.days, v_preferences.Vid],
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
          if (data.activity != null) {
            DBConnection.query(
              "UPDATE v_preferences SET activity= ? WHERE Vid = ?",
              [v_preferences.activity, v_preferences.Vid],
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
          console.log("Inserting new volunteer Preferences");
          DBConnection.query(
            "INSERT INTO v_preferences set ?",
            v_preferences,
            function (err, rows) {
              if (err) {
                console.log(err);
                reject(false);
              }
              resolve("Preferences added successfully");
            }
          );
        }
      }
    );
  });
};

module.exports = {
  addPreferences: addPreferences,
};
