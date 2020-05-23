-- Create Section
DROP DATABASE IF EXISTS OnlineRetailDB;
CREATE DATABASE OnlineRetailDB;
USE OnlineRetailDB;

CREATE TABLE Customer
(
  username VARCHAR(15) NOT NULL,
  password VARCHAR(80) NOT NULL,
  user_id VARCHAR(15) NOT NULL,
  first_name VARCHAR(15) NOT NULL,
  last_name VARCHAR(15) NOT NULL,
  PRIMARY KEY (user_id),
  UNIQUE (username)
);

CREATE TABLE Class
(
  class_id INT NOT NULL,
  class_name VARCHAR(25) NOT NULL,
  PRIMARY KEY (class_id)
);

CREATE TABLE Supplier
(
  supplier_id INT NOT NULL,
  supplier_name VARCHAR(25) NOT NULL,
  PRIMARY KEY (supplier_id)
);

CREATE TABLE BankName
(
  bank_id INT NOT NULL,
  name VARCHAR(25) NOT NULL,
  PRIMARY KEY (bank_id)
);

CREATE TABLE Item
(
  item_id VARCHAR(15) NOT NULL,
  item_name VARCHAR(25) NOT NULL,
  price FLOAT NOT NULL,
  amount INT NOT NULL,
  class_id INT NOT NULL,
  supplier_id INT NOT NULL,
  PRIMARY KEY (item_id),
  FOREIGN KEY (class_id) REFERENCES Class(class_id),
  FOREIGN KEY (supplier_id) REFERENCES Supplier(supplier_id)
);

CREATE TABLE BankAccount
(
  customer_id VARCHAR(15) NOT NULL,
  bank_number VARCHAR(14) NOT NULL,
  user_id VARCHAR(15) NOT NULL,
  bank_id INT NOT NULL,
  PRIMARY KEY (customer_id, user_id, bank_id),
  FOREIGN KEY (user_id) REFERENCES Customer(user_id),
  FOREIGN KEY (bank_id) REFERENCES BankName(bank_id)
);

CREATE TABLE Bill
(
  bill_id VARCHAR(15) NOT NULL,
  discount FLOAT,
  address VARCHAR(50) NOT NULL,
  timestamp VARCHAR(20) NOT NULL,
  customer_id VARCHAR(15) NOT NULL,
  user_id VARCHAR(15) NOT NULL,
  PRIMARY KEY (bill_id, customer_id, user_id),
  FOREIGN KEY (customer_id, user_id) REFERENCES BankAccount(customer_id, user_id)
);

CREATE TABLE BillDetail
(
  amount INT NOT NULL,
  bill_id VARCHAR(15) NOT NULL,
  item_id VARCHAR(15) NOT NULL,
  PRIMARY KEY (bill_id, item_id),
  FOREIGN KEY (bill_id) REFERENCES Bill(bill_id),
  FOREIGN KEY (item_id) REFERENCES Item(item_id)
);

-- Insert Section

