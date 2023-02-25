CREATE TABLE Messages (
    timestamp int,
  	msg varchar(65535),
	username varchar(255),
  	userid varchar(255),
  	platform varchar(255)
);
SELECT * FROM Messages;
DROP table Messages;

CREATE TABLE Livevideo (
  	livevideoid varchar(255)
);