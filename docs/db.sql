create table tag (
     `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
     `name` varchar (50) not null,
     primary key (`id`),
     unique (`name`)
     ) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `tag_map_pageitem` (
 `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
 `tagid` tinyint(2) unsigned NOT NULL,
 `pageitemid` tinyint(3) unsigned NOT NULL,
 PRIMARY KEY (`id`),
 KEY `tagid` (`tagid`),
 KEY `pageitemid` (`pageitemid`),
 CONSTRAINT `tagid_map_pageitem_ibfk_1` FOREIGN KEY (`tagid`) REFERENCES `tag` (`id`),
 CONSTRAINT `tagid_map_pageitem_ibfk_2` FOREIGN KEY (`pageitemid`) REFERENCES `pageitem` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=latin1;
