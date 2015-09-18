--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET search_path = public, pg_catalog;

ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
ALTER TABLE ONLY public."usersCourses" DROP CONSTRAINT "usersCourses_pkey";
ALTER TABLE ONLY public.providers DROP CONSTRAINT providers_pkey;
ALTER TABLE ONLY public.messages DROP CONSTRAINT messages_pkey;
ALTER TABLE ONLY public.courses DROP CONSTRAINT courses_pkey;
ALTER TABLE ONLY public.assets DROP CONSTRAINT assets_pkey;
ALTER TABLE ONLY public."SequelizeMeta" DROP CONSTRAINT "SequelizeMeta_pkey";
ALTER TABLE public."usersCourses" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.providers ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.messages ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.courses ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.assets ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE public.users_id_seq;
DROP SEQUENCE public."usersCourses_id_seq";
DROP TABLE public."usersCourses";
DROP TABLE public.users;
DROP SEQUENCE public.providers_id_seq;
DROP TABLE public.providers;
DROP SEQUENCE public.messages_id_seq;
DROP TABLE public.messages;
DROP SEQUENCE public.courses_id_seq;
DROP TABLE public.courses;
DROP SEQUENCE public.assets_id_seq;
DROP TABLE public.assets;
DROP TABLE public."SequelizeMeta";
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: msharif34
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO msharif34;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: msharif34
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: msharif34; Tablespace: 
--

CREATE TABLE "SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE "SequelizeMeta" OWNER TO msharif34;

--
-- Name: assets; Type: TABLE; Schema: public; Owner: msharif34; Tablespace: 
--

