import DBConnection from "./../configs/DBConnection";

 let addmapping = (data) => {
     return new Promise(async (resolve, reject) => {
             let map = {
                 Aid: data.Aid,
                 Vid: data.Vid,
                 status: data.status
             };

             DBConnection.query(
                 "INSERT INTO mapping set ?", map,
                 function (err, rows) {
                     if (err) {
                       console.log(err);
                       reject(false);
                     }
                     resolve("Mapping added successfully");
                   }
             );

     });
 };

 module.exports = {
     addmapping: addmapping,
 };