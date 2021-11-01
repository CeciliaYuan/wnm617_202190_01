CREATE TABLE IF NOT EXISTS `track_users` (
`id` INT NULL,
`name` VARCHAR(MAX) NULL,
`username` VARCHAR(MAX) NULL,
`email` VARCHAR(MAX) NULL,
`password` VARCHAR(MAX) NULL,
`img` VARCHAR(MAX) NULL,
`date_create` VARCHAR(MAX) NULL
);

INSERT INTO track_users VALUES
(1,'Whitaker Frost','user1','user1@gmail.com',md5("pass"),'https://via.placeholder.com/400/932/fff/?text=user1','2020-08-05 12:22:53'),
(2,'Ebony Norton','user2','user2@gmail.com',md5("pass"),'https://via.placeholder.com/400/871/fff/?text=user2','2021-05-29 08:02:22'),
(3,'Preston Garcia','user3','user3@gmail.com',md5("pass"),'https://via.placeholder.com/400/951/fff/?text=user3','2020-01-14 11:46:42'),
(4,'Terrell Monroe','user4','user4@gmail.com',md5("pass"),'https://via.placeholder.com/400/962/fff/?text=user4','2021-09-22 04:06:43'),
(5,'Antonia Moses','user5','user5@gmail.com',md5("pass"),'https://via.placeholder.com/400/863/fff/?text=user5','2021-01-05 05:24:21'),
(6,'Harrell Brooks','user6','user6@gmail.com',md5("pass"),'https://via.placeholder.com/400/894/fff/?text=user6','2020-09-10 01:25:45'),
(7,'Pat Salazar','user7','user7@gmail.com',md5("pass"),'https://via.placeholder.com/400/844/fff/?text=user7','2021-09-20 09:37:23'),
(8,'Virginia Gonzalez','user8','user8@gmail.com',md5("pass"),'https://via.placeholder.com/400/738/fff/?text=user8','2021-02-23 10:07:45'),
(9,'Murphy Bishop','user9','user9@gmail.com',md5("pass"),'https://via.placeholder.com/400/708/fff/?text=user9','2020-09-15 12:21:02'),
(10,'Daniels James','user10','user10@gmail.com',md5("pass"),'https://via.placeholder.com/400/870/fff/?text=user10','2020-05-06 09:07:08');