INSERT INTO Customer(username, password, user_id, first_name, last_name)
VALUES
("axihhexd", "$2b$12$iUlJCR3eLjcNNZkiS9daN.2COhmORSFGBBSPJJWQNFB7RiwCNrzOi", "17850.0", "Landry","Shepherd"),
("nhosizayzfwn", "$2b$12$bYQP9Py/jrYV9YETVMseRuoZbtW.w0ysdFkPLQN5d7zLc8Z6ViVEa", "13047.0", "Khalil","Sean"),
("xordmcrj", "$2b$12$QpU4tGCkI.seSjE/5uNO0e6Gc8Rm8bBF/vv9pvcDA.cXjZQBtwHPO", "12583.0", "Justin","Samuel"),
("oulfllgviw", "$2b$12$D7eVtkxhd/iUkqh71yvV7O54FfZJEosIZis29bbFuwuOk1leeDIDW", "13748.0", "Stefan","Bryant"),
("uwrhvkyybh", "$2b$12$L2cuCoZ7Ig6OYr5oG4v1pe0NSdbYJdJUVdq3VcmQQswrIIJKsTrD6", "15100.0", "Moises","Emery"),
("gupmuoeieh", "$2b$12$WTadwJBv8vq4Z1gwGjAFcu9byoJP6FmWMRzi7vOm/Mb6v.irGHh8i", "15291.0", "Mauricio","Corey"),
("ufzvntcmm", "$2b$12$4iljob0PARWHMVB7Hrg1..IPiFHMaQ3PdNcUakKR6P5Qbsp50jIEe", "14688.0", "Leroy","Joel"),
("nfoaxxiqyf", "$2b$12$HFB8r/BHsC2lj3gjzw.wveiuac1J33qMBkg7Iy/Y.FIDHRbGAhy6.", "17809.0", "Zayne","Jeremias"),
("padlzjhbhs", "$2b$12$QEtjnvcX/57ZLtsj7J1pWO5EetCdAVfzl6N1K03BsIa523tbTtTEy", "15311.0", "Mario","Thomas"),
("rfiqtngryxw", "$2b$12$r9dP6AVEXO1YUBTba/7cze5z5iAWO4m/iQqrYZSW4QWH1gn3Vj1di", "14527.0", "Tate","Nikolai"),
("ckasrhsha", "$2b$12$2m14hEsDpF3KUNQR4/KVvOoV1ASOcjSdoRKNkT29kTXzcxrGhK8lO", "16098.0", "Anson","Baylor"),
("ivpgrexss", "$2b$12$oeIeTqhxFP7Iny3FiL3f7.stZ7Jg5R7RpgDORTRnthRHeCcc9yCau", "18074.0", "Francisco","Kellan"),
("vuudbmxk", "$2b$12$c7kcoQZeyldCBgJkQ5aSt.IUKaVmJYWwTkyVVkjPqqWJHYAGAtmzC", "17420.0", "Rocky","Kace"),
("hcozrdburac", "$2b$12$cxlR1x70t3W3bdBkeo2WQO.PO6Wjea8XVikg8a4/Z5NZKKoP0Atnm", "16029.0", "Uriah","Lochlan"),
("zzojnwxzrv", "$2b$12$qONpRGr7PcR0k0zzuciVwO1g7pI8nxM1vlKRrGdktHENY81r6k6aK", "16250.0", "Gannon","Zavier"),
("qfbqcfctcvhm", "$2b$12$p200XwZhkLzG25ieqpk61usfWSdlkhC/XQTgqQX7YQ8mk00zLj7EK", "12431.0", "Ian","Dominique"),
("sqkigvwkhime", "$2b$12$sTja7XvSEp2IvoyhKNAuhOSaB82uhm9Bazyk94F2n2AEQxrCedajW", "17511.0", "Santana","Channing"),
("ielchljforwj", "$2b$12$2GSNz9Wz/8UYwwUww7eYJuOPQquj0790eRZNAyykf4APLffvuxcla", "17548.0", "Reuben","Phillip"),
("wkgvuiqpi", "$2b$12$n0JL9B4yZTOFJhgVfzF4TeGZOI6/JSv.8upPJs.pHlnRfVF8IZALC", "13705.0", "Heath","Ronin"),
("uifxorwnr", "$2b$12$bQewE8rRX282pmdRLZGzp.ZzeaHWafAJNCC4sMJbjxX/dT9.ch1sO", "13747.0", "Beau","Ignacio"),
("enebjlzblgvh", "$2b$12$gg4ccpGBkWdO773Z8cyeluqaZW2Xlu6jwyEqIDBgrXjKJolGS93sy", "13408.0", "Lucas","Karson"),
("nafxkznzv", "$2b$12$MFfR.m/hzbRjlRGK9OFHK.fbPUvm0urVDOjzdAvdg/dORXTQBOw42", "13767.0", "Jax","Brantley"),
("jzhhavgmki", "$2b$12$UmdnNxYLLSYdJhe1QVBiYu4.97yr.Zr3wRwIrRS/96HWlXJF7jOvq", "17924.0", "Mayson","Dorian"),
("difsibdt", "$2b$12$sJUZbuh/2X9FV3F.xWyYC.nDvttNVr4WEO.kAHXNwM/QqA5u7Ruze", "13448.0", "Chase","Jayce"),
("aqzrvxxxvgl", "$2b$12$0ZYfU5s8HrkZH3dQNRgMredfydWmP/GKn/iejpv0cS9kBg1BzBRTm", "15862.0", "Braylon","Leonidas"),
("wjregnvmvxf", "$2b$12$Bdnm42Q/bRbsGj6bdSYd1.tRgGeZokV0ADBDGBs4SSapYDulNIbFO", "15513.0", "Milo","Declan"),
("oovgqpzzxfv", "$2b$12$fA/ALpXetND3v7HXAJNNKua.f0r1GJ6XypyIUtVs0tCbDlPww9./u", "12791.0", "Rodney","Corey"),
("hzgeabhpty", "$2b$12$hwCLsju..afQI.qpH2JdT.AZ6tgiX7efQz7US7X/qAFmwiq.fZsr6", "16218.0", "Daxua","ThongThao7"),
("heuwayydynh", "$2b$12$Jr1Qh1Am21Goj1Y/.kiGHucOVcinpPRe/NTDLyKCWux8AaaD2tcRi", "14045.0", "Gideon","Layne"),
("vqrtkyotxqn", "$2b$12$bzUsHykBCa.Yzh/m.zCin.U4U2TaGfAhpW4TP5ZHuAYTv5RJsNSQW", "14307.0", "Frankie","Westin"),
("ocwjhikkrc", "$2b$12$kfNqQ.1WocnCykWywz9cI.3Av2ioBAPfIBqZVsdnrj35W0OrT7x5O", "17908.0", "Kody","Brixton"),
("ronbgnmysw", "$2b$12$gC4tqaW.k7aPsBxSNURLT.4jv4C9LGPdH3Y1hZV6eCsjLoV3M3ATG", "17920.0", "Karter","Lachlan"),
("mssvacun", "$2b$12$fkSjB1XXa9jMjlWtD9.8M.iiOBX20akT7nTY6QEMcwVJpXSrIIWTe", "12838.0", "Neil","Jaxx"),
("iynicpaxrbl", "$2b$12$j8UVwTluXjhjZuCLwkdCP.45uSQFB4wtzaD.7Uh//D0tgzd4PRVCW", "13255.0", "Trent","Harlan"),
("hepvdsgow", "$2b$12$JB100CPnsNOjYIZb.R/gf.VVNVk3/tuSEkHzEUEb.q1zAMsQCHPUe", "16583.0", "Kameron","Alejandro"),
("ajsvmmwgcswu", "$2b$12$uKiMh1sUENpg1nDqfwYmJOEFStzXz4O5Rksk3AiIDbUHFlPLkYt8i", "18085.0", "Asa","Jamari"),
("lrnvlcqu", "$2b$12$TJ2YsxogQIREn9TEY7MrXeIBTFjd33Kpd8RankmkVPSdG0RC2fqym", "13758.0", "Madden","Keaton"),
("uitzryponxsi", "$2b$12$xv1k10E3CXcaIwMQLoRnlu1teM2n/.x0CkVcLZIgcSyyxmrkojNsS", "13694.0", "Nixon","Timothy"),
("kfpglzikitw", "$2b$12$SjHrCgCXJxMIjSgnECbNXe3QMR71jO3o9mqQ.9SyvR51B0k0P8DZK", "15983.0", "Louis","Giovanni"),
("uwpozacjhmw", "$2b$12$Q9pNqGAbsON/6sXnpRV23uURx77JvzmXNTxRwZTIrh/TwoJoRZ3Fu", "14849.0", "Braylon","Romeo"),
("lwoijihdxg", "$2b$12$Kf48GndObyGsHALaFH93j.dlTFWCT4MYCHewrOdyDnbMm2ApcuhJi", "17968.0", "Arjun","Henrik"),
("tjdgjhlfjawr", "$2b$12$YS3EvlGblDakmvJQLN5o3uwlwgTqJ2KP9CVILjsIuG8GQclI/cH9S", "16210.0", "Carson","Iker"),
("asjppokf", "$2b$12$7PPReoAHkZZ8rTAtonrfNe7h8O0eGGVTUxyRpR4tzHyPiB/HZ5qsG", "17897.0", "Jayden","Ford"),
("eezsjchd", "$2b$12$B.4U01F7.t7rgp6iq0Jk4OWHM2YMPcrmVwJpqqJu2jE/Vq5gpb3bO", "17377.0", "Pedro","Julius"),
("tbtxdygugivc", "$2b$12$AyRp.XSzTvtixPBeKihgK.07PENxBSuYW3jnEio/aCK4asNEOaXdK", "16552.0", "Cristiano","Asher"),
("jbhjwjwocvh", "$2b$12$.yLOts9Iek4HN7Hu3iD7AeKRDJ26AYWwxdYAD2tvBvLD/LZjKgZ66", "17181.0", "Canaan","Peyton"),
("iecbfzjtx", "$2b$12$C7MFtM4FGJJoqdvhOfI8eOEVYwupjGQ/mCubGVj0hdDcEL5gcLkyy", "17951.0", "Mauricio","Oliver"),
("tbnxktia", "$2b$12$4m3zoUQSKgHLhT/NW9OjIeflnj6bcVujZXWHReKI4V.x6gt7LbMZO", "14729.0", "Landry","Aryan"),
("yyfpquoi", "$2b$12$nDSAoU9ifaOH9XoVNjo2QekNnPLBN7ckuv40vlMYXuEMpddqSvuY2", "12748.0", "Leif","Marcelo"),
("fknwpjvm", "$2b$12$rzROECakthErUEMMqcxexu9qA0O0KshVcDu4m4ZNnY2fFuumM3gl6", "15012.0", "Kingsley","Rory"),
("qltypuoyb", "$2b$12$CCqZH6uB5ulWsOGW25jSIOfXjavHPagjsyooDFGAxRQEuI.8JuJ2W", "12868.0", "Lukas","Wesley");

