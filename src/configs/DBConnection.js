require("dotenv").config();
import mysql from "mysql2";
import bcrypt from "bcryptjs";

let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect(function (err) {
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

// insert admin details
let salt = bcrypt.genSaltSync(10);
let admin = {
  id: process.env.ADMIN_ID,
  fullname: "Admin",
  email: process.env.ADMIN_EMAIL,
  password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, salt),
};
connection.query("INSERT INTO users SET ?", admin, (err, result) => {
  if (err) {
    console.log("Admin already in database");
  } else {
    console.log("Admin created");
  }
});

// Volunteer details
connection.query(
  "CREATE TABLE IF NOT EXISTS v_details (`Vid` INT NOT NULL, `dob` DATE  NULL,  `address` VARCHAR(255)  NULL, `gender` VARCHAR(45)  NULL,  `city` VARCHAR(45)  NULL,  `nationality` VARCHAR(45)  NULL,  `contact` varchar(15)  NULL,  `partner_inst` VARCHAR(255)  NULL,  `organization` VARCHAR(255)  NULL,  `qualification` VARCHAR(45)  NULL,  `occupation` VARCHAR(45)  NULL, `reasons` VARCHAR(500) NULL, PRIMARY KEY (`Vid`), CONSTRAINT `id2` FOREIGN KEY (`Vid`) REFERENCES `toybank`.`users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8;",
  (err, result) => {
    if (err) {
      console.log("ERROR IS BLAH: HERE-----> " + err);
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
//Events

// Activity-type table
connection.query(
  "CREATE TABLE  IF NOT EXISTS `toybank`.`activity_type` ( `id` INT NOT NULL, `name` VARCHAR(255) NULL,`desc` VARCHAR(500) NULL,`Skill1` VARCHAR(45) NULL, `Skill2` VARCHAR(45) NULL, `Skill3` VARCHAR(45) NULL, `Skill4` VARCHAR(45) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8;",
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Table Activity_type created");
    }
  }
);
// Activity table
connection.query(
  "CREATE TABLE  IF NOT EXISTS `toybank`.`activity` ( `id` INT NOT NULL, `Aid` INT NOT NULL, `name` VARCHAR(50) NULL,`mode` varchar(45) NULL,`date` DATE NULL,`day` varchar(15) NULL, `time` Time NULL, `venue` VARCHAR(45) NULL, PRIMARY KEY (`id`), CONSTRAINT `id3` FOREIGN KEY (`Aid`) REFERENCES `toybank`.`activity_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8;",
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Table Activity created");
    }
  }
);

// Insert default set of activity types for this year
var sql = "INSERT INTO toybank.activity_type VALUES (1, 'Play2Learn session','Play2Learn sessions at Play2Learn centres', 'Story Telling', 'Crafts', 'Painting', ''),(2, 'Play2Learn sheet translation','Translation of English Play2Learn sheets to Hindi', 'Hindi language proficiency', 'English language proficiency' , 'Data entry', ''),(3, 'Play2Learn sheet translation','Translation of English Play2Learn sheets to Marathi', 'Marathi language proficiency', 'English language proficiency' , 'Data entry', ''),(4, 'Hindi audio instructions','Creation of audio instructions in Hindi', 'Hindi language proficiency', 'Typing', '', '')";
connection.query(
	sql,
	(err, result) => {
    if (err) {
      console.log("activity_type already in database");
    } else {
      console.log("Activity type entries inserted");
    }
  }
);

// Insert default set of activities/events for this year

var sql = "INSERT INTO toybank.activity VALUES (1, 1, 'Play2Learn session at Centre1','At Office Center','2022-06-15', 'Weekday', '10:00', 'C 1, Building 1, Area A'),(2, 1, 'Play2Learn session at Centre2','At Office Center', '2022-06-15', 'Weekday', '10:00', 'C 2, Building 2, Area B'),(3, 2, 'Play2Learn sheet translation to Hindi - P124','Work from home',NULL,'','', 'ONLINE'),(4, 3, 'Play2Learn sheet translation to Marathi - P131','Work from home',NULL,'','', 'ONLINE'),(5, 4, 'Create hindi audio instructions for E1442','Work from home',NULL,'','', 'ONLINE')";
connection.query(
	sql,
	(err, result) => {
    if (err) {
      console.log("Activity already in database");
    } else {
      console.log("Activity entries inserted");
    }
  }
);

// mapping table
// connection.query(
//   "CREATE TABLE  IF NOT EXISTS `toybank`.`mapping` ( `Vid` INT NOT NULL, `Aid` INT NOT NULL, `status` ENUM(50) NULL,`mode` varchar(45) NULL,`date` DATE NULL,`day` varchar(15) NULL, `time` Time NULL, `venue` VARCHAR(45) NULL, PRIMARY KEY (`id`), CONSTRAINT `id3` FOREIGN KEY (`Aid`) REFERENCES `toybank`.`activity_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8;",
//   (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Table Activity created");
//     }
//   }
// );

connection.query(
  "CREATE TABLE  IF NOT EXISTS `toybank`.`mapping` ( `Mid` INT NOT NULL AUTO_INCREMENT, `Aid` INT NOT NULL,  `Vid` INT NOT NULL,  `status` ENUM('pending', 'rejected', 'accepted','show','no show') NULL , PRIMARY KEY (`Mid`),CONSTRAINT `eeid` FOREIGN KEY (`Aid`)REFERENCES `toybank`.`activity` (`id`)ON DELETE CASCADE ON UPDATE CASCADE,CONSTRAINT `vvvid`FOREIGN KEY (`Vid`)REFERENCES `toybank`.`users` (`id`)ON DELETE CASCADE ON UPDATE CASCADE)ENGINE=InnoDB DEFAULT CHARSET=utf8;",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Table mapping created");
      }
    }
  );


module.exports = connection;
