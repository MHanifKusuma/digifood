create database 'final-project-db-muhammad-hanif';

create table users (
	id serial primary key,
	full_name varchar not null,
	phone varchar not null,
	email varchar not null,
	username varchar not null,
	password varchar not null,
	role int not null,
	profile_picture varchar null,
	created_at timestamp default CURRENT_TIMESTAMP not null,
	updated_at timestamp default CURRENT_TIMESTAMP not null,
	deleted_at timestamp null
);

insert into 
	users (full_name, phone, email, username, password, role)
values
	('admin one', '087675463218', 'admin.one@email.com', 'adminone', '$2a$04$VMrgq.zr1G3B4xeG.sj7LOyC4HqkoOMqCdPMiMNG86X1MGhgwOz82', 0),
	('user one', '08787647362', 'user.one@email.com', 'userone', '$2a$04$q4MpigwBFy3dr1P9pz326uvvWk0wl.nWty/PG6SUzB2Y5ZycqjPu6', 1),
	('user two', '087876473621', 'user.two@email.com', 'usertwo', '$2a$04$3ceS4jO9vn8pJItb6.WVe.fTJVkyzwyhVpFqNW2Z7MEIJeBlD.XkG', 1),
	('user three', '087876473621', 'user.three@email.com', 'userthree', '$2a$04$/y9sqOkKB6zcPFLB/uJr2uWUZ1YfXt.M/gokmI35Lmv6LRGonBLMO', 1)
;
	
create table categories (
	id serial primary key,
	name varchar not null,
	created_at timestamp default CURRENT_TIMESTAMP not null,
	updated_at timestamp default CURRENT_TIMESTAMP not null,
	deleted_at timestamp null
);

insert into
	categories(name)
values
	('Beverages'),
	('Appetizer'),
	('Main Course'),
	('Dessert');

create table menus (
	id serial primary key,
	category_id int not null,
	name varchar not null,
	description varchar not null,
	avg_rating float not null,
	total_review int not null,
	total_favorites int not null,
	price int not null,
	menu_photo varchar not null,
	created_at timestamp default CURRENT_TIMESTAMP not null,
	updated_at timestamp default CURRENT_TIMESTAMP not null,
	deleted_at timestamp null,
	foreign key (category_id) references categories(id) on update cascade on delete cascade
);

insert into 
	menus(category_id, name, description, avg_rating, total_review, total_favorites, price, menu_photo)
values
	(1, 'Sweet Tea', 'Regular sweet tea', 3.5, 5, 3, 5000, ''),
	(1, 'Coke', 'Coca cola can', 4.0, 10, 4, 7500, 'https://res.cloudinary.com/dhlgjnupw/image/upload/v1670246586/coke_x7kccc.jpg'),
	(1, 'Coffee', 'Regular black coffee', 5.0, 20, 10, 8000, 'https://res.cloudinary.com/dhlgjnupw/image/upload/v1670246340/black-coffee_ujtxzh.jpg'),
	(1, 'Mineral Water', '600ml mineral water bottle', 5.0, 10, 0, 3000, 'https://res.cloudinary.com/dhlgjnupw/image/upload/v1670246370/mineral-water_crwe62.jpg'),
	(2, 'Grilled Gyoza', 'Grilled Chicken gyoza (5pcs)', 4.5, 50, 15, 30000, ''),
	(2, 'Siomay', 'Chicken siomay (5pcs)', 4.0, 15, 7, 30000, 'https://res.cloudinary.com/dhlgjnupw/image/upload/v1670246613/siomay_msqdea.jpg'),
	(2, 'Mendoan', 'Grilled Chicken gyoza (5pcs)', 4.0, 20, 9, 15000, ''),
	(2, 'Salad', 'Mixed fruit salad', 3.8, 10, 3, 18000, 'https://res.cloudinary.com/dhlgjnupw/image/upload/v1670246631/salad_fwpc6d.jpg'),
	(3, 'Chicken Satay', 'Grilled chicken satay (10pcs) + rice', 4.1, 30, 17, 45000, ''),
	(3, 'Seafood Fried Rice', 'Fried rice with mixed seafood toppings', 4.7, 50, 18, 40000, 'https://res.cloudinary.com/dhlgjnupw/image/upload/v1670246542/seafood-fried-rice_qlein5.jpg'),
	(3, 'Special Fried Rice', 'Fried rice with sunny side up and sausage slices', 4.5, 25, 15, 35000, 'https://res.cloudinary.com/dhlgjnupw/image/upload/v1670246573/special-fried-rice_kkx7d7.jpg'),
	(3, 'Fettucine Carbonara', 'Fettuccine carbonara dish with bacon, shallots, onion, and garlic, and a creamy sauce.', 4.8, 35, 16, 50000, ''),
	(3, 'Hamburger', 'Burger with smoked beef, cheese slices, and vegetables', 4.3, 23, 19, 25000, 'https://plus.unsplash.com/premium_photo-1667682209935-b6c87cced668?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'),
	(4, 'Sundae', 'Vanilla sundae ice cream with sauce of choices topping', 4.8, 15, 7, 10000, ''),
	(4, 'Banana Split', '3 scopes of mixed chocolate, vanilla, and strawberry ice cream on top of a banana', 4.3, 8, 3, 15000, ''),
	(4, 'Mochi', 'mochi ice cream with various flavor', 5.0, 5, 3, 10000, 'https://res.cloudinary.com/dhlgjnupw/image/upload/v1670246449/mochi_xwkkqq.jpg')
