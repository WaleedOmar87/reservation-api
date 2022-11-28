CREATE TABLE public."Reservations" (
    reservation_uid uuid NOT NULL,
    table_id character varying(255),
    time_slot tstzrange,
    party_size integer,
    reservation_date timestamp with time zone,
    expired boolean,
    order_items json,
    order_total integer,
    order_special_request character varying(255),
    occasion character varying(255),
    seating_type character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "UserUserUid" uuid,
    "RestaurantRestaurantUid" uuid
);


CREATE TABLE public."Restaurants" (
    restaurant_uid uuid NOT NULL,
    country character varying(255),
    provenance character varying(255),
    city character varying(255),
    restaurant_name character varying(255),
    restaurant_description character varying(255),
    open_time json,
    price_range int4range,
    cover_image character varying(255),
    preview_images json,
    restaurant_address character varying(255),
    food_menu json,
    seating_types json,
    contact_information json,
    rating_visibility boolean NOT NULL,
    additional_information json,
    tables json,
    status character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "UserUserUid" uuid
);


CREATE TABLE public."Reviews" (
    review_uid uuid NOT NULL,
    food_rating integer,
    service_rating integer,
    ambience_rating integer,
    value_rating integer,
    comment character varying(255),
    date timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "UserUserUid" uuid,
    "RestaurantRestaurantUid" uuid
);


CREATE TABLE public."Sessions" (
    session_uid uuid NOT NULL,
    "user" uuid,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "UserUserUid" uuid
);

CREATE TABLE public."Users" (
    user_uid uuid NOT NULL,
    user_name character varying(255) NOT NULL,
    user_company character varying(255),
    zip_code integer NOT NULL,
    user_role character varying(255) NOT NULL,
    user_address character varying(255) NOT NULL,
    user_country character varying(255) NOT NULL,
    user_provenance character varying(255) NOT NULL,
    user_city character varying(255) NOT NULL,
    user_phone_number integer NOT NULL,
    user_age integer NOT NULL,
    user_email character varying(255) NOT NULL,
    "emailValidationKey" character varying(255),
    user_password character varying(255) NOT NULL,
    "passwordResetKey" character varying(255),
    email_verified boolean,
    phone_verified boolean,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE ONLY public."Reservations"
    ADD CONSTRAINT "Reservations_pkey" PRIMARY KEY (reservation_uid);


ALTER TABLE ONLY public."Restaurants"
    ADD CONSTRAINT "Restaurants_pkey" PRIMARY KEY (restaurant_uid);


ALTER TABLE ONLY public."Reviews"
    ADD CONSTRAINT "Reviews_pkey" PRIMARY KEY (review_uid);

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


ALTER TABLE ONLY public."Sessions"
    ADD CONSTRAINT "Sessions_pkey" PRIMARY KEY (session_uid);

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_emailValidationKey_key" UNIQUE ("emailValidationKey");

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (user_uid);


ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_user_email_key" UNIQUE (user_email);


ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_user_phone_number_key" UNIQUE (user_phone_number);


CREATE UNIQUE INDEX reservations_reservation_uid ON public."Reservations" USING btree (reservation_uid);

CREATE INDEX restaurants_city_country_provenance ON public."Restaurants" USING btree (city, country, provenance);

CREATE UNIQUE INDEX restaurants_restaurant_uid ON public."Restaurants" USING btree (restaurant_uid);

CREATE INDEX users_user_role ON public."Users" USING btree (user_role);


CREATE UNIQUE INDEX users_user_uid_user_email ON public."Users" USING btree (user_uid, user_email);


ALTER TABLE ONLY public."Reservations"
    ADD CONSTRAINT "Reservations_RestaurantRestaurantUid_fkey" FOREIGN KEY ("RestaurantRestaurantUid") REFERENCES public."Restaurants"(restaurant_uid) ON UPDATE CASCADE ON DELETE CASCADE;


ALTER TABLE ONLY public."Reservations"
    ADD CONSTRAINT "Reservations_UserUserUid_fkey" FOREIGN KEY ("UserUserUid") REFERENCES public."Users"(user_uid) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY public."Restaurants"
    ADD CONSTRAINT "Restaurants_UserUserUid_fkey" FOREIGN KEY ("UserUserUid") REFERENCES public."Users"(user_uid) ON UPDATE CASCADE ON DELETE CASCADE;


ALTER TABLE ONLY public."Reviews"
    ADD CONSTRAINT "Reviews_RestaurantRestaurantUid_fkey" FOREIGN KEY ("RestaurantRestaurantUid") REFERENCES public."Restaurants"(restaurant_uid) ON UPDATE CASCADE ON DELETE CASCADE;


ALTER TABLE ONLY public."Reviews"
    ADD CONSTRAINT "Reviews_UserUserUid_fkey" FOREIGN KEY ("UserUserUid") REFERENCES public."Users"(user_uid) ON UPDATE CASCADE ON DELETE CASCADE;


ALTER TABLE ONLY public."Sessions"
    ADD CONSTRAINT "Sessions_UserUserUid_fkey" FOREIGN KEY ("UserUserUid") REFERENCES public."Users"(user_uid) ON UPDATE CASCADE ON DELETE CASCADE;


ALTER TABLE ONLY public."Sessions"
    ADD CONSTRAINT "Sessions_user_fkey" FOREIGN KEY ("user") REFERENCES public."Users"(user_uid) DEFERRABLE;
