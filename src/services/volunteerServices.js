import DBConnection from "./../configs/DBConnection";

let addmapping = (data) => {
    return new Promise(async (resolve, reject) => {
            let map = {
                Aid: data.Aid,
                Vid: data.Vid,
                status: data.status
            };
            DBConnection.query(
                "select * from mapping where Aid=? and Vid=?",data.Aid,data.Vid,
                function (err, rows) {
                    if (err) {
                      console.log(err);
                      reject(false);
                    }
                    if(rows.length==0){
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
                    }else{
                        DBConnection.query(
                            "update mapping set status = ? where Vid = ? AND Aid= ?",
                            ["accepted", volunteerDetailslist[i], req.params.id],
                            (err) => {
                                if (err) {
                                console.log(err);
                                }
                            }
                        );
                    }
                    resolve("Mapping added successfully");
                  }
            );
            
        
    });
};

module.exports = {
    addmapping: addmapping,
};
  