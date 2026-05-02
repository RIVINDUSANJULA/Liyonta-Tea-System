USE `liyontawebshop`;

-- --------------------------------------------------------
-- Data for table `categories`
-- --------------------------------------------------------
INSERT INTO `categories` (`category`) VALUES
('Premium infusions'),
('Standard teas'),
('Green Tea'),
('Herbal Blends'),
('Gift Packs');

-- --------------------------------------------------------
-- Data for table `log`
-- --------------------------------------------------------
INSERT INTO `log` (`date`, `log`) VALUES
('01/05/2026', 'Liyo Tea bag stock updated by - 1 |  stock updated to - 53'),
('01/05/2026', 'Liyo 500g CTC stock updated by - 10 |  stock updated to - 490'),
('02/05/2026', 'System maintenance completed successfully.'),
('02/05/2026', 'Order 202605020001 status changed to Released.'),
('02/05/2026', 'Admin login successful from IP 192.168.1.5.');

-- --------------------------------------------------------
-- Data for table `orderno`
-- --------------------------------------------------------
INSERT INTO `orderno` (`billno`, `month`, `completedate`) VALUES
('202605020001', '5', '20260502'),
('202605020002', '5', '20260502'),
('202605030001', '5', '20260503'),
('202605030002', '5', '20260503'),
('202605040001', '5', '20260504');

-- --------------------------------------------------------
-- Data for table `orders`
-- --------------------------------------------------------
INSERT INTO `orders` (`fullName`, `date`, `time`, `phone`, `Amount`, `address`, `email`, `country`, `province`, `city`, `postalcode`, `items`, `orderno`, `status`, `shipping_amount`, `cod_amount`, `total_amount`, `other`, `payment_method`) VALUES
('Gagana Perera', '02/05/2026', '10:15:30 AM', '0771234567', '2970', 'No 15, Galle Road', 'gagana@example.com', 'Sri Lanka', 'Western', 'Colombo', '00300', 'Liyo 500g CTC - 3(990)', '202605020001', 'Paid', 350, 0, 3320, 0, 'Card'),
('Nimsara Karunaratne', '02/05/2026', '11:45:10 AM', '0719876543', '1560', '42 Kandy Road', 'nimsara@example.com', 'Sri Lanka', 'Central', 'Kandy', '20000', 'Liyo 500g CTC - 2(780)', '202605020002', 'Released', 400, 40, 2000, 0, 'COD'),
('Shenal Arosha', '03/05/2026', '02:30:00 PM', '0765554433', '720', '88 Beach Road', 'shenal@example.com', 'Sri Lanka', 'Southern', 'Galle', '80000', 'Premium 100 Tea Bag - 1(720)', '202605030001', 'Paid', 250, 0, 970, 0, 'Card'),
('Amaya Pitawela', '03/05/2026', '04:20:15 PM', '0751122334', '590', '12 Lake View', 'amaya@example.com', 'Sri Lanka', 'Western', 'Malabe', '10115', 'Green Tea 25 Tea Bag - 2(295)', '202605030002', 'Released', 200, 20, 810, 0, 'COD'),
('Chamethya Yasodie', '04/05/2026', '09:10:45 AM', '0709988776', '400', '5 Temple Lane', 'chamethya@example.com', 'Sri Lanka', 'Western', 'Nugegoda', '10250', 'Liyo 200g CTC - 1(400)', '202605040001', 'Released', 200, 15, 615, 0, 'COD');

-- --------------------------------------------------------
-- Data for table `products`
-- --------------------------------------------------------
INSERT INTO `products` (`productname`, `productprice`, `wholesale_price`, `s_price`, `productstock`, `url`, `description`, `maindescription`, `category_id`, `Weight`) VALUES
('Liyo 500g CTC', 990, 780, 990, 500, '500gCTC.webp', 'Bold flavor and rich aroma.', 'Discover the rich and robust flavors of Liyonta 500g CTC Tea...', 2, 510),
('Premium 100 Tea Bag', 720, 580, 720, 800, 'tea-bag.webp', 'High-quality pekoe fanning tea leaves.', 'Indulge in the exquisite flavors and aromas of Liyonta Premium Tea Bags...', 1, 250),
('Green Tea 25 Tea Bag', 295, 170, 295, 1200, 'gt_25teabag.jpg', 'Smooth, refreshing, naturally uplifting.', 'Discover the refreshing taste and delicate aroma of Liyonta Premium Green Tea...', 3, 55),
('Liyo 100g ORTHO', 210, 150, 210, 300, '100gORTHO.webp', 'Premium tea experience with handpicked leaves.', 'Discover the exquisite flavor of Liyonta 100g Orthodox Tea...', 2, 110),
('Liyo Gift Pack', 1500, 1200, 1500, 50, 'gift_pack.webp', 'An assortment of our finest teas.', 'The perfect gift for any tea lover, featuring a selection of our finest blends...', 5, 1000);

-- --------------------------------------------------------
-- Data for table `shipping_rates`
-- --------------------------------------------------------
INSERT INTO `shipping_rates` (`low`, `high`, `rate`) VALUES
(0, 250, 200),
(250, 500, 250),
(500, 1000, 350),
(1000, 2000, 400),
(2000, 3000, 450);

-- --------------------------------------------------------
-- Data for table `shipping_rates_cod`
-- --------------------------------------------------------
INSERT INTO `shipping_rates_cod` (`low`, `high`, `rate`, `every`, `sum`) VALUES
(0, 2000, 2, 100, 0),
(2001, 10000, 10, 2000, 40),
(10001, 50000, 50, 40000, 80),
(50001, 100000, 100, 50000, 130),
(100001, 200000, 200, 100000, 200);

-- --------------------------------------------------------
-- Data for table `site_visitors_count`
-- --------------------------------------------------------
INSERT INTO `site_visitors_count` (`date`, `page`, `count`) VALUES
('2026-05-01', '/', 150),
('2026-05-01', '/shop', 85),
('2026-05-01', '/cart', 25),
('2026-05-02', '/', 210),
('2026-05-02', '/checkout', 40);