;

create type menu_options_type as enum ('radio', 'check');

create table menu_options (
	id serial primary key,
	menu_id int not null,
	name varchar not null,
	price int not null,
	type menu_options_type not null,
	created_at timestamp default CURRENT_TIMESTAMP not null,
	updated_at timestamp default CURRENT_TIMESTAMP not null,
	deleted_at timestamp null,
	foreign key (menu_id) references menus(id) on update cascade on delete cascade
);

insert into 
	menu_options(menu_id, name, price, type)
values
	(14, 'Chocolate Sauce', 0, 'radio'),
	(14, 'Strawberry Sauce', 0, 'radio'),
	(14, 'Blueberry Sauce', 0, 'radio'),
	(14, 'Oreo Topping', 2000, 'check'),
	(15, 'Mixed Ice Cream', 0, 'radio'),
	(15, 'Chocolate Ice Cream', 0, 'radio'),
	(15, 'Vanilla Ice Cream', 0, 'radio'),
	(15, 'Oreo Topping', 5000, 'check'),
	(15, 'Strawberry Ice Cream', 0, 'radio'),
	(16, 'Chocolate', 0, 'radio'),
	(16, 'Strawberry', 0, 'radio'),
	(16, 'Matcha', 0, 'radio'),
	(16, 'Red Beans', 0, 'radio')
;

create table promotions (
	id serial primary key,
	menu_id int not null,
	name varchar not null,
	discount int not null,
	available boolean not null,
	created_at timestamp default CURRENT_TIMESTAMP not null,
	updated_at timestamp default CURRENT_TIMESTAMP not null,
	deleted_at timestamp null,
	foreign key (menu_id) references menus(id) on update cascade on delete cascade
);

insert into
	promotions(menu_id, name, discount, available)
values
	(13, 'December Burger Deal', 5000, true),
	(15, 'Christmas Banana Party', 3000, true)
;

create table coupons (
	id serial primary key,
	code varchar not null,
	discount_amount int not null,
	available boolean not null,
	created_at timestamp default CURRENT_TIMESTAMP not null,
	updated_at timestamp default CURRENT_TIMESTAMP not null,
	deleted_at timestamp null
);

insert into
	coupons(code, discount_amount, available)
values
	('NOVEMBERDEALS15000', 15000, false),
	('DECEMBERDEAL10000', 1000, true),
	('MONTHLYCOUPON3500', 3500, true),
	('MONTHLYCOUPON1000', 1000, true)
;

