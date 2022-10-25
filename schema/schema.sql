-- Restaurants, Clients and Reservations tables
CREATE TABLE owners (
	owner_uid UUID NOT NULL PRIMARY KEY,
	owner_name VARCHAR(50) NOT NULL,
	owner_address VARCHAR(200) NOT NULL,
	phone_number SMALLINT NOT NULL,
	email VARCHAR(50) NOT NULL UNIQUE,
	email_verified BOOLEAN,
	phone_verified BOOLEAN
);
CREATE TABLE restaurants (
	restaurant_uid UUID PRIMARY KEY ,
	country VARCHAR(20) NOT NULL,
	city VARCHAR(100) NOT NULL,
	title VARCHAR(100) NOT NULL UNIQUE,
	info VARCHAR(100) NOT NULL,
	time_span DATE NOT NULL,
	price_range SMALLINT NOT NULL,
	cover_image TEXT NOT NULL,
	images JSON,
	place_location VARCHAR(2000),
	available_seats SMALLINT NOT NULL,
	menu JSON NOT NULL ,
	seating_types JSON NOT NULL,
	contact_information JSON NOT NULL,
	rating_visibility BOOLEAN NOT NULL,
	additional_information JSON,
	tables JSON NOT NULL,
	owner_uid UUID REFERENCES owners(owner_uid),
	UNIQUE(owner_uid)
);

CREATE TABLE customers (
	customer_uid UUID PRIMARY KEY,
	customer_name VARCHAR(100) NOT NULL,
	company VARCHAR(50) NOT NULL,
	zip_code VARCHAR(20) NOT NULL,
	phone_number SMALLINT NOT NULL UNIQUE,
	customer_address VARCHAR(1000) NOT NULL,
	customer_location VARCHAR(200) NOT NULL,
	country VARCHAR(50) NOT NULL,
	provenance VARCHAR(50) NOT NULL,
	city VARCHAR(200) NOT NULL,
	age SMALLINT NOT NULL,
	email VARCHAR(50) NOT NULL UNIQUE,
	email_verified BOOLEAN
);

CREATE TABLE reservations (
	reservation_uid UUID PRIMARY KEY,
	table_number SMALLINT NOT NULL,
	time_slot JSON NOT NULL,
	party_size SMALLINT NOT NULL,
	reservation_date DATE NOT NULL,
	order_details JSON NOT NULL,
	occasion VARCHAR(200),
	seating_type VARCHAR(50),
	customer_uid UUID REFERENCES customers(customer_uid),
	restaurant_uid UUID REFERENCES restaurants(restaurant_uid),
	UNIQUE(customer_uid , restaurant_uid)
);