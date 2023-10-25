CREATE TABLE user(
                     id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                     login VARCHAR(50) UNIQUE NOT NULL,
                     password VARCHAR(50) NOT NULL,
                     token VARCHAR(255) NOT NULL,
                     fname VARCHAR(255) NOT NULL,
                     lname VARCHAR(255) NOT NULL,
                     email VARCHAR(255) NOT NULL,
                     role  ENUM("user", "admin") NOT NULL DEFAULT "user",
                     registration_date TIMESTAMP NOT NULL,
                     rating INT,
                     profile_picture_url VARCHAR(255)

);



CREATE TABLE post(
                     id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                     author BIGINT UNSIGNED NOT NULL,
                     title VARCHAR(255) NOT NULL,
                     content TEXT NOT NULL,
                     status ENUM('') NOT NULL,
                     publish_date TIMESTAMP NOT NULL,
                     categories BIGINT NOT NULL,
                     FOREIGN KEY (author) REFERENCES user(id)
);

CREATE TABLE category(
                         id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                         title VARCHAR(255) NOT NULL,
                         description TEXT NULL
);

CREATE TABLE post_categories(
                                post_id BIGINT UNSIGNED NOT NULL,
                                category_id BIGINT UNSIGNED NOT NULL,
                                FOREIGN KEY (post_id) REFERENCES post(id),
                                FOREIGN KEY (category_id) REFERENCES category(id)
);

CREATE TABLE comment(
                        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                        parent BIGINT UNSIGNED NOT NULL,
                        author BIGINT UNSIGNED NOT NULL,
                        publish_date TIMESTAMP NOT NULL,
                        content TEXT NOT NULL,
                        FOREIGN KEY (`author`) REFERENCES user(`id`),
                        FOREIGN KEY (`parent`) REFERENCES post(`id`)
);

CREATE TABLE `like`(
                       `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                       `user_id` BIGINT UNSIGNED NOT NULL,
                       `entity_id` BIGINT NOT NULL,
                       `entity_type` ENUM('post', 'comment') NOT NULL,
                       `type` ENUM('like', 'dislike') NOT NULL,
                       FOREIGN KEY (`user_id`) REFERENCES user(`id`)
);
