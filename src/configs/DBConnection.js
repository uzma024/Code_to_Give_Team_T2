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
  "CREATE TABLE  IF NOT EXISTS `toybank`.`activity` ( `id` INT NOT NULL, `Aid` INT NOT NULL, `name` VARCHAR(50) NULL,`date` DATE NULL,`day` varchar(15) NULL, `time` Time NULL, `venue` VARCHAR(45) NULL, PRIMARY KEY (`id`), CONSTRAINT `id3` FOREIGN KEY (`Aid`) REFERENCES `toybank`.`activity_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8;",
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Table Activity created");
    }
  }
);

module.exports = connection;
