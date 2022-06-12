require('dotenv').config();
import mysql from "mysql2";

let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Database connected!");
});

//Volunteer register
connection.query(
    "CREATE TABLE IF NOT EXISTS users(`id` INT NOT NULL AUTO_INCREMENT,`fullname` VARCHAR(255)  NULL,`email` VARCHAR(255)  NULL,`password` VARCHAR(255)  NULL,PRIMARY KEY (`id`))ENGINE=InnoDB DEFAULT CHARSET=utf8;",
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Table users created");
        }
    }
);

// Volunteer details
connection.query(
    "CREATE TABLE IF NOT EXISTS v_details (`Vid` INT NOT NULL, `dob` DATE  NULL,  `address` VARCHAR(255)  NULL, `gender` VARCHAR(45)  NULL,  `city` VARCHAR(45)  NULL,  `nationality` VARCHAR(45)  NULL,  `contact` varchar(15)  NULL,  `partner_inst` VARCHAR(255)  NULL,  `organization` VARCHAR(255)  NULL,  `qualification` VARCHAR(45)  NULL,  `occupation` VARCHAR(45)  NULL, `reasons` VARCHAR(500) NULL, PRIMARY KEY (`Vid`), CONSTRAINT `id2` FOREIGN KEY (`Vid`) REFERENCES `toybank`.`users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8;",
    (err, result) => {
       if (err) {
           console.log("ERROR IS BLAH: HERE-----> "+err);
       } else {
           console.log("Table Volunteer details created");
       }
   }
);

// Languages spoken table
connection.query(
    "CREATE TABLE IF NOT EXISTS Languages_spoken (`Vid` INT NOT NULL,  `lang1` VARCHAR(255)  NULL, `lang2` VARCHAR(255)  NULL, `lang3` VARCHAR(255)  NULL,`lang4` VARCHAR(255)  NULL, PRIMARY KEY (`Vid`), CONSTRAINT `id` FOREIGN KEY (`Vid`) REFERENCES `toybank`.`users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8;",
    (err, result) => {
       if (err) {
           console.log(err);
       } else {
           console.log("Table Volunteer details created");
       }
   }
);

// Volunteer preferences
connection.query(
   "CREATE TABLE IF NOT EXISTS v_preferences(`Vid` INT NOT NULL,`location` VARCHAR(45) NOT NULL,`work_mode` VARCHAR(45) NOT NULL,`days` VARCHAR(45) NOT NULL,`activity` VARCHAR(45) NOT NULL,PRIMARY KEY (`Vid`),CONSTRAINT `Vid`FOREIGN KEY (`Vid`)REFERENCES `toybank`.`users` (`id`)ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8;",
   (err, result) => {
      if (err) {
          console.log(err);
      } else {
          console.log("Table Volunteer preferences created");
      }
  }
);



// Volunteer skills
connection.query(
   "CREATE TABLE  IF NOT EXISTS `toybank`.`v_skills` ( `Vid` INT NOT NULL, `Skill1` VARCHAR(45) NULL, `Skill2` VARCHAR(45) NULL, `Skill3` VARCHAR(45) NULL, `Skill4` VARCHAR(45) NULL, PRIMARY KEY (`Vid`), CONSTRAINT `Vvid` FOREIGN KEY (`Vid`) REFERENCES `toybank`.`users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8;",
   (err, result) => {
      if (err) {
          console.log(err);
      } else {
          console.log("Table Volunteer skills created");
      }
  }
);


module.exports = connection;