INSERT INTO Class(class_id, class_name) 
VALUES
(1, "Cooking"),
(2, "Sports"),
(3, "Applicants"),
(4, "Electronics"),
(5, "Computers"),
(6, "Accessories"),
(7, "Wood"),
(8, "Books"),
(9, "Paper"),
(10,"Metal");


INSERT INTO Supplier(supplier_id, supplier_name) 
VALUES
(1, "Nestle"),
(2, "Adidas"),
(3, "FromSoftware"),
(4, "EA"),
(5, "CD Projekt Red"),
(6, "Ubisuck"),
(7, "Bandai Namco"),
(8, "Santa Monica"),
(9, "Activision"),
(10, "Nomada Studio");

INSERT INTO Bill (bill_id, discount, address, timestamp, customer_id, user_id)
VALUES
("536365", 14.0, "3609 MEMORIAL PKWY SW", "2010-12-01 08:26:00", "1.0", "17850.0"),
("536366", 3.0, "6555 U S HIGHWAY 98", "2010-12-01 08:28:00", "2.0", "13047.0"),
("536367", 35.0, "2210 MILL STREET SUITE E", "2010-12-01 08:34:00", "3.0", "12583.0"),
("536368", 31.0, "554 PARK LANE", "2010-12-01 08:35:00", "4.0", "13748.0"),
("536369", 28.0, "8451 S JOHN YOUNG PKWY", "2010-12-01 08:45:00", "5.0", "15100.0"),
("536370", 17.0, "3125 28TH ST SW", "2010-12-01 09:00:00", "6.0", "15291.0"),
("536371", 13.0, "124 W UPTON AVE", "2010-12-01 09:01:00", "7.0", "14688.0"),
("536372", 69.0, "1605 HASLETT RD", "2010-12-01 09:02:00", "8.0", "17809.0"),
("536373", 11.0, "919 W WASHINGTON ST", "2010-12-01 09:09:00", "9.0", "15311.0"),
("536374", 54.0, "84 DIVISION ST", "2010-12-01 09:32:00", "10.0", "14527.0"),
("536375", 4.0, "7017 S WESTNEDGE AVE", "2010-12-01 09:34:00", "11.0", "16098.0"),
("536376", 3.0, "3228 W CARLETON RD", "2010-12-01 09:37:00", "12.0", "18074.0"),
("536377", 11.0, "1250 PERRY AVE", "2010-12-01 09:41:00", "13.0", "17420.0"),
("536378", 27.0, "725 W STATE ST", "2010-12-01 09:45:00", "14.0", "16029.0"),
("536380", 29.0, "5750 W US HIGHWAY 10", "2010-12-01 09:49:00", "15.0", "16250.0"),
("536381", 64.0, "89 54TH ST SW", "2010-12-01 09:53:00", "16.0", "12431.0"),
("C536379", 3.0, "205 BELL AVE", "2010-12-01 09:56:00", "17.0", "17511.0"),
("536382", 25.0, "606 E MICHIGAN AVE", "2010-12-01 09:57:00", "18.0", "17548.0"),
("C536383", 69.0, "693 E LAKEWOOD BLVD", "2010-12-01 09:58:00", "19.0", "13705.0"),
("536384", 53.0, "109 PLAZA DR", "2010-12-01 09:59:00", "20.0", "13747.0"),
("536385", 28.0, "218 ENTERPRISE DR", "2010-12-01 10:03:00", "21.0", "13408.0"),
("536386", 57.0, "1511 E CHICAGO RD", "2010-12-01 10:19:00", "22.0", "13767.0"),
("536387", 35.0, "1071 S BEACON BLVD", "2010-12-01 10:24:00", "23.0", "17924.0"),
("536388", 0.0, "2800 E HOLLAND AVE", "2010-12-01 10:29:00", "24.0", "13448.0"),
("536389", 20.0, "3820 PLAZA DR", "2010-12-01 10:37:00", "25.0", "15862.0"),
("536390", 54.0, "32345 HOWARD AVE", "2010-12-01 10:39:00", "26.0", "15513.0"),
("C536391", 43.0, "701 DELLWOOD S ST", "2010-12-01 10:47:00", "27.0", "12791.0"),
("536392", 35.0, "639 KOLTER DR", "2010-12-01 10:51:00", "28.0", "16218.0"),
("536393", 19.0, "3001 TRAVIS BLVD", "2010-12-01 10:52:00", "29.0", "14045.0"),
("536394", 27.0, "2325 MYERS ST", "2010-12-01 10:53:00", "30.0", "14307.0"),
("536395", 43.0, "2900 GEER RD", "2010-12-01 11:21:00", "31.0", "17908.0"),
("536396", 13.0, "8391 FOLSOM BLVD", "2010-12-01 11:22:00", "32.0", "17920.0"),
("536397", 11.0, "1441 MAYBERRY DR", "2010-12-01 11:27:00", "33.0", "12838.0"),
("536398", 48.0, "3632 LONE TREE WAY", "2010-12-01 11:29:00", "34.0", "13255.0"),
("536399", 12.0, "1280 LATHROP ROAD", "2010-12-01 11:32:00", "35.0", "16583.0"),
("536400", 45.0, "692 FREEMAN LN", "2010-12-01 11:33:00", "36.0", "18085.0"),
("536401", 44.0, "100 RALEYS TOWNE CTR", "2010-12-01 11:34:00", "37.0", "13758.0"),
("536402", 33.0, "8870 MADISON AVE", "2010-12-01 11:41:00", "38.0", "13694.0"),
("536403", 5.0, "2485 NOTRE DAME BLVD", "2010-12-01 11:45:00", "39.0", "15983.0"),
("536404", 58.0, "13384 LINCOLN WAY", "2010-12-01 11:49:00", "40.0", "14849.0"),
("536405", 68.0, "5159 FAIR OAKS BLVD", "2010-12-01 11:57:00", "41.0", "17968.0"),
("536406", 15.0, "6366 MACK RD", "2010-12-01 11:58:00", "42.0", "16210.0"),
("536407", 48.0, "1842 FORT JONES RD", "2010-12-01 12:03:00", "43.0", "17897.0"),
("536408", 10.0, "40041 HIGHWAY 49", "2010-12-01 12:08:00", "44.0", "17377.0"),
("536409", 70.0, "2077 MAIN STREET", "2010-12-01 12:12:00", "45.0", "16552.0"),
("536412", 37.0, "890 SOUTHAMPTON RD", "2010-12-01 12:15:00", "46.0", "17181.0"),
("536414", 46.0, "3550 NORTH G ST", "2010-12-01 12:22:00", "47.0", "17951.0"),
("536415", 24.0, "3701 S CARSON ST", "2010-12-01 12:23:00", "48.0", "14729.0"),
("536416", 8.0, "1315 N STATE ST", "2010-12-01 12:27:00", "49.0", "12748.0"),
("536420", 5.0, "6845 DOUGLAS BLVD", "2010-12-01 12:31:00", "50.0", "15012.0"),
("536423", 29.0, "4840 SAN JUAN AVE", "2010-12-01 12:35:00", "51.0", "12868.0");


