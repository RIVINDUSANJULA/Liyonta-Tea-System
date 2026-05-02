SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `liyontawebshop`
--
CREATE DATABASE IF NOT EXISTS `liyontawebshop` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `liyontawebshop`;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `log`
--
CREATE TABLE `log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` varchar(50) DEFAULT NULL,
  `log` varchar(225) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orderno`
--
CREATE TABLE `orderno` (
  `id` int NOT NULL AUTO_INCREMENT,
  `billno` varchar(50) DEFAULT NULL,
  `month` varchar(50) DEFAULT NULL,
  `completedate` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullName` varchar(50) DEFAULT NULL,
  `date` varchar(50) DEFAULT NULL,
  `time` varchar(50) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `Amount` varchar(50) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `province` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `postalcode` varchar(50) DEFAULT NULL,
  `items` varchar(500) DEFAULT NULL,
  `orderno` varchar(50) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `shipping_amount` int DEFAULT NULL,
  `cod_amount` int DEFAULT NULL,
  `total_amount` int DEFAULT NULL,
  `other` int DEFAULT NULL,
  `payment_method` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productname` varchar(50) DEFAULT NULL,
  `productprice` int DEFAULT NULL,
  `wholesale_price` int NOT NULL,
  `s_price` int DEFAULT NULL,
  `productstock` int DEFAULT NULL,
  `url` varchar(1000) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `maindescription` varchar(2500) DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `Weight` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shipping_rates`
--
CREATE TABLE `shipping_rates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `low` int DEFAULT NULL,
  `high` int DEFAULT NULL,
  `rate` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shipping_rates_cod`
--
CREATE TABLE `shipping_rates_cod` (
  `id` int NOT NULL AUTO_INCREMENT,
  `low` int DEFAULT NULL,
  `high` int DEFAULT NULL,
  `rate` int DEFAULT NULL,
  `every` int DEFAULT NULL,
  `sum` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `site_visitors_count`
--
CREATE TABLE `site_visitors_count` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `page` varchar(255) NOT NULL,
  `count` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_date_page` (`date`,`page`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;