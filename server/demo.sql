--adress表
DROP TABLE `address`
CREATE TABLE `address`(
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`addressId` varchar(64),
	-- 接收人
	`userId` varchar(64),
	`recipientName` varchar(64) NOT NULL,
	`streetName` varchar(64) NOT NULL ,
	`postCode` varchar(64),
	`tel` varchar(64),
	`isDefault` int(2) DEFAULT 0,
	PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `fk_userId` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE SET NULL ON UPDATE SET NULL
)AUTO_INCREMENT=1 ENGINE = InnoDB CHARSET=utf8;
-- 添加索引
ALTER TABLE `address` ADD INDEX addressId ( `addressId` )
INSERT INTO `address` (id ,addressId, userId, recipientName,streetName, postCode, tel, isDefault)
						  VALUES(1,'100000001','10000000','张三','浙江省丽水市莲都区丽水学院', '100000001','18867833189',0);
INSERT INTO `address` (addressId, userId, recipientName,streetName, postCode, tel, isDefault)
						  VALUES('100000002','10000000','李四','浙江省丽水市莲都区法院', '1000002001','18888888888',1);
INSERT INTO `address` (addressId, userId, recipientName,streetName, postCode, tel, isDefault)
						  VALUES('100000003','10000000','王五','浙江省丽水市莲都区丽水学院东区', '100300001','18844343443',0);
INSERT INTO `address` (addressId, userId, recipientName,streetName, postCode, tel, isDefault)
						  VALUES('100000004','10000000','赵六','浙江省丽水市莲都区丽水学院东区', '100302001','18843312443',0);
INSERT INTO `address` (addressId, userId, recipientName,streetName, postCode, tel, isDefault)
						  VALUES('100000005','10000001','王晓明','浙江省丽水市莲都区丽水学院东区', '100340001','18847657563',0);
INSERT INTO `address` (addressId, userId, recipientName,streetName, postCode, tel, isDefault)
						  VALUES('100000006','10000002','王晓明','浙江省丽水市莲都区丽水学院东区', '100340001','18847657563',0);
SELECT * FROM `address`



-- goods表
DROP TABLE `imoocmall`.`goods`
CREATE TABLE `imoocmall`.`goods`(
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`productId` VARCHAR(64),
	`productName` VARCHAR(64) NOT NULL ,
	`productPrice` INT(11) NOT NULL,
	`productImage` VARCHAR(64),
	`productUrl` VARCHAR(64),
	PRIMARY KEY (`id`)
)AUTO_INCREMENT=1 ENGINE = InnoDB CHARSET=utf8;
-- 添加索引
ALTER TABLE `goods` ADD INDEX productId ( `productId` )
INSERT INTO `goods` (id ,productId, productName, productPrice, productImage,productUrl)
						  VALUES(1,10001,'小米笔记本1', 3999,'note.jpg','');
INSERT INTO `goods` (productId, productName, productPrice, productImage,productUrl)
					   VALUES (10002,'小米笔记本2', 3499,'note.jpg','');
INSERT INTO `goods` (productId, productName, productPrice, productImage,productUrl)
						 VALUES (10003,'小米笔记本3', 3599,'note.jpg','');
INSERT INTO `goods` (productId, productName, productPrice, productImage,productUrl)
						 VALUES (10004,'小米笔记本4', 3199,'note.jpg','');
INSERT INTO `goods` (productId, productName, productPrice, productImage,productUrl)
						 VALUES (10005,'小米笔记本5', 3799,'mi6.jpg','');
INSERT INTO `goods` (productId, productName, productPrice, productImage,productUrl)
						 VALUES (10006,'小米笔记本6', 333,'mi6.jpg','');
INSERT INTO `goods` (productId, productName, productPrice, productImage,productUrl)
						 VALUES (10007,'小米笔记本7', 444,'mi6.jpg','');
INSERT INTO `goods` (productId, productName, productPrice, productImage,productUrl)
						 VALUES (10008,'小米笔记本8', 1555,'pingheng.jpg','');
INSERT INTO `goods` (productId, productName, productPrice, productImage,productUrl)
						 VALUES (10009,'小米笔记本9', 1111,'pingheng.jpg','');
INSERT INTO `goods` (productId, productName, productPrice, productImage,productUrl)
						 VALUES (10010,'小米笔记本10', 2222,'mi6.jpg','');
INSERT INTO `goods` (productId, productName, productPrice, productImage,productUrl)
						 VALUES (10011,'小米笔记本11', 777,'pingheng.jpg','');
INSERT INTO `goods` (productId, productName, productPrice, productImage,productUrl)
						 VALUES (10012,'小米笔记本12', 1555,'pingheng.jpg','');
INSERT INTO `goods` (productId, productName, productPrice, productImage,productUrl)
						 VALUES (10013,'小米笔记本13', 1111,'pingheng.jpg','');
INSERT INTO `goods` (productId, productName, productPrice, productImage,productUrl)
						 VALUES (10014,'小米笔记本14', 2222,'note.jpg','');
INSERT INTO `goods` (productId, productName, productPrice, productImage,productUrl)
						 VALUES (10015,'小米笔记本15', 777,'note.jpg','');
INSERT INTO `goods` (productId, productName, productPrice, productImage,productUrl)
						 VALUES (10016,'小米笔记本16', 1555,'note.jpg','');
