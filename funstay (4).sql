-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 18, 2025 at 01:19 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `funstay`
--

-- --------------------------------------------------------

--
-- Table structure for table `addleads`
--

CREATE TABLE `addleads` (
  `leadid` int(5) NOT NULL,
  `lead_type` enum('Individual','Group','Corporate','') NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(250) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `sources` enum('Website','Referral','Advertisement','Other') NOT NULL,
  `group_name` varchar(200) NOT NULL,
  `leader_name` varchar(200) NOT NULL,
  `leader_email` varchar(250) NOT NULL,
  `another_name` varchar(200) NOT NULL,
  `another_email` varchar(250) NOT NULL,
  `another_phone_number` varchar(20) NOT NULL,
  `corporate_id` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `primaryStatus` varchar(50) DEFAULT NULL,
  `secondaryStatus` varchar(50) DEFAULT NULL,
  `opportunity_status1` varchar(50) DEFAULT NULL,
  `opportunity_status2` varchar(50) DEFAULT NULL,
  `travel_type` varchar(50) DEFAULT NULL,
  `passport_number` varchar(20) DEFAULT NULL,
  `preferred_contact_method` enum('Email','Phone','WhatsApp','Other') DEFAULT NULL,
  `special_requirement` text DEFAULT NULL,
  `lead_owner` varchar(50) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `addleads`
--

INSERT INTO `addleads` (`leadid`, `lead_type`, `name`, `email`, `phone_number`, `sources`, `group_name`, `leader_name`, `leader_email`, `another_name`, `another_email`, `another_phone_number`, `corporate_id`, `description`, `status`, `created_at`, `primaryStatus`, `secondaryStatus`, `opportunity_status1`, `opportunity_status2`, `travel_type`, `passport_number`, `preferred_contact_method`, `special_requirement`, `lead_owner`, `updated_at`) VALUES
(9, 'Individual', 'Hemanth', 'hemanth@gmail.com', '9912974173', 'Website', '', '', '', '', '', '', '', 'goa trip', 'opportunity', '2025-01-18 10:59:17', 'New', 'Yet to Contact', 'Confirmed', 'Upcoming Trip', 'by flight', '1234', 'WhatsApp', 'four days stay', NULL, '2025-01-18 11:07:53'),
(11, 'Group', 'Jermaine Haynes', 'purenapemu@mailinator.com', '+1 (421) 719-1806', 'Advertisement', '', '', '', 'Iona Ferguson', '', '', '', '', 'lead', '2025-01-18 11:39:25', 'No Response', 'Yet to Contact', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-01-18 11:39:25');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `leadid` varchar(255) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT current_timestamp(),
  `text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `leadid`, `timestamp`, `text`) VALUES
(1, '5', '2025-01-17 12:07:42', 'call on next friday'),
(2, '2', '2025-01-18 09:57:15', 'hello'),
(3, '2', '2025-01-18 09:59:19', 'jhd'),
(4, '2', '2025-01-18 09:59:25', 'jskd'),
(5, '2', '2025-01-18 10:01:59', 'h'),
(6, '9', '2025-01-18 11:09:42', 'callback on 23date'),
(7, '9', '2025-01-18 11:10:26', 'they are almost ok');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','manager','employee') NOT NULL,
  `assign_manager` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `managerId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `name`, `mobile`, `email`, `password`, `role`, `assign_manager`, `created_at`, `updated_at`, `managerId`) VALUES
(1, 'HEMANTH', '9666010238', 'uppalahemanth4@gmail.com', '$2b$10$Oe0BNkBkFxlQiLKCDz3RtOe/nHPvZ3X/INUHvxfIw404uweiK7PQ.', 'admin', NULL, '2025-01-16 07:52:58', '2025-01-16 09:32:54', NULL),
(3, 'hemanth', '9666010238', 'uppalahemanth5@gmail.com', '$2b$10$N4YrdZ8LLnNiIauM76CbSueWb9WE4ayExZ3Bh5XLxKHMwX0drPTWO', 'employee', 'hemanth', '2025-01-16 07:59:19', '2025-01-16 07:59:19', NULL),
(4, 'test', '9912974173', 'test@gmail.com', '$2b$10$U17Y/0MMlvL3g4w0nsd.x.sDHDIYp9Q12T.VN/PJAJBKRnnq6aqgC', 'employee', '1', '2025-01-16 08:06:30', '2025-01-16 08:06:30', NULL),
(5, 'praven', '9912954173', 'praveen@gmail.com', '$2b$10$702elG2i0fgfkezQrHXIGeUOkjgPMwPpx3Iglqh35HvH4pD2WP/zW', 'employee', NULL, '2025-01-16 08:11:07', '2025-01-16 08:11:07', NULL),
(6, '123', '1234567890', '123@gmail.com', '$2b$10$GT2K1oF273cZAEa84f.Yb.vZsAsBWnmdtCeZ/oJw12Go4PWar4KE2', 'employee', '1', '2025-01-16 08:54:09', '2025-01-16 08:54:09', NULL),
(7, 'thj', '83840980', 'kdkj@gmail.com', '$2b$10$5WPfQttjc9jx.msijVtdWO6hLuAQQE3uSpVCmo3Unui/GGfGXtqfu', 'manager', NULL, '2025-01-16 09:06:38', '2025-01-16 09:06:38', NULL),
(8, 'hbjh', '9438834', 'hdskj@gmail.com', '$2b$10$/8bKm4iyQml6HS941ZscD.WZE7YghN6FcdNJ5I0zZmYhUtPMblGmG', 'employee', '', '2025-01-16 09:07:17', '2025-01-16 09:07:17', NULL),
(9, 'jk', '8980989', 'jhbkj@gmail.com', '$2b$10$2ytfLpuFI6ACcYmiyms31eU7I/122bgN7DqG1pkxVrklo2yZhZKIi', 'employee', 'thj', '2025-01-16 09:18:52', '2025-01-16 09:18:52', 7),
(10, 'jklkj', '90439', 'jklfjdlkj@gmail.com', '$2b$10$2cfer1a4hF8XCvyU2YRVeuH28Ywv83g6PjRgnIzLrhAon18knrE06', 'manager', NULL, '2025-01-16 09:19:28', '2025-01-16 09:19:28', NULL),
(11, 'rajesh', '9912974173', 'rajesh@gmail.com', '$2b$10$ZJep4J2N7UYzA98NnCX/guHDEUufVILzmaUENiiRvEd0rNUmWGT2O', 'manager', NULL, '2025-01-16 09:29:04', '2025-01-16 09:29:04', NULL),
(12, 'Priya', '9010053093', 'priya@gmail.com', '$2b$10$ASAxnwQ57v6PfDxb7Ndz4OGTlKZONU21r1WA8.03ZJdgasMuD5lce', 'employee', 'rajesh', '2025-01-16 09:30:08', '2025-01-16 09:30:08', 11),
(13, 'test', '903409', 'tset@gmail.com', '$2b$10$gAX/wdjyDpD2EK8kcd3.1OaM.kb19ViPjbDNX8UlWTFwIhyrk8.Um', 'manager', NULL, '2025-01-16 11:24:15', '2025-01-16 11:24:15', NULL),
(14, 'kjjckljlk', '67697987', 'uiijk@gmail.com', '$2b$10$fuQohcoR2IPC0wSxOxLJ7ePCuzpWEoFKKXj3SaZ/omECnSrNDbS/O', 'employee', 'rajesh', '2025-01-16 11:36:38', '2025-01-16 11:36:38', 11),
(15, 'kjdskl', '834809', 'jdflj@h@gmail.com', '$2b$10$aUMCFYFah5gQZgAH/pjUv.gCxWI/lvoR0XRE7hbKpFIthprU0fI0y', 'manager', NULL, '2025-01-16 11:37:13', '2025-01-16 11:37:13', NULL),
(16, 'kkj', '989043', 'jkjdsk@gmail.com', '$2b$10$RS9giCqJcaYhxVsOxS2hK.9ZwlwaJdWMvMHfK3fh5zoU9lSf9xH7a', 'manager', NULL, '2025-01-16 11:57:42', '2025-01-16 11:57:42', NULL),
(17, 'hjh', '8789', 'bmn@gmail.com', '$2b$10$iPEuN9WttG3JXXnoats3pOPeQdmux6SaaFhvOQ28CX1hz.CNxK0oO', 'manager', NULL, '2025-01-16 12:03:43', '2025-01-16 12:03:43', NULL),
(18, 'jghj', '979', 'mnnmn@gmail.com', '$2b$10$tKPEJfcLUId.SylO6l5IAOnfDLtIr16kKJG6fMtYcP91LTQge4lde', 'manager', NULL, '2025-01-16 12:06:21', '2025-01-16 12:06:21', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `followups`
--

CREATE TABLE `followups` (
  `id` int(11) NOT NULL,
  `leadId` int(11) DEFAULT NULL,
  `tripName` varchar(255) DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `duration` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `leads`
--

CREATE TABLE `leads` (
  `id` int(11) NOT NULL,
  `type` enum('individual','group','corporate') NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `sources` varchar(255) DEFAULT NULL,
  `group_name` varchar(255) DEFAULT NULL,
  `leader_name` varchar(255) DEFAULT NULL,
  `leader_email` varchar(255) DEFAULT NULL,
  `another_name` varchar(255) DEFAULT NULL,
  `another_email` varchar(255) DEFAULT NULL,
  `another_phone_number` varchar(15) DEFAULT NULL,
  `corporate_id` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `leads`
--

INSERT INTO `leads` (`id`, `type`, `name`, `email`, `phone_number`, `sources`, `group_name`, `leader_name`, `leader_email`, `another_name`, `another_email`, `another_phone_number`, `corporate_id`, `description`, `status`, `created_at`) VALUES
(2, 'individual', 'hemanth', 'hemanth@gmail.com', '9912974173', 'Website', '', '', '', '', '', '', '', 'hyd', 'Qualified', '2025-01-07 09:59:52'),
(3, 'group', 'hemanth', 'hemanth@gmail.com', '9912974173', 'Referral', '', '', '', 'hemanth', 'hemanth@gmail.com', '9912974173', '', 'hyd', 'Qualified', '2025-01-07 10:00:47');

-- --------------------------------------------------------

--
-- Table structure for table `travel_opportunity`
--

CREATE TABLE `travel_opportunity` (
  `id` int(11) NOT NULL,
  `leadid` varchar(50) DEFAULT NULL,
  `destination` varchar(255) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `duration` int(11) NOT NULL,
  `adults_count` int(11) NOT NULL,
  `children_count` int(11) NOT NULL,
  `child_ages` text DEFAULT NULL,
  `approx_budget` decimal(10,2) DEFAULT NULL,
  `assignee` int(11) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `comments` text DEFAULT NULL,
  `reminder_setting` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `travel_opportunity`
--

INSERT INTO `travel_opportunity` (`id`, `leadid`, `destination`, `start_date`, `end_date`, `duration`, `adults_count`, `children_count`, `child_ages`, `approx_budget`, `assignee`, `notes`, `comments`, `reminder_setting`, `created_at`, `updated_at`) VALUES
(4, '9', 'Goa Trip', '2025-02-20', '2025-02-25', 5, 5, 2, 'below 15 age', 20000.00, NULL, 'requested pics', NULL, '2025-01-21 18:30:00', '2025-01-18 11:07:53', '2025-01-18 11:07:53');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addleads`
--
ALTER TABLE `addleads`
  ADD PRIMARY KEY (`leadid`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `followups`
--
ALTER TABLE `followups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lead_id` (`leadId`);

--
-- Indexes for table `leads`
--
ALTER TABLE `leads`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `travel_opportunity`
--
ALTER TABLE `travel_opportunity`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addleads`
--
ALTER TABLE `addleads`
  MODIFY `leadid` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `followups`
--
ALTER TABLE `followups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `leads`
--
ALTER TABLE `leads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `travel_opportunity`
--
ALTER TABLE `travel_opportunity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followups`
--
ALTER TABLE `followups`
  ADD CONSTRAINT `followups_ibfk_1` FOREIGN KEY (`leadId`) REFERENCES `leads` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
