DROP DATABASE IF EXISTS `neptun_edusys`;
CREATE DATABASE IF NOT EXISTS `neptun_edusys` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;

DROP TABLE IF EXISTS `courses`;
CREATE TABLE IF NOT EXISTS `courses` (
  `code` varchar(75) COLLATE utf8_hungarian_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `type` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `credit` int(11) NOT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

INSERT INTO `courses` (`code`, `name`, `type`, `credit`) VALUES
('PIA-SZAKKF02', 'Szerzői jog, média jog', 'szeminárium', 2),
('PIA-SZAKKF09/E', 'Algoritmusok és adatszerkezetek II.', 'előadás', 2),
('PIA-SZAKKF10', 'Algoritmusok és adatszerkezetek II.', 'gyakorlat', 2),
('PIA-SZAKKF14', 'Számítógépes animáció', 'szeminárium', 2),
('PIA-SZAKKF15', 'Vizuális programozás', 'szeminárium', 3),
('PIA-SZAKKF16', 'Internetes tartalomkezelő rendszerek', 'szeminárium', 2),
('PIA-SZAKKF18', 'Mobil eszközök programozása', 'szeminárium', 2),
('PIA-SZAKKF19/G', 'Szerveroldali programozás', 'szeminárium', 3),
('PIA-SZAKKF20', 'Rendszerfejlesztés', 'szeminárium', 3),
('PIA-SZAKKF21', 'Rendszertervezés, UML', 'szeminárium', 4),
('PIA-SZAKKF22', 'Kooperatív szakmai gyakorlat - C# és .Net programozás', 'szeminárium', 2);

DROP TABLE IF EXISTS `students`;
CREATE TABLE IF NOT EXISTS `students` (
  `code` varchar(6) COLLATE utf8_hungarian_ci NOT NULL,
  `first_name` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

INSERT INTO `students` (`code`, `first_name`, `last_name`) VALUES
('E6UWKT', 'Norbert', 'Jauch'),
('IYI51U', 'Máté', 'Varga'),
('JPL43W', 'Martin', 'Bacsur'),
('Y54JTU', 'Csaba', 'Kiss'),
('Z9IUNJ', 'Bence', 'Juhász');

DROP TABLE IF EXISTS `student_courses`;
CREATE TABLE IF NOT EXISTS `student_courses` (
  `student_code` varchar(6) COLLATE utf8_hungarian_ci NOT NULL,
  `course_code` varchar(75) COLLATE utf8_hungarian_ci NOT NULL,
  PRIMARY KEY (`student_code`,`course_code`),
  KEY `kurzus_id` (`course_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

ALTER TABLE `student_courses`
  ADD CONSTRAINT `student_courses_ibfk_1` FOREIGN KEY (`course_code`) REFERENCES `courses` (`code`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `student_courses_ibfk_2` FOREIGN KEY (`student_code`) REFERENCES `students` (`code`) ON DELETE NO ACTION ON UPDATE CASCADE;
