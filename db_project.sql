-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 03, 2019 at 10:33 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `cookies`
--

CREATE TABLE `cookies` (
  `id` int(10) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `cookie_value` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cookies`
--

INSERT INTO `cookies` (`id`, `user_name`, `cookie_value`) VALUES
(404, 'user', 's:Fcksnd04WITnPtgQrJ9INEGayPVl0Gno.I3WEiY9Y7SS7aUuZVE7jnkDwfQz8/k65sViz9lIxnFk'),
(405, 'admin', 's:XF2QojP42i0lmEBAXiFnZTGP6V7d5km7.qkVDd0KxECh7WqEvDUPLtqSbu19iPradxBEIUb8oWBY');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(20) NOT NULL,
  `first` varchar(20) NOT NULL,
  `last` varchar(20) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first`, `last`, `user_name`, `password`, `is_admin`) VALUES
(11, 'shir', 'nigri', 'admin', 'admin', 1),
(40, 'shir', 'nigri', 'user', 'user', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users_vacations`
--

CREATE TABLE `users_vacations` (
  `id` int(10) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `vacation_id` int(100) NOT NULL,
  `is_follow` tinyint(1) DEFAULT NULL,
  `updated_date` int(11) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users_vacations`
--

INSERT INTO `users_vacations` (`id`, `user_name`, `vacation_id`, `is_follow`, `updated_date`) VALUES
(50, 'user', 6, 1, 1559593910);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `id` int(100) NOT NULL,
  `description` varchar(250) NOT NULL,
  `destination` varchar(20) NOT NULL,
  `img_url` varchar(400) NOT NULL,
  `from_date` int(11) UNSIGNED DEFAULT NULL,
  `to_date` int(11) UNSIGNED DEFAULT NULL,
  `price` int(10) UNSIGNED DEFAULT NULL,
  `created_date` int(11) UNSIGNED DEFAULT NULL,
  `updated_date` int(11) UNSIGNED DEFAULT NULL,
  `deleted_date` int(11) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`id`, `description`, `destination`, `img_url`, `from_date`, `to_date`, `price`, `created_date`, `updated_date`, `deleted_date`) VALUES
(1, 'best vec ever', 'paris', 'HERO_UltimateParis_Heroshutterstock_112137761.jpg', 20190401, 20190406, 5000, 20190406, 1554754801, NULL),
(3, 'London, the capital of England and the United Kingdom, is a 21st-century', 'London', 'Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall.jpg', 20190301, 20190401, 20, 20190406, 20190406, NULL),
(5, '1234', 'Eilat', 'images.jpg', 20190301, 20190401, 20, 20190406, 1554666434, NULL),
(6, 'Cozumel, a mostly undeveloped Mexican island in the Caribbean Sea, is a popular cruise ship port of call famed for its scuba diving. At Arrecifes de Cozumel National Park, there\'s diving spots around a section of the Mesoamerican Reef and the Museo S', 'Cozumel', 'Medical-Care-in-Mexico.jpg', 1561928400, 1564520400, 20, 20190406, 1559584464, NULL),
(7, 'Tel Aviv is one of the most vibrant cities in the world. Titled the \'Mediterranean Capital of Cool\' by the New York Times, this is a 24 hour city with a unique puls', 'Tel-Aviv', '8ec64b64e1d0805b1101f6c70c7f5b31-tel-aviv.jpg', 20190301, 20190401, 20, 20190406, 20190406, NULL),
(8, 'Dreaming of endless blue and white buildings, wild party nights, ancient sights...it\'s surely got to be Greece, right? You craved it, we delivered it, with just over a week of the best times you can possibly imagine, the Mykonos & Santorini Island Es', 'Santorini Island', 'original.jpg', 20190301, 20190401, 20, 1554666251, 1554666251, NULL),
(10, 'Haifa is Israel\'s third largest city, beautifully set on the slopes of Mount Carmel facing the Mediterranean Sea, likened by some as \'Israel\'s San Francisco\'', 'Haifa', '99a53928e7fe430cdbcd664c41ee8876-haifa.jpg', 1551398400, 1554076799, 20, 1555171849, 1555171849, NULL),
(11, 'For just $599 per person, experience why Iceland\'s been a trending destination for years with this 4-night escape including direct international flights', 'Iceland Escape', 'tzoo.94150.0.831496.Iceland-GettyImages-RF-880372804.jpg', 1551391200, 1554066000, 20, 1555175748, 1557482885, NULL),
(12, 'This 5-night vacation with international airfare includes a stay in Portugal\'s energetic capital city and time in coastal Porto -- and saves $800 versus similar packages', 'Lisbon', 'tzoo.94150.0.832986.Lisbon-eStockPhoto_2001-263020-01.jpg', 1551391200, 1554066000, 20, 1555613845, 1558110992, NULL),
(23, 'Goa is a state in western India with coastlines stretching along the Arabian Sea. Its long history as a Portuguese colony prior to 1961 is evident in its preserved 17th-century churches and the area’s tropical spice plantations', 'Goa', 'goa.jpg', 1558731600, 1559509200, 750, 1558638527, 1559584432, NULL),
(71, 'gffgdfg', 'fnjsdhjkfds', 'cat.jpg', 1559336400, 1559854800, 543, 1559593942, 1559593952, 1559593955);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cookies`
--
ALTER TABLE `cookies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_vacations`
--
ALTER TABLE `users_vacations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cookies`
--
ALTER TABLE `cookies`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=406;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `users_vacations`
--
ALTER TABLE `users_vacations`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