INSERT INTO BankName(bank_id, name) 
VALUES
(1,'American Express'),
(2,'Discover'),
(3,'Mastercard'),
(4,'Visa Retired'),
(5,'Visa');

INSERT INTO BankAccount(customer_id, bank_number, user_id, bank_id)
VALUES
("1.0", "2592-7409-5878", "17850.0", 1),
("2.0", "4994-4218-4164", "13047.0", 1),
("3.0", "5849-3643-6714", "12583.0", 3),
("4.0", "1132-4652-6910", "13748.0", 2),
("5.0", "4982-3864-2450", "15100.0", 2),
("6.0", "2642-3629-6526", "15291.0", 2),
("7.0", "7610-8391-6365", "14688.0", 1),
("8.0", "2130-5787-6868", "17809.0", 5),
("9.0", "8356-8720-1692", "15311.0", 1),
("10.0", "2561-8865-1030", "14527.0", 5),
("11.0", "8022-9730-3063", "16098.0", 4),
("12.0", "4214-4057-1673", "18074.0", 1),
("13.0", "5354-4545-6402", "17420.0", 1),
("14.0", "7076-7362-4161", "16029.0", 1),
("15.0", "7488-8714-9360", "16250.0", 2),
("16.0", "4775-8158-9201", "12431.0", 2),
("17.0", "4854-7870-5920", "17511.0", 5),
("18.0", "6110-6069-9319", "17548.0", 5),
("19.0", "1497-7615-4178", "13705.0", 1),
("20.0", "3167-7758-8347", "13747.0", 5),
("21.0", "4160-3287-1444", "13408.0", 2),
("22.0", "1377-5501-3303", "13767.0", 5),
("23.0", "5825-3405-3296", "17924.0", 4),
("24.0", "2251-2467-3865", "13448.0", 2),
("25.0", "8321-5303-4481", "15862.0", 4),
("26.0", "6590-1821-8059", "15513.0", 5),
("27.0", "8918-9871-3776", "12791.0", 3),
("28.0", "4392-9235-8866", "16218.0", 1),
("29.0", "2944-2546-3267", "14045.0", 2),
("30.0", "4531-9382-3474", "14307.0", 4),
("31.0", "9278-4145-1670", "17908.0", 3),
("32.0", "7047-1042-7021", "17920.0", 3),
("33.0", "6724-5883-9029", "12838.0", 2),
("34.0", "2288-8120-1997", "13255.0", 2),
("35.0", "7361-9402-1564", "16583.0", 3),
("36.0", "1624-6084-1504", "18085.0", 1),
("37.0", "6353-5425-7881", "13758.0", 1),
("38.0", "1277-2298-4286", "13694.0", 4),
("39.0", "5492-4460-4936", "15983.0", 1),
("40.0", "1015-6860-9087", "14849.0", 3),
("41.0", "4211-4043-2677", "17968.0", 3),
("42.0", "2764-2961-6636", "16210.0", 5),
("43.0", "6445-3130-2343", "17897.0", 3),
("44.0", "8765-2765-7208", "17377.0", 1),
("45.0", "1773-2088-4849", "16552.0", 4),
("46.0", "5797-2077-9029", "17181.0", 5),
("47.0", "7820-6193-3110", "17951.0", 1),
("48.0", "7039-5958-9880", "14729.0", 4),
("49.0", "4342-7519-1410", "12748.0", 1),
("50.0", "1447-2221-7890", "15012.0", 5),
("51.0", "1222-2759-2345", "12868.0", 3);

