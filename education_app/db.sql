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
ALTER TABLE ONLY public.providers DROP CONSTRAINT providers_pkey;
ALTER TABLE ONLY public.courses DROP CONSTRAINT courses_pkey;
ALTER TABLE ONLY public.assets DROP CONSTRAINT assets_pkey;
ALTER TABLE ONLY public."SequelizeMeta" DROP CONSTRAINT "SequelizeMeta_pkey";
ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.providers ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.courses ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.assets ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE public.users_id_seq;
DROP TABLE public.users;
DROP SEQUENCE public.providers_id_seq;
DROP TABLE public.providers;
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

ALTER TABLE ONLY providers ALTER COLUMN id SET DEFAULT nextval('providers_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: msharif34
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


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
-- Name: providers_pkey; Type: CONSTRAINT; Schema: public; Owner: msharif34; Tablespace: 
--

ALTER TABLE ONLY providers
    ADD CONSTRAINT providers_pkey PRIMARY KEY (id);


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

