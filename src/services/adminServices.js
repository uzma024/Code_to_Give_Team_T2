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

let createNewEvent = (data) => {
    return new Promise(async (resolve, reject) => {
        let event = {
            // id: data.id,
            name: data.name,
            desc: data.desc,
            skill1: data.skill1,
            skill2: data.skill2,
            skill3: data.skill3,
            skill4: data.skill4,
            image: data.image,
        };
        // console.log(event);
        
        DBConnection.query(
            "INSERT INTO toybank.activity_type set ?", event,
            function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(false);
                }
                console.log("Event created");
                resolve("Event created successfully");

            }
        );
    });
};

let createNewActivity = (data,id) => {
    let day= new Date(data.date).getDay();
    return new Promise(async (resolve, reject) => {
        let activity = {
            // id:1, (auto increment)
            aid: id,
            name: data.name,
            mode: data.mode,
            time: data.time,
            date: data.date,
            venue: data.location,
            day:day
        };
        console.log(activity);
        DBConnection.query(
            //add activity to activity table whose id is eventId using where clause
            
            "INSERT INTO toybank.activity set ? ",activity,
            function (err, rows) {

                if (err) {
                    console.log(err);
                    reject(false);
                }
                console.log("Activity created");
                resolve("Activity created successfully");

            }
            
        
        );
    });
}
module.exports = {
    addmapping: addmapping,
    createNewEvent: createNewEvent,
    createNewActivity: createNewActivity
};
  