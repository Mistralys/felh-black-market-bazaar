--
-- Table structure for table `records`
--

CREATE TABLE `records` (
  `record_id` int(11) UNSIGNED NOT NULL,
  `source_file` varchar(250) NOT NULL,
  `folder_label` varchar(250) NOT NULL,
  `tag_id` int(11) UNSIGNED NOT NULL,
  `label` varchar(250) NOT NULL,
  `data` text NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `records`
--
ALTER TABLE `records`
  ADD PRIMARY KEY (`record_id`),
  ADD KEY `source_file` (`source_file`),
  ADD KEY `label` (`label`),
  ADD KEY `tag_id` (`tag_id`),
  ADD KEY `folder_label` (`folder_label`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `records`
--
ALTER TABLE `records`
  MODIFY `record_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;