INSERT INTO Item(item_id, item_name, price, amount, class_id, supplier_id) 
VALUES
("72800B", "CARRIAGE", 2.46, 144, 2, 1),
("23437", "PACKING CHARGE", 1.43, 1913, 5, 4),
("23345", "WALL ART SPACEBOY", 1.50, 2448, 4, 3),
("23391", "LOCAL CAFE MUG", 4.61, 389, 2, 9),
("23391", "PHOTO CLIP LINE", 4.15, 1, 2, 10),
("23472", "DOUGHNUT LIP GLOSS ", 16.06, 59, 7, 1),
("22167", "HERB MARKER BASIL", 10.68, 233, 1, 2),
("23438", "WRAP RED DOILEY", 1.37, 1727, 4, 4),
("22900", "DAISY JOURNAL ", 3.54, 2781, 9, 10),
("23007", "SET/4 BADGES DOGS", 15.94, 493, 1, 9),
("23079", "KEEP CALM WALL ART ", 8.95, 2, 4, 9),
("23411", "WHITE WICKER STAR ", 5.83, 226, 7, 4),
("21120", "BLUE PARTY BAGS ", 16.98, 1, 8, 10),
("20954", "HENRIETTA HEN MUG ", 8.47, 2, 5, 1),
("22418", "SPACE CADET RED", 1.05, 6392, 3, 7),
("22436", "POTTERING MUG", 0.70, 2135, 6, 5),
("21448", "STARS GIFT TAPE ", 1.91, 349, 3, 4),
("22282", "RABBIT NIGHT LIGHT", 17.17, 148, 6, 2),
("23442", "DOTCOM POSTAGE", 2.08, 42, 2, 7),
("21447", "MINT KITCHEN SCALES", 1.71, 968, 2, 6),
("22906", "GLASS BONNE JAM JAR", 2.04, 1739, 6, 10),
("20973", "CARD DOG AND BALL ", 0.79, 4502, 5, 1),
("20975", "BROCADE RING PURSE ", 0.74, 6520, 8, 9),
("20974", "CORONA MEXICAN TRAY", 0.75, 6417, 2, 7),
("20984", "WRAP GINGHAM ROSE ", 0.38, 3788, 2, 9),
("20983", "APPLE BATH SPONGE", 0.93, 2739, 5, 10),
("20982", "EASTER BUNNY WREATH", 0.95, 2152, 6, 10),
("20981", "ST TROPEZ NECKLACE", 0.96, 1957, 4, 2),
("84461", "SILVER LARIAT 40CM", 2.55, 35, 1, 4),
("21445", "FLORAL SOFT CAR TOY", 1.25, 210, 5, 2),
("21446", "PLASMATRONIC LAMP", 1.57, 457, 4, 2),
("84465", "LUNCH BAG CARS BLUE", 2.95, 10, 7, 5),
("85048", "BUNTING , SPOTTY ", 9.18, 1318, 8, 6),
("23253", "PANTRY ROLLING PIN", 15.95, 4, 3, 6),
("23253", "PINK DISCO HANDBAG", 17.13, 252, 6, 4),
("23124", "GIN AND TONIC MUG", 1.75, 567, 5, 2),
("90168", "BLUE EGG  SPOON", 2.91, 12, 10, 3),
("21458", "PIZZA PLATE IN BOX", 1.82, 182, 9, 4),
("21456", "WHITE TISSUE REAM", 1.48, 170, 3, 8),
("21457", "CANDY SPOT HAND BAG", 1.69, 124, 7, 5),
("22567", "DOORMAT HEARTS", 1.56, 2444, 9, 4),
("22316", "HEARTS GIFT TAPE", 1.37, 660, 6, 1),
("22315", "DAISY HAIR BAND", 1.46, 918, 4, 1),
("84731", "RED RETROSPOT MUG", 1.02, 2, 6, 7),
("84206A", "LUNCH BAG WOODLAND", 0.19, 24, 5, 2),
("82486", "DOORMAT NEW ENGLAND", 9.27, 701, 4, 10),
("85034A", "DOGGY RUBBER", 2.73, 494, 6, 4),
("85034a", "CARD GINGHAM ROSE ", 8.29, 3, 8, 7),
("22158", "TOP SECRET PEN SET", 3.33, 3438, 8, 3),
("22244", "LARGE PARLOUR FRAME", 2.78, 1689, 5, 3),
("22171", "KITCHEN METAL SIGN", 9.93, 1699, 4, 9);


