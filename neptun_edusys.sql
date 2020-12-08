-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2020. Dec 08. 14:48
-- Kiszolgáló verziója: 10.1.38-MariaDB
-- PHP verzió: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `neptun_edusys`
--
CREATE DATABASE IF NOT EXISTS `neptun_edusys` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `neptun_edusys`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `courses`
--

DROP TABLE IF EXISTS `courses`;
CREATE TABLE IF NOT EXISTS `courses` (
  `code` varchar(75) COLLATE utf8_hungarian_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `type` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `credit` int(11) NOT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `courses`
--

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

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `students`
--

DROP TABLE IF EXISTS `students`;
CREATE TABLE IF NOT EXISTS `students` (
  `code` varchar(6) COLLATE utf8_hungarian_ci NOT NULL,
  `first_name` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `students`
--

INSERT INTO `students` (`code`, `first_name`, `last_name`) VALUES
('E6UWKT', 'Norbert', 'Jauch'),
('IYI51U', 'Máté', 'Varga'),
('JPL43W', 'Martin', 'Bacsur'),
('Y54JTU', 'Csaba', 'Kiss'),
('Z9IUNJ', 'Bence', 'Juhász');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `student_courses`
--

DROP TABLE IF EXISTS `student_courses`;
CREATE TABLE IF NOT EXISTS `student_courses` (
  `student_code` varchar(6) COLLATE utf8_hungarian_ci NOT NULL,
  `course_code` varchar(75) COLLATE utf8_hungarian_ci NOT NULL,
  PRIMARY KEY (`student_code`,`course_code`),
  KEY `kurzus_id` (`course_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `student_courses`
--
ALTER TABLE `student_courses`
  ADD CONSTRAINT `student_courses_ibfk_1` FOREIGN KEY (`course_code`) REFERENCES `courses` (`code`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `student_courses_ibfk_2` FOREIGN KEY (`student_code`) REFERENCES `students` (`code`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
