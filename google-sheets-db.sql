-- phpMyAdmin SQL Dump
-- version 2.11.6
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 28, 2025 at 07:49 AM
-- Server version: 1.0.432
-- PHP Version: 5.2.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Database: `google-sheets-db`
--

-- --------------------------------------------------------

--
-- Table structure for table `sheet`
--

CREATE TABLE `sheet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cell` varchar(10) NOT NULL,
  `value` text NOT NULL,
  `format` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`format`)),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci AUTO_INCREMENT=1 ;

--
-- Dumping data for table `sheet`
--


-- --------------------------------------------------------

--
-- Table structure for table `sheets`
--

CREATE TABLE `sheets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cell` varchar(10) NOT NULL,
  `value` text NOT NULL,
  `format` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`format`)),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci AUTO_INCREMENT=1 ;

--
-- Dumping data for table `sheets`
--