INSERT INTO BillDetail(amount, bill_id, item_id, customer_id, user_id)
VALUES
(6, "536365", "72800B"),
(6, "536366", "23437"),
(8, "536367", "23345"),
(6, "536368", "23391"),
(6, "536369", "23391"),
(2, "536370", "23472"),
(6, "536371", "22167"),
(6, "536372", "23438"),
(6, "536373", "22900"),
(32, "536374", "23007"),
(6, "536375", "23079"),
(6, "536376", "23411"),
(8, "536377", "21120"),
(6, "536378", "20954"),
(6, "536380", "22418"),
(3, "536381", "22436"),
(2, "C536379", "21448"),
(3, "536382", "22282"),
(3, "C536383", "23442"),
(4, "536384", "21447"),
(4, "536385", "22906"),
(6, "536386", "20973"),
(3, "536387", "20975"),
(3, "536388", "20974"),
(3, "536389", "20984"),
(3, "536390", "20983"),
(24, "C536391", "20982"),
(24, "536392", "20981"),
(12, "536393", "84461"),
(12, "536394", "21445"),
(24, "536395", "21446"),
(48, "536396", "84465"),
(24, "536397", "85048"),
(18, "536398", "23253"),
(24, "536399", "23253"),
(24, "536400", "23124"),
(24, "536401", "90168"),
(24, "536402", "21458"),
(20, "536403", "21456"),
(24, "536404", "21457"),
(24, "536405", "22567"),
(12, "536406", "22316"),
(24, "536407", "22315"),
(24, "536408", "84731"),
(36, "536409", "84206A"),
(3, "536412", "82486"),
(80, "536414", "85034A"),
(6, "536415", "85034a"),
(6, "536416", "22158"),
(6, "536420", "22244"),
(6, "536423", "22171");
