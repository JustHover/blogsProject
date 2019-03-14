-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2019-03-14 08:02:01
-- 服务器版本： 10.1.34-MariaDB
-- PHP Version: 7.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `item`
--

-- --------------------------------------------------------

--
-- 表的结构 `article`
--

CREATE TABLE `article` (
  `id` int(255) NOT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` varchar(255) DEFAULT NULL,
  `content` text,
  `tagsId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--
-- 转存表中的数据 `article`
--

INSERT INTO `article` (`id`, `tags`, `title`, `author`, `time`, `status`, `content`, `tagsId`) VALUES
(63, '美食 1231231231', '2q2q2', '2q2q33', '2019-03-13 21:44:56', 'true', 'q2q2q2q2', '84'),
(66, '美食 ', '22', '222', '2019-03-11 22:13:51', 'true', '2222', '83'),
(68, '美食 ', '22', '2222', '2019-03-11 23:12:09', 'true', '222', '83'),
(69, '美食 1231231231', '222', '222', '2019-03-13 15:17:40', 'true', '222', '84'),
(70, '2222', '3', '333', '2019-03-13 15:29:48', 'true', '3333', '86');

-- --------------------------------------------------------

--
-- 表的结构 `ob`
--

CREATE TABLE `ob` (
  `id` int(11) NOT NULL,
  `observer` varchar(255) DEFAULT NULL,
  `content` text,
  `time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--
-- 转存表中的数据 `ob`
--

INSERT INTO `ob` (`id`, `observer`, `content`, `time`) VALUES
(8, 'admin', 'qWE12www', '2019-03-14 10:04:43'),
(9, 'admin', 'WEQ', '2019-03-01 05:27:22'),
(11, 'admin', 'QWE', '2019-03-21 05:27:30'),
(13, 'sun', '阿斯弗2', '2019-03-10 05:28:00');

-- --------------------------------------------------------

--
-- 表的结构 `systemset`
--

CREATE TABLE `systemset` (
  `websiteName` varchar(255) DEFAULT NULL,
  `websiteDomain` varchar(255) DEFAULT NULL,
  `bufferTime` varchar(255) DEFAULT NULL,
  `maxFileUpload` varchar(255) DEFAULT NULL,
  `fileType` varchar(255) DEFAULT NULL,
  `IndexTitle` varchar(255) DEFAULT NULL,
  `MetaKeyWord` varchar(255) DEFAULT NULL,
  `MetaCharactor` varchar(255) DEFAULT NULL,
  `CopyrightInfo` varchar(255) DEFAULT NULL,
  `SMTPserver` varchar(255) DEFAULT NULL,
  `SMTPport` varchar(255) DEFAULT NULL,
  `SenderMailbox` varchar(255) DEFAULT NULL,
  `SenderPetName` varchar(255) DEFAULT NULL,
  `MailboxPW` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--
-- 转存表中的数据 `systemset`
--

INSERT INTO `systemset` (`websiteName`, `websiteDomain`, `bufferTime`, `maxFileUpload`, `fileType`, `IndexTitle`, `MetaKeyWord`, `MetaCharactor`, `CopyrightInfo`, `SMTPserver`, `SMTPport`, `SenderMailbox`, `SenderPetName`, `MailboxPW`) VALUES
('1111', '1111', '123', '111', '111', '我问问', '11111', '11112', '222222222', '123123', '123123', '12312312', '123123', '123123123888');

-- --------------------------------------------------------

--
-- 表的结构 `tags`
--

CREATE TABLE `tags` (
  `id` int(11) NOT NULL,
  `tags` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--
-- 转存表中的数据 `tags`
--

INSERT INTO `tags` (`id`, `tags`) VALUES
(86, '2222'),
(87, '11'),
(88, '2222'),
(89, '2222'),
(90, '2222'),
(91, '33'),
(92, '222');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `id` int(10) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `headimg` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT '用户',
  `roleId` varchar(11) DEFAULT '99',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT '123456',
  `status` varchar(255) DEFAULT 'true',
  `petName` varchar(255) DEFAULT NULL,
  `tips` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `username`, `phone`, `email`, `sex`, `ip`, `time`, `headimg`, `role`, `roleId`, `password`, `status`, `petName`, `tips`) VALUES
(64, '我喂喂喂喂喂喂喂喂喂喂喂喂ww', '222', '22', NULL, NULL, '2019-03-11 23:44:26', NULL, '管理员', '1', '123456', 'true', NULL, ''),
(66, '小小怪', '18758163699', 'xiaoxiaoguai@qq.com', '0', '112.17.247.1', '2019-03-14 10:07:08', './img/a4de246e-05dd-497d-9925-46bd3d3607c6.jpg', '下士', '99', '654321', 'true', '小小怪下士', '我是小小怪下士'),
(67, '222', '222', '22', NULL, NULL, '2019-03-12 17:04:44', NULL, '超级管理员', '2', '123456', 'true', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `id` (`id`) USING BTREE;

--
-- Indexes for table `ob`
--
ALTER TABLE `ob`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `article`
--
ALTER TABLE `article`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- 使用表AUTO_INCREMENT `ob`
--
ALTER TABLE `ob`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- 使用表AUTO_INCREMENT `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