create table user_coupons(
	id serial primary key,
	user_id int not null,
	coupon_id int not null,
	expired_at timestamp not null,
	amount int not null,
	created_at timestamp default CURRENT_TIMESTAMP not null,
	updated_at timestamp default CURRENT_TIMESTAMP not null,
	deleted_at timestamp null,
	foreign key (user_id) references users(id) on update cascade on delete cascade,
	foreign key (coupon_id) references coupons(id) on update cascade on delete cascade
);

insert into
	user_coupons(user_id, coupon_id, expired_at, amount)
values
	(2, 3, '2022-12-31 23:59:59', 1),
	(2, 4, '2022-12-31 23:59:59', 5),
	(2, 4, '2022-12-31 23:59:59', 5)
;

create table user_favorites(
	id serial primary key,
	user_id int not null,
	menu_id	int not null,
	created_at timestamp default CURRENT_TIMESTAMP not null,
	updated_at timestamp default CURRENT_TIMESTAMP not null,
	deleted_at timestamp null,
	foreign key (user_id) references users(id) on update cascade on delete cascade,
	foreign key (menu_id) references menus(id) on update cascade on delete cascade
);

insert into
	user_favorites (user_id, menu_id)
values
	(2, 1),
	(2, 5),
	(2, 7),
	(2, 12),
	(2, 16),
	(3, 3),
	(3, 7),
	(3, 13),
	(4, 2),
	(4, 15)
;

create table payment_options(
	id serial primary key,
	name varchar not null,
	created_at timestamp default CURRENT_TIMESTAMP not null,
	updated_at timestamp default CURRENT_TIMESTAMP not null,
	deleted_at timestamp null
);

insert into 
	payment_options(name)
values
	('Bank Transfer'),
	('Debit Card'),
	('Credit Card'),
	('E-Wallet'),
	('Cash')
;

create table deliveries(
	id serial primary key,
	status varchar not null,
	created_at timestamp default CURRENT_TIMESTAMP not null,
	updated_at timestamp default CURRENT_TIMESTAMP not null,
	deleted_at timestamp null
);

insert into
	deliveries(status)
values
	('Waiting Payment'),
	('Cooking Order'),
	('Delivering Order'),
	('Order Completed')
;

create table orders(
	id serial primary key,
	user_id int not null,
	coupon_id int null,
	payment_option_id int null,
	delivery_status_id int null,
	total_price int not null,
	created_at timestamp default CURRENT_TIMESTAMP not null,
	updated_at timestamp default CURRENT_TIMESTAMP not null,
	deleted_at timestamp null,
	foreign key (user_id) references users(id) on update cascade on delete cascade,
	foreign key (coupon_id) references user_coupons(id) on update cascade on delete set null,
	foreign key (payment_option_id) references payment_options(id) on update cascade on delete set null,
	foreign key (delivery_status_id) references deliveries(id) on update cascade on delete set null
);

insert into
	orders(user_id, coupon_id, payment_option_id, delivery_status_id, total_price)
values
	(2, 1, 5, 1, 57000),
	(2, null, 1, 2, 68000),
	(3, null, 2, 3, 50000)
;

create table order_details(
	id serial primary key,
	order_id int not null,
	menu_id int null,
	price int not null,
	quantity int not null,
	add_ons varchar null,
	created_at timestamp default CURRENT_TIMESTAMP not null,
	updated_at timestamp default CURRENT_TIMESTAMP not null,
	deleted_at timestamp null,
	foreign key (order_id) references orders(id) on update cascade on delete cascade,
	foreign key (menu_id) references menus(id) on update cascade on delete set null
);

insert into
	order_details(order_id, menu_id, price, quantity, add_ons)
values
	(1, 13, 20000, 2, ''),
	(1, 15, 12000, 1, 'Mixed Ice Cream, Oreo Topping'),
	(2, 12, 50000, 1, ''),
	(2, 14, 10000, 2, 'Strawberry Sauce'),
	(2, 3, 8000, 1, ''),
	(3, 14, 10000, 3, 'Blueberry Sauce'),
	(3, 14, 10000, 2, 'Chocolate Sauce')
;

