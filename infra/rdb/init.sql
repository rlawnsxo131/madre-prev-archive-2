-- account
CREATE TABLE IF NOT EXISTS madre.account(
  `id` BIGINT unsigned NOT NULL AUTO_INCREMENT,
  `uid` VARCHAR(21) NOT NULL,
  `username` VARCHAR(50) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `photo_url` VARCHAR(255) NULL DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ix_uid` (`uid`),
  UNIQUE KEY `ix_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- account_social_provider
CREATE TABLE IF NOT EXISTS madre.account_social_provider(
  `id` BIGINT unsigned NOT NULL AUTO_INCREMENT,
  `account_id` BIGINT unsigned NOT NULL,
  `social_id` varchar(255) NOT NULL,
  `social_username` varchar(50) NULL DEFAULT NULL, 
  `provider` varchar(20) NOT NULL DEFAULT 'GOOGLE', -- GOOGLE
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ix_user_id` (`account_id`),
  UNIQUE KEY `ix_social_id_provider` (`social_id`, `provider`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- account_history