INSERT INTO `goods` (productId, productName, productPrice, productImage,productUrl)
						 VALUES (10017,'小米笔记本17', 1111,'note.jpg','');
INSERT INTO `goods` (productId, productName, productPrice, productImage,productUrl)
						 VALUES (10018,'小米笔记本18', 2222,'note.jpg','');
INSERT INTO `goods` (productId, productName, productPrice, productImage,productUrl)
						 VALUES (10019,'小米笔记本19', 777,'note.jpg','');
INSERT INTO `goods` (productId, productName, productPrice, productImage,productUrl)
						 VALUES (10020,'小米笔记本19', 777,'note.jpg','');
INSERT INTO `goods` (productId, productName, productPrice, productImage,productUrl)
						 VALUES (10021,'小米笔记本20', 1555,'pingheng.jpg','');
INSERT INTO `goods` (productId, productName, productPrice, productImage,productUrl)
						 VALUES (10022,'小米笔记本21', 1111,'note.jpg','');
INSERT INTO `goods` (productId, productName, productPrice, productImage,productUrl)
						 VALUES (10023,'小米笔记本22', 2222,'pingheng.jpg','');
INSERT INTO `goods` (productId, productName, productPrice, productImage,productUrl)
						 VALUES (10024,'小米笔记本23', 777,'note.jpg','');

SELECT * FROM `goods` ORDER BY  id ASC LIMIT 0,5
SELECT * FROM `goods`  order by productPrice asc limit 0,8


-- order表
DROP TABLE IF EXISTS `order`
CREATE TABLE `order`(
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`orderId` varchar(64),
	`addressId` varchar(64),
	`orderTotal` INT(11) DEFAULT 0,
	`orderStatus` INT(1) DEFAULT 0,
  `createDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`),
  KEY `addressId` (`addressId`),
-- 	ON DELETE CASCADE意思是如果外键对应数据被删除，将关联数据完全删除
  CONSTRAINT `fk_addressId` FOREIGN KEY (`addressId`) REFERENCES `address` (`addressId`) ON DELETE SET NULL ON UPDATE SET NULL
)ENGINE = InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
ALTER TABLE `order` ADD INDEX orderId ( `orderId` )

INSERT INTO `order` (id ,orderId, addressId, orderStatus) VALUES(1,'200000','100000001',1);
INSERT INTO `order` (id ,orderId, addressId, orderStatus) VALUES(2,'200001','100000002',1)

SELECT * FROM `order`


--shopping表
DROP TABLE IF EXISTS `shopping`
CREATE TABLE `shopping`(
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	-- 属于哪个订单
	`orderId` VARCHAR(64),
	`buyerId` VARCHAR(64),
	`productId` VARCHAR(64),
	`productNum` INT(11) NOT NULL,
	`checked` INT(1) NOT NULL DEFAULT 0,
	PRIMARY KEY (`id`),
  KEY `orderId` (`orderId`),
  KEY `buyerId` (`buyerId`),
  KEY `productId` (`productId`),
-- 	ON DELETE CASCADE意思是如果外键对应数据被删除，将关联数据完全删除
  CONSTRAINT `fk_orderId` FOREIGN KEY (`orderId`) REFERENCES `order` (`orderId`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `fk_buyerId` FOREIGN KEY (`buyerId`) REFERENCES `user` (`userId`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `fk_productId` FOREIGN KEY (`productId`) REFERENCES `goods` (`productId`) ON DELETE SET NULL ON UPDATE SET NULL
)ENGINE = InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
INSERT INTO `shopping` (orderId,buyerId, productId, productNum,checked) VALUES('200000','10000000','10001',2,1);
INSERT INTO `shopping` (orderId,buyerId, productId, productNum,checked) VALUES('200001','10000001','10002',1,0)

UPDATE `shopping` SET orderId = '10016201709081111501' WHERE buyerId = '10000000' AND checked = 1
SELECT * FROM shopping
DELETE FROM `shopping` WHERE buyerId = '10000001'




-- user表
DROP TABLE `user`
CREATE TABLE `user`(
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`userId` varchar(64),
	`userName` varchar(64) NOT NULL ,
	`userPwd` varchar(64) NOT NULL ,
	`orderList` varchar(64),
	`cartList` varchar(64),
	`addressList` varchar(64),
	PRIMARY KEY (`id`)
)AUTO_INCREMENT=1 ENGINE = InnoDB CHARSET=utf8;
-- 添加索引
ALTER TABLE `user` ADD INDEX userId ( `userId` )
INSERT INTO `user` (id ,userId, userName, userPwd, orderList, cartList, addressList)
						  VALUES(1,'10000000','admin', '123456','','','');
INSERT INTO `user` (userId, userName, userPwd, orderList, cartList, addressList)
						  VALUES('10000001','BBB', '123456','','','');
INSERT INTO `user` (userId, userName, userPwd, orderList, cartList, addressList)
						  VALUES('10000002','CCC', '123456','','','');
INSERT INTO `user` (userId, userName, userPwd, orderList, cartList, addressList)
						  VALUES('10000003','DDD', '123456','','','');
INSERT INTO `user` (userId, userName, userPwd, orderList, cartList, addressList)
						  VALUES('10000004','EEE', '123456','','','');
SELECT * FROM `user` WHERE userName = 'admin'