CREATE TABLE assets (
    id integer NOT NULL,
    title character varying(255),
    link character varying(255),
    type character varying(255),
    "courseId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE assets OWNER TO msharif34;

--
-- Name: assets_id_seq; Type: SEQUENCE; Schema: public; Owner: msharif34
--

CREATE SEQUENCE assets_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE assets_id_seq OWNER TO msharif34;

--
-- Name: assets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: msharif34
--

ALTER SEQUENCE assets_id_seq OWNED BY assets.id;


--
-- Name: courses; Type: TABLE; Schema: public; Owner: msharif34; Tablespace: 
--

CREATE TABLE courses (
    id integer NOT NULL,
    title character varying(255),
    instructor character varying(255),
    description character varying(255),
    image character varying(255),
    category character varying(255),
    paid boolean,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE courses OWNER TO msharif34;

--
-- Name: courses_id_seq; Type: SEQUENCE; Schema: public; Owner: msharif34
--

CREATE SEQUENCE courses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE courses_id_seq OWNER TO msharif34;

--
-- Name: courses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: msharif34
--

ALTER SEQUENCE courses_id_seq OWNED BY courses.id;


--
-- Name: messages; Type: TABLE; Schema: public; Owner: msharif34; Tablespace: 
--

CREATE TABLE messages (
    id integer NOT NULL,
    first_name character varying(255),
    last_name character varying(255),
    email character varying(255),
    title character varying(255),
    message text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE messages OWNER TO msharif34;

--
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: msharif34
--

CREATE SEQUENCE messages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE messages_id_seq OWNER TO msharif34;

--
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: msharif34
--

ALTER SEQUENCE messages_id_seq OWNED BY messages.id;


--
-- Name: providers; Type: TABLE; Schema: public; Owner: msharif34; Tablespace: 
--

CREATE TABLE providers (
    id integer NOT NULL,
    pid character varying(255),
    token character varying(255),
    type character varying(255),
    "userId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE providers OWNER TO msharif34;

--
-- Name: providers_id_seq; Type: SEQUENCE; Schema: public; Owner: msharif34
--

CREATE SEQUENCE providers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE providers_id_seq OWNER TO msharif34;

--
-- Name: providers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: msharif34
--

ALTER SEQUENCE providers_id_seq OWNED BY providers.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: msharif34; Tablespace: 
--

CREATE TABLE users (
    id integer NOT NULL,
    first_name character varying(255),
    last_name character varying(255),
    email character varying(255),
    password character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE users OWNER TO msharif34;

--
-- Name: usersCourses; Type: TABLE; Schema: public; Owner: msharif34; Tablespace: 
--

CREATE TABLE "usersCourses" (
    id integer NOT NULL,
    "userId" integer,
    "courseId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE "usersCourses" OWNER TO msharif34;

--
-- Name: usersCourses_id_seq; Type: SEQUENCE; Schema: public; Owner: msharif34
--

CREATE SEQUENCE "usersCourses_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "usersCourses_id_seq" OWNER TO msharif34;

--
-- Name: usersCourses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: msharif34
--

ALTER SEQUENCE "usersCourses_id_seq" OWNED BY "usersCourses".id;


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: msharif34
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_seq OWNER TO msharif34;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: msharif34
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: msharif34
--

ALTER TABLE ONLY assets ALTER COLUMN id SET DEFAULT nextval('assets_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: msharif34
--

ALTER TABLE ONLY courses ALTER COLUMN id SET DEFAULT nextval('courses_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: msharif34
--

ALTER TABLE ONLY messages ALTER COLUMN id SET DEFAULT nextval('messages_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: msharif34
--

ALTER TABLE ONLY providers ALTER COLUMN id SET DEFAULT nextval('providers_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: msharif34
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: msharif34
--

ALTER TABLE ONLY "usersCourses" ALTER COLUMN id SET DEFAULT nextval('"usersCourses_id_seq"'::regclass);


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: msharif34
--

COPY "SequelizeMeta" (name) FROM stdin;
20150913110141-create-user.js
20150914163916-create-provider.js
20150915175104-create-course.js
20150915175121-create-asset.js
\.


--
-- Data for Name: assets; Type: TABLE DATA; Schema: public; Owner: msharif34
--

COPY assets (id, title, link, type, "courseId", "createdAt", "updatedAt") FROM stdin;
1	Basic Aqeedah Course 1	https://www.youtube.com/embed/yZSj7hiYrVQ	video	1	2015-09-15 18:11:40.261-07	2015-09-15 18:11:40.261-07
2	Basic Aqeedah Course 2	https://youtube.com/embed//WrsrauY6qDQ	video	1	2015-09-15 18:12:05.782-07	2015-09-15 18:12:05.782-07
3	Basic Aqeedah Course 3	https://youtube.com/embed/RxspvXP_oU0	video	1	2015-09-15 18:12:46.848-07	2015-09-15 18:12:46.848-07
4	Basic Aqeedah Course 4	https://youtube.com/embed/RxspvXP_oU0	video	1	2015-09-15 18:13:03.731-07	2015-09-15 18:13:03.731-07
5	Basic Fiqh Course 1	https://youtube.com/embed/RzI20PvLgN8	video	2	2015-09-15 18:14:12.782-07	2015-09-15 18:14:12.782-07
6	Basic Fiqh Course 2	https://youtube.com/embed/Qj3uC3pnFQ8	video	2	2015-09-15 18:14:26.993-07	2015-09-15 18:14:26.993-07
7	Basic Fiqh Course 3	https://youtube.com/embed/j-jDH9SVV40	video	2	2015-09-15 18:14:41.051-07	2015-09-15 18:14:41.051-07
8	Basic Fiqh Course 4	https://youtube.com/embed/KdHPdYUCzbA	video	2	2015-09-15 18:14:54.108-07	2015-09-15 18:14:54.108-07
9	Basic Tajweed Course 1	https://youtube/embed/J47qpq8Fda0?list=PL8B4E99CA5DB960E6	video	3	2015-09-15 18:16:40.993-07	2015-09-15 18:16:40.993-07
10	Basic Tajweed Course 2	https://youtube.com/embed/zVeQYIlR9qU?list=PL8B4E99CA5DB960E6	video	3	2015-09-15 18:16:56.494-07	2015-09-15 18:16:56.494-07
11	Basic Tajweed Course 4	https://youtube.com/embed/L33rYMQ5So0?list=PL8B4E99CA5DB960E6	video	3	2015-09-15 18:17:23.084-07	2015-09-15 18:17:23.084-07
\.


--
-- Name: assets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: msharif34
--

SELECT pg_catalog.setval('assets_id_seq', 11, true);


--
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: msharif34
--

COPY courses (id, title, instructor, description, image, category, paid, "createdAt", "updatedAt") FROM stdin;
1	Basic Aqeedah Course	Sheikh Ahmed Nur	Tayibun Academy is now offering a new and improved 7 level classical Fiqh beginners course. The beginners course is now taught in Somali!	images/axmed.jpg	Aqeedah	t	2015-09-15 18:11:40.22-07	2015-09-15 18:11:40.22-07
3	Basic Tajweed Course	Sheikh Abdiaziz Jama	Tayibun Academy is now offering a new and improved 7 level classical Fiqh beginners course. The beginners course is now taught in Somali!	images/abdiaziz.jpg	Quran	t	2015-09-15 18:16:40.965-07	2015-09-15 18:16:40.965-07
2	Basic Fiqh Course	Sheikh Mohamed Kariye	Tayibun Academy is now offering a new and improved 7 level classical Fiqh beginners course. The beginners course is now taught in Somali!	images/kariye.jpg	Fiqh	f	2015-09-15 18:14:12.754-07	2015-09-15 18:14:12.754-07
\.


--
-- Name: courses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: msharif34
--

SELECT pg_catalog.setval('courses_id_seq', 3, true);


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: msharif34
--

COPY messages (id, first_name, last_name, email, title, message, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: msharif34
--

SELECT pg_catalog.setval('messages_id_seq', 1, false);


--
-- Data for Name: providers; Type: TABLE DATA; Schema: public; Owner: msharif34
--

COPY providers (id, pid, token, type, "userId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Name: providers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: msharif34
--

SELECT pg_catalog.setval('providers_id_seq', 1, false);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: msharif34
--

COPY users (id, first_name, last_name, email, password, "createdAt", "updatedAt") FROM stdin;
1	Mukhtar	Shariff	fatuma.cadey@gmail.com	$2a$10$5UASQ62Veukq/Btej28Kfu4GSnxjQp2NjH6sXxKNmI9173Y5kbina	2015-09-15 18:18:38.85-07	2015-09-15 18:18:38.85-07
2	Mukhtar	Shariff	msharif34@yahoo.com	$2a$10$opvld00JJEuI9v.ScEQheujRIGKkhTdHQIFNZF7OyGukE9JpiWrBy	2015-09-15 19:02:03.241-07	2015-09-15 19:02:03.241-07
3	mukhtar	\N	\N	\N	2015-09-17 12:22:45.772-07	2015-09-17 12:22:45.772-07
\.


--
-- Data for Name: usersCourses; Type: TABLE DATA; Schema: public; Owner: msharif34
--

COPY "usersCourses" (id, "userId", "courseId", "createdAt", "updatedAt") FROM stdin;
21	2	1	2015-09-17 22:35:50.159-07	2015-09-17 22:35:50.159-07
\.


--
-- Name: usersCourses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: msharif34
--

SELECT pg_catalog.setval('"usersCourses_id_seq"', 21, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: msharif34
--

SELECT pg_catalog.setval('users_id_seq', 3, true);


--
-- Name: SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: msharif34; Tablespace: 
--

ALTER TABLE ONLY "SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: assets_pkey; Type: CONSTRAINT; Schema: public; Owner: msharif34; Tablespace: 
--

ALTER TABLE ONLY assets
    ADD CONSTRAINT assets_pkey PRIMARY KEY (id);


--
-- Name: courses_pkey; Type: CONSTRAINT; Schema: public; Owner: msharif34; Tablespace: 
--

ALTER TABLE ONLY courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- Name: messages_pkey; Type: CONSTRAINT; Schema: public; Owner: msharif34; Tablespace: 
--

ALTER TABLE ONLY messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: providers_pkey; Type: CONSTRAINT; Schema: public; Owner: msharif34; Tablespace: 
--

ALTER TABLE ONLY providers
    ADD CONSTRAINT providers_pkey PRIMARY KEY (id);


--
-- Name: usersCourses_pkey; Type: CONSTRAINT; Schema: public; Owner: msharif34; Tablespace: 
--

ALTER TABLE ONLY "usersCourses"
    ADD CONSTRAINT "usersCourses_pkey" PRIMARY KEY (id);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: msharif34; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: public; Type: ACL; Schema: -; Owner: msharif34
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM msharif34;
GRANT ALL ON SCHEMA public TO msharif34;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

