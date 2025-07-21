--
-- PostgreSQL database dump
--

-- Dumped from database version 15.13 (Debian 15.13-1.pgdg120+1)
-- Dumped by pg_dump version 15.13 (Debian 15.13-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: admission_round; Type: TYPE; Schema: public; Owner: myuser
--

CREATE TYPE public.admission_round AS ENUM (
    'QOUTA',
    'SPECIAL',
    'NORMAL'
);


ALTER TYPE public.admission_round OWNER TO myuser;

--
-- Name: admission_status; Type: TYPE; Schema: public; Owner: myuser
--

CREATE TYPE public.admission_status AS ENUM (
    'PENDING',
    'TEST',
    'PASS',
    'CONFIRM',
    'WAIVED',
    'REJECT'
);


ALTER TYPE public.admission_status OWNER TO myuser;

--
-- Name: admission_type; Type: TYPE; Schema: public; Owner: myuser
--

CREATE TYPE public.admission_type AS ENUM (
    'NEW',
    'MOVE'
);


ALTER TYPE public.admission_type OWNER TO myuser;

--
-- Name: blood_type; Type: TYPE; Schema: public; Owner: myuser
--

CREATE TYPE public.blood_type AS ENUM (
    'A',
    'B',
    'O',
    'AB'
);


ALTER TYPE public.blood_type OWNER TO myuser;

--
-- Name: user_role; Type: TYPE; Schema: public; Owner: myuser
--

CREATE TYPE public.user_role AS ENUM (
    'ADMIN',
    'TEACHER',
    'STUDENT',
    'SUPERVISOR'
);


ALTER TYPE public.user_role OWNER TO myuser;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Attendance; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public."Attendance" (
    id text NOT NULL,
    "userId" text NOT NULL,
    period text[],
    "studedAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Attendance" OWNER TO myuser;

--
-- Name: Leave; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public."Leave" (
    id text NOT NULL,
    "userId" text NOT NULL,
    reason text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Leave" OWNER TO myuser;

--
-- Name: _ClubMembers; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public."_ClubMembers" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


ALTER TABLE public."_ClubMembers" OWNER TO myuser;

--
-- Name: admission_forms; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public.admission_forms (
    id text NOT NULL,
    type public.admission_type NOT NULL,
    round public.admission_round NOT NULL,
    class integer NOT NULL,
    "openedAt" timestamp(3) without time zone NOT NULL,
    "closedAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.admission_forms OWNER TO myuser;

--
-- Name: admissions; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public.admissions (
    id text NOT NULL,
    no integer NOT NULL,
    "studentId" text NOT NULL,
    "academicYear" integer NOT NULL,
    type public.admission_type NOT NULL,
    class integer NOT NULL,
    round public.admission_round NOT NULL,
    plan text NOT NULL,
    "reservePlan" text NOT NULL,
    "serviceZone" text NOT NULL,
    provenance text NOT NULL,
    prefix text NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    "cardId" text NOT NULL,
    "birthDate" timestamp(3) without time zone NOT NULL,
    ethnicity text NOT NULL,
    nationality text NOT NULL,
    religion text NOT NULL,
    "bloodType" public.blood_type NOT NULL,
    phone text NOT NULL,
    talent text NOT NULL,
    "houseNo" integer NOT NULL,
    "villageNo" integer NOT NULL,
    village text NOT NULL,
    road text NOT NULL,
    alley text NOT NULL,
    "subDistrict" text NOT NULL,
    district text NOT NULL,
    province text NOT NULL,
    zipcode text NOT NULL,
    "schoolName" text NOT NULL,
    grade text NOT NULL,
    "subDistrictOld" text NOT NULL,
    "districtOld" text NOT NULL,
    "provinceOld" text NOT NULL,
    "zipcodeOld" text NOT NULL,
    "fatherName" text NOT NULL,
    "fatherJob" text NOT NULL,
    "fatherPhone" text NOT NULL,
    "motherName" text NOT NULL,
    "motherJob" text NOT NULL,
    "motherPhone" text NOT NULL,
    "guardianName" text NOT NULL,
    "guardianJob" text NOT NULL,
    "guardianPhone" text NOT NULL,
    "guardianRelation" text NOT NULL,
    "studentPhoto" text,
    "houseRecord" text,
    "studentRecord" text,
    pdf text,
    status public.admission_status DEFAULT 'PENDING'::public.admission_status NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.admissions OWNER TO myuser;

--
-- Name: announcements; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public.announcements (
    id text NOT NULL,
    description text NOT NULL,
    "isSummarize" boolean DEFAULT false NOT NULL,
    "occurredAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.announcements OWNER TO myuser;

--
-- Name: clubs; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public.clubs (
    id text NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    status boolean DEFAULT true NOT NULL,
    "userId" text NOT NULL,
    "maxMember" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.clubs OWNER TO myuser;

--
-- Name: users; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public.users (
    id text NOT NULL,
    prefix text NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "behaviorPoint" integer DEFAULT 0 NOT NULL,
    level integer DEFAULT 0 NOT NULL,
    room integer DEFAULT 0 NOT NULL,
    no integer DEFAULT 0 NOT NULL,
    role public.user_role NOT NULL,
    verified boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.users OWNER TO myuser;

--
-- Data for Name: Attendance; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public."Attendance" (id, "userId", period, "studedAt", "createdAt", "updatedAt") FROM stdin;
cmda4byjx000nq7ukvjjfgbu4	cmd9tflq6000rq7u88kbi0txl	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.659	2025-07-20 12:56:49.857
cmda4byk8000xq7ukqjiek4iu	cmd9tflq7000vq7u8rxpfcrbt	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.659	2025-07-20 12:56:49.857
cmda4byk7000vq7uk5wwm69af	cmd9tflq7000zq7u8dgfnj1g6	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.659	2025-07-20 12:56:49.857
cmda4byji000aq7uk4s0h7luy	cmd9tflq6000jq7u80jchs55o	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.658	2025-07-20 12:56:49.857
cmda4byj70003q7ukmjbzcz7g	cmd9tflq6000iq7u88ktw4yas	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.658	2025-07-20 12:56:49.857
cmda4byjz000qq7uk5c46fl7k	cmd9tflq6000sq7u8p0y9v6n6	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.659	2025-07-20 12:56:49.857
cmda4byk5000uq7ukmvhaey1r	cmd9tflq7000wq7u8j46ue2db	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.659	2025-07-20 12:56:49.857
cmda4byk3000sq7ukza824cec	cmd9tflq7000tq7u8rnhuyx2w	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.659	2025-07-20 12:56:49.857
cmda4byka0011q7ukayhx07i8	cmd9tflq70018q7u8y452p9rw	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.659	2025-07-20 12:56:49.857
cmda4byk8000wq7uk76vevrs7	cmd9tflq7000yq7u8spwvqb88	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.659	2025-07-20 12:56:49.857
cmda4byjr000gq7ukrgs9fgkj	cmd9tflq6000lq7u815b5m9qp	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.659	2025-07-20 12:56:49.857
cmda4byjy000pq7ukoq8wjfyn	cmd9tflq6000qq7u8oexxe3j2	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.659	2025-07-20 12:56:49.857
cmda4byjt000kq7ukd2h8r8f5	cmd9tflq6000mq7u8dg625w9r	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.659	2025-07-20 12:56:49.857
cmda4byjt000iq7ukf6i9zpqw	cmd9tflq6000nq7u8u2hxc2qt	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.659	2025-07-20 12:56:49.857
cmda4byka000zq7ukfb7fgq9t	cmd9tflq70011q7u839kqybp5	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.659	2025-07-20 12:56:49.857
cmda4byjv000mq7uk6bd6o18u	cmd9tflq6000oq7u8ha87t2pn	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.659	2025-07-20 12:56:49.857
cmda4byka0010q7ukzb7rz26y	cmd9tflq70012q7u8j5vy8zmd	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.659	2025-07-20 12:56:49.857
cmda4byjm000cq7uksiex24qw	cmd9tflq6000kq7u8goc8z5fx	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.658	2025-07-20 12:56:49.857
cmda4byjx000oq7uktshp7n59	cmd9tflq6000pq7u8sgl35vxg	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.659	2025-07-20 12:56:49.857
cmda4byk5000tq7uk0zjzswun	cmd9tflq7000uq7u8j6nz0zv1	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.659	2025-07-20 12:56:49.857
cmda4bykc0017q7ukmoo3qdlf	cmd9tflq70013q7u84yaudfbb	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.659	2025-07-20 12:56:49.858
cmda4byka0014q7uk62ufxyub	cmd9tflq70019q7u8pdun488t	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.659	2025-07-20 12:56:49.858
cmda4bykm001jq7uk20mbvgyz	cmd9tflq7001lq7u8q63r5njm	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.659	2025-07-20 12:56:49.858
cmda4bykp001nq7ukeapn2mr2	cmd9tflq7001qq7u88lhusnjs	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.659	2025-07-20 12:56:49.858
cmda4byka0013q7uk1o1q2jjr	cmd9tflq70010q7u8t2g8wr6c	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.659	2025-07-20 12:56:49.858
cmda4bykq001rq7ukn770jo5n	cmd9tflq7001sq7u8uzdogtmz	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.66	2025-07-20 12:56:49.858
cmda4bykm001kq7ukj7akfv4o	cmd9tflq7001kq7u8lttu5agg	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.659	2025-07-20 12:56:49.858
cmda4bykb0015q7uksvtcltx0	cmd9tflq70017q7u89sy679z7	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.659	2025-07-20 12:56:49.858
cmda4bykn001lq7uk24fnwhag	cmd9tflq7001mq7u84lvixn80	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.659	2025-07-20 12:56:49.858
cmda4byki001dq7uklxovy7mv	cmd9tflq7001eq7u8p4nd4ejz	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.659	2025-07-20 12:56:49.858
cmda4bykd0018q7uk6enzuj2d	cmd9tflq70016q7u8xgwu5iga	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.659	2025-07-20 12:56:49.858
cmda4byks001uq7ukdhwaah0b	cmd9tflq7001vq7u8pmv2itwh	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.66	2025-07-20 12:56:49.858
cmda4bykn001mq7uk7feyhai6	cmd9tflq7001nq7u8kba2tza5	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.659	2025-07-20 12:56:49.858
cmda4byku001vq7ukl0l5392v	cmd9tflq7001wq7u8piee93z1	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.66	2025-07-20 12:56:49.858
cmda4bykc0016q7uk8o8ub0sj	cmd9tflq7001aq7u8whkbi8b8	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.659	2025-07-20 12:56:49.858
cmda4bykk001eq7uk4xzj0g05	cmd9tflq7001fq7u84b7zzot4	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.659	2025-07-20 12:56:49.858
cmda4bykf001cq7ukkl5mw5w5	cmd9tflq7001dq7u898re8ieb	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.659	2025-07-20 12:56:49.858
cmda4bykk001fq7uk8d1snr0e	cmd9tflq7001hq7u8zs95f5lr	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.659	2025-07-20 12:56:49.858
cmda4bykp001pq7uk62h67261	cmd9tflq7001pq7u88nsi0c5c	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.659	2025-07-20 12:56:49.858
cmda4bykf001aq7uk8k05hqew	cmd9tflq70014q7u8raa893xu	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.659	2025-07-20 12:56:49.858
cmda4bykk001iq7ukxb4vo6k6	cmd9tflq7001jq7u8tly0td0l	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.659	2025-07-20 12:56:49.858
cmda4bykw001wq7ukqd59nym8	cmd9tflq7001yq7u8u3za2gzw	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.66	2025-07-20 12:56:49.858
cmda4bykq001qq7uklq531ob6	cmd9tflq7001oq7u8770le2cw	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.659	2025-07-20 12:56:49.858
cmda4bykk001gq7ukl7gsvmlm	cmd9tflq7001gq7u8tfb5ie1m	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.659	2025-07-20 12:56:49.858
cmda4bykq001sq7ukvqn1mb74	cmd9tflq7001uq7u8q48u9wzk	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.66	2025-07-20 12:56:49.858
cmda4bykf0019q7ukiywwee9l	cmd9tflq7001bq7u85qjkhle3	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.659	2025-07-20 12:56:49.858
cmda4bykw001xq7ukavseeun0	cmd9rlgle0000q7u8p9l5e4n7	{"null","null","null","null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.66	2025-07-19 16:23:57.551
cmda4bykp001oq7ukg23e52cr	cmd9tflq7001rq7u8zelza9ko	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.659	2025-07-20 12:56:49.858
cmda4bykf001bq7uk0fb9ovfr	cmd9tflq7001cq7u8ylr2tzpf	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.659	2025-07-20 12:56:49.858
cmda4bykk001hq7ukewg1rrqk	cmd9tflq7001iq7u88a75j4p5	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.659	2025-07-20 12:56:49.858
cmda4byj70002q7uk1vrur790	cmd9tflq60002q7u8dm7yn0ow	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.658	2025-07-20 12:56:49.858
cmda4byjt000jq7uker2434t5	cmd9tflq6000eq7u8acmb2szr	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.658	2025-07-20 12:56:49.859
cmda4byjc0005q7ukvn814cpv	cmd9tflq60005q7u8vh61dr33	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.658	2025-07-20 12:56:49.859
cmda4byk8000yq7uk3d1uz4cx	cmd9tflq7000xq7u8ajqdwwsu	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.659	2025-07-20 12:56:49.859
cmda4byjq000fq7uket7cb6il	cmd9tflq60009q7u8txnn0ju2	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.658	2025-07-20 12:56:49.859
cmda4byjm000bq7uk6ugf916o	cmd9tflq60008q7u8m4ns8bkn	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.658	2025-07-20 12:56:49.859
cmda4byj70001q7ukpky95ogs	cmd9tflq60003q7u85ygfn14p	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.658	2025-07-20 12:56:49.859
cmda4byjc0007q7ukhoclro91	cmd9tflq6000cq7u889g0astg	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.658	2025-07-20 12:56:49.859
cmda4byiq0000q7ukz93jpsye	cmd9tflq60001q7u8krg5gb1t	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.658	2025-07-20 12:56:49.859
cmda4byju000lq7uki2s54pek	cmd9tflq6000hq7u83wig4dsb	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.658	2025-07-20 12:56:49.86
cmda4byjc0006q7ukerom5pwu	cmd9tflq6000gq7u88uo6c1ni	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.658	2025-07-20 12:56:49.86
cmda4byji0009q7ukrwgnh8nh	cmd9tflq60007q7u8d6nqhjxh	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.658	2025-07-20 12:56:49.86
cmda4byjo000dq7ukcinoo540	cmd9tflq60006q7u80r0gz7tw	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.658	2025-07-20 12:56:49.86
cmda4byk1000rq7ukwsurk2g0	cmd9tflq6000dq7u80h7f725c	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.658	2025-07-20 12:56:49.86
cmda4byjt000hq7ukqu87xf57	cmd9tflq6000bq7u8e1g71vpf	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.658	2025-07-20 12:56:49.86
cmda4byja0004q7uk28r4n2ze	cmd9tflq6000aq7u8ibpcyqf4	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.658	2025-07-20 12:56:49.86
cmda4byjd0008q7ukzkbc9ebf	cmd9tflq60004q7u8m7hycbyi	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.658	2025-07-20 12:56:49.86
cmda4byjp000eq7uk0fyypjmd	cmd9tflq6000fq7u8t8hcxikc	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.658	2025-07-20 12:56:49.861
cmdbqj8iy0000q7c45u94wogi	cmd9tflq6000mq7u8dg625w9r	{"null",leave,leave,absent,"null","null","null","null","null","null"}	2025-07-20 13:50:29.929	2025-07-20 13:51:15.946	2025-07-20 13:51:15.946
cmdbqj8jf0001q7c46xoodrrd	cmd9tflq70015q7u8vikzriu8	{"null",present,present,absent,"null","null","null","null","null","null"}	2025-07-20 13:50:29.929	2025-07-20 13:51:15.946	2025-07-20 13:51:15.946
cmdbqj8jm0002q7c4vkkio51r	cmd9tflq6000pq7u8sgl35vxg	{"null",present,present,absent,"null","null","null","null","null","null"}	2025-07-20 13:50:29.929	2025-07-20 13:51:15.946	2025-07-20 13:51:15.946
cmdbqj8jm0003q7c438n6l1vd	cmd9tflq6000kq7u8goc8z5fx	{"null",absent,present,absent,"null","null","null","null","null","null"}	2025-07-20 13:50:29.929	2025-07-20 13:51:15.946	2025-07-20 13:51:15.946
cmdbqj8jo0006q7c4mcsyttuk	cmd9tflq6000rq7u88kbi0txl	{"null",present,present,absent,"null","null","null","null","null","null"}	2025-07-20 13:50:29.929	2025-07-20 13:51:15.946	2025-07-20 13:51:15.946
cmdbqj8jp0008q7c465nrd9k9	cmd9tflq6000sq7u8p0y9v6n6	{"null",present,present,absent,"null","null","null","null","null","null"}	2025-07-20 13:50:29.929	2025-07-20 13:51:15.946	2025-07-20 13:51:15.946
cmdbqj8jo0004q7c45mpj6ik0	cmd9tflq60007q7u8d6nqhjxh	{"null",present,present,absent,"null","null","null","null","null","null"}	2025-07-20 13:50:29.929	2025-07-20 13:51:15.946	2025-07-20 13:51:15.946
cmdbqj8jo0005q7c481ojk8pn	cmd9tflq7001fq7u84b7zzot4	{"null",present,present,absent,"null","null","null","null","null","null"}	2025-07-20 13:50:29.929	2025-07-20 13:51:15.946	2025-07-20 13:51:15.946
cmdbqj8jp0007q7c4je9ccm8v	cmd9tflq7001qq7u88lhusnjs	{"null",present,present,absent,"null","null","null","null","null","null"}	2025-07-20 13:50:29.929	2025-07-20 13:51:15.947	2025-07-20 13:51:15.947
cmdbqj8jr0009q7c4mw9zehoy	cmd9tflq7000xq7u8ajqdwwsu	{"null",present,present,absent,"null","null","null","null","null","null"}	2025-07-20 13:50:29.929	2025-07-20 13:51:15.946	2025-07-20 13:51:15.946
cmdbqj8js000aq7c4a5i24vpp	cmd9tflq7001mq7u84lvixn80	{"null",present,present,absent,"null","null","null","null","null","null"}	2025-07-20 13:50:29.929	2025-07-20 13:51:15.947	2025-07-20 13:51:15.947
cmdbqj8ju000bq7c4p087dfns	cmd9tflq7001wq7u8piee93z1	{"null",present,present,absent,"null","null","null","null","null","null"}	2025-07-20 13:50:29.929	2025-07-20 13:51:15.947	2025-07-20 13:51:15.947
cmda4byka0012q7ukr1elmcnj	cmd9tflq70015q7u8vikzriu8	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.659	2025-07-20 12:56:49.861
cmda4bykr001tq7ukj6qysb7g	cmd9tflq7001tq7u88dneripv	{"null",present,absent,leave,"null","null","null","null","null","null"}	2025-07-19 10:41:47.952	2025-07-19 10:41:58.66	2025-07-20 12:56:49.861
\.


--
-- Data for Name: Leave; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public."Leave" (id, "userId", reason, "createdAt", "updatedAt") FROM stdin;
cmdae8hql0000q77k2ubn2d8r	cmd9rlgle0000q7u8p9l5e4n7	Messenger กำลังอัพเกรดการรักษาความปลอดภัย ดังนั้นจึงมีเพียงแชทที่เข้ารหัสจากต้นทางถึงปลายทางของคุณกับ Phuttarawadee เท่านั้นที่จะยังคงใช้งานได้	2025-07-19 15:19:13.099	2025-07-19 15:19:13.099
cmdaegq3a0000q7yo7fmx7xx5	cmd9rlgle0000q7u8p9l5e4n7	หลังจากเปิดตัว Ani สาวอนิเมะสไตล์กอธิกในฐานะ AI Companion ล่าสุดแอป Grok (โดย xAI) ได้สร้างกระแสฮือฮาด้วยฟีเจอร์ใหม่ NSFW Mode ที่ผู้ใช้งานสามารถปลดล็อกได้ เมื่อความสัมพันธ์กับ Ani ถึงระดับที่กำหนด โดยมีรายละเอียดที่น่าสนใจดังนี้	2025-07-19 15:25:37.175	2025-07-19 15:25:37.175
cmdafxcj00000q7zwbjh00b7p	cmd9rlgle0000q7u8p9l5e4n7	To find your public IP address, you can scroll up to the top of this page. It will show you your IP, the location you're connecting from, your service provider	2025-07-19 16:06:32.365	2025-07-19 16:06:32.365
\.


--
-- Data for Name: _ClubMembers; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public."_ClubMembers" ("A", "B") FROM stdin;
cmd9vuefz0001q7rkr6kb4rwx	cmd9rlgle0000q7u8p9l5e4n7
\.


--
-- Data for Name: admission_forms; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public.admission_forms (id, type, round, class, "openedAt", "closedAt", "createdAt", "updatedAt") FROM stdin;
cmd9x2whe0000q7lgwwknbh38	NEW	QOUTA	4	1970-01-01 00:00:00	1970-01-01 00:00:00	2025-07-19 07:18:58.801	2025-07-19 07:18:41.866
cmd9x2whe0001q7lgteqabnjq	NEW	SPECIAL	1	1970-01-01 00:00:00	1970-01-01 00:00:00	2025-07-19 07:18:58.801	2025-07-19 07:18:53.69
cmd9x33620002q7lgvicnpdd4	NEW	SPECIAL	0	1970-01-01 00:00:00	1970-01-01 00:00:00	2025-07-19 07:19:07.466	2025-07-19 07:19:00.018
cmd9x5anh0005q7lguz9fehj1	NEW	NORMAL	1	1970-01-01 00:00:00	1970-01-01 00:00:00	2025-07-19 07:20:50.477	2025-07-19 07:20:41.15
cmd9x5anh0006q7lgai0jpceh	NEW	NORMAL	0	1970-01-01 00:00:00	1970-01-01 00:00:00	2025-07-19 07:20:50.477	2025-07-19 07:20:46.629
cmd9x6hly000dq7lg3guhcnz5	MOVE	NORMAL	1	1970-01-01 00:00:00	1970-01-01 00:00:00	2025-07-19 07:21:46.151	2025-07-19 07:22:12.574
cmd9x7792000fq7lg09o0ohjl	MOVE	NORMAL	2	1970-01-01 00:00:00	1970-01-01 00:00:00	2025-07-19 07:22:19.382	2025-07-19 07:22:34.344
cmd9x7r3b000hq7lguzizag16	MOVE	NORMAL	3	1970-01-01 00:00:00	1970-01-01 00:00:00	2025-07-19 07:22:45.095	2025-07-19 07:22:59.087
cmd9x86zl000iq7lgfqhvyaan	MOVE	NORMAL	4	1970-01-01 00:00:00	1970-01-01 00:00:00	2025-07-19 07:23:05.698	2025-07-19 07:23:11.032
cmd9x8gqp000jq7lg61bxauew	MOVE	NORMAL	6	1970-01-01 00:00:00	1970-01-01 00:00:00	2025-07-19 07:23:18.337	2025-07-19 07:23:22.352
cmd9x8pz3000kq7lgrgnnr55y	MOVE	NORMAL	5	1970-01-01 00:00:00	1970-01-01 00:00:00	2025-07-19 07:23:30.304	2025-07-19 07:23:39.384
\.


--
-- Data for Name: admissions; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public.admissions (id, no, "studentId", "academicYear", type, class, round, plan, "reservePlan", "serviceZone", provenance, prefix, "firstName", "lastName", "cardId", "birthDate", ethnicity, nationality, religion, "bloodType", phone, talent, "houseNo", "villageNo", village, road, alley, "subDistrict", district, province, zipcode, "schoolName", grade, "subDistrictOld", "districtOld", "provinceOld", "zipcodeOld", "fatherName", "fatherJob", "fatherPhone", "motherName", "motherJob", "motherPhone", "guardianName", "guardianJob", "guardianPhone", "guardianRelation", "studentPhoto", "houseRecord", "studentRecord", pdf, status, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: announcements; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public.announcements (id, description, "isSummarize", "occurredAt", "createdAt", "updatedAt") FROM stdin;
cmdafg4ik0001q7yowvbqogru	It's assigned by your Internet Service Provider (ISP), allowing you to connect to the Internet through a network, whether at home, work, or on the go. Your IP ...	t	2025-07-19 15:52:28.746	2025-07-19 15:53:08.826	2025-07-19 15:53:08.826
cmdafgcwo0002q7yoe3a4fw1k	It's assigned by your Internet Service Provider (ISP), allowing you to connect to the Internet through a network, whether at home, work, or on the go. Your IP ...	f	2025-07-19 15:53:10.343	2025-07-19 15:53:19.704	2025-07-19 15:53:19.704
\.


--
-- Data for Name: clubs; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public.clubs (id, name, description, status, "userId", "maxMember", "createdAt", "updatedAt") FROM stdin;
cmd9vuefz0001q7rkr6kb4rwx	ICT	ใครกำลังมองหาคอร์สสอนเขียนโปรแกรมแบบเน้นสำหรับมือใหม่ จนถึงมือโปร นี่เลย\nผมทำไว้หลายเนื้อหาเลยครับ\nwww.kobdemy.com\nมาเลือกอุดหนุนกันได้นะ นักเรียนเก่าลด 50% ทุกรายการ\nมีวีดีโอดูย้อนหลัง มีเอกสารประกอบ และมีไลนกลุ่มไว้ช่วยเหลือยามติดปัญหาด้วยจ้า	t	cmd9rlgle0000q7u8p9l5e4n7	20	2025-07-19 06:44:22.558	2025-07-19 06:44:22.558
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public.users (id, prefix, "firstName", "lastName", email, password, "behaviorPoint", level, room, no, role, verified, "createdAt", "updatedAt") FROM stdin;
cmd9rlgle0000q7u8p9l5e4n9	นาย	วรเมธ	เชื้อบุญมี	12356@ssrw.ac.th	$2b$10$eopHynrJ3f2ejBD70AxT6.dYiejTyz3IfbSoVoe0Hrvpq41v5jTo.	100	6	6	6	ADMIN	f	2025-07-19 04:45:26.978	2025-07-20 13:15:51.962
cmd9tflq60003q7u85ygfn14p	นาย	นาง	มาลี	user003@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	5	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:51.966
cmd9rlgle0000q7u8p9l5e4n7	นาย	ปริญญา	พันติมิตร	11857@ssrw.ac.th	$2b$10$rBHOyQ8zMmupEllZOH7WT.nskxBgFmrhrdn5B7Z8djYSH6mPn.IUy	100	1	0	11	TEACHER	f	2025-07-19 04:43:45.791	2025-07-20 13:15:51.969
cmd9tflq60005q7u8vh61dr33	นาย	นางสาว	ดวงใจ	user005@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	5	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:51.972
cmd9tflq60002q7u8dm7yn0ow	นาย	นางสาว	สมหญิง	00000@ssrw.ac.th	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	3	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:51.976
cmd9tflq60007q7u8d6nqhjxh	นาย	นาง	อรุณี	user007@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	40	1	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:51.979
cmd9tflq60008q7u8m4ns8bkn	นาย	นาย	ณรงค์	user008@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	3	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:51.982
cmd9tflq60004q7u8m7hycbyi	นาย	นาย	ชูชัย	user004@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	3	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:51.958
cmd9tflq60009q7u8txnn0ju2	นาย	นางสาว	พวงทอง	user009@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	2	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:51.986
cmd9tflq6000aq7u8ibpcyqf4	นาย	นาย	วิชัย	user010@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	6	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:51.99
cmd9tflq6000bq7u8e1g71vpf	นาย	นาง	รัตนา	user011@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	3	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:51.994
cmd9tflq6000cq7u889g0astg	นาย	นาย	ก้องภพ	user012@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	2	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:51.997
cmd9tflq6000dq7u80h7f725c	นาย	นางสาว	จิราพร	user013@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	5	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.001
cmd9tflq6000eq7u8acmb2szr	นาย	นาย	ภาคภูมิ	user014@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	4	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.004
cmd9tflq6000fq7u8t8hcxikc	นาย	นาง	กมลรัตน์	user015@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	5	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.008
cmd9tflq6000gq7u88uo6c1ni	นาย	นาย	ไพรัช	user016@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	4	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.011
cmd9tflq6000hq7u83wig4dsb	นาย	นางสาว	นงลักษณ์	user017@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	4	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.015
cmd9tflq6000iq7u88ktw4yas	นาย	นาย	ธนากร	user018@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	5	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.018
cmd9tflq6000jq7u80jchs55o	นาย	นาง	สุภาภรณ์	user019@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	4	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.022
cmd9tflq6000kq7u8goc8z5fx	นาย	นาย	ประเสริฐ	user020@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	1	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.026
cmd9tflq6000lq7u815b5m9qp	นาย	นางสาว	กานต์ธิดา	user021@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	4	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.03
cmd9tflq6000mq7u8dg625w9r	นาย	นาย	พิชิต	user022@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	1	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.033
cmd9tflq6000nq7u8u2hxc2qt	นาย	นาง	บุษบา	user023@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	4	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.037
cmd9tflq6000oq7u8ha87t2pn	นาย	นาย	อนุชา	user024@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	3	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.041
cmd9tflq6000pq7u8sgl35vxg	นาย	นางสาว	แพรวพรรณ	user025@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	1	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.045
cmd9tflq6000qq7u8oexxe3j2	นาย	นาย	เกรียงไกร	user026@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	3	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.049
cmd9tflq6000rq7u88kbi0txl	นาย	นาง	พรรณี	user027@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	1	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.052
cmd9tflq6000sq7u8p0y9v6n6	นาย	นาย	บัญชา	user028@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	1	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.055
cmd9tflq7000tq7u8rnhuyx2w	นาย	นางสาว	สุธาสินี	user029@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	6	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.059
cmd9tflq7000uq7u8j6nz0zv1	นาย	นาย	วรวุฒิ	user030@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	6	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.063
cmd9tflq7000vq7u8rxpfcrbt	นาย	นาง	ชลธิชา	user031@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	2	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.067
cmd9tflq7000wq7u8j46ue2db	นาย	นาย	คณิน	user032@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	6	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.071
cmd9tflq7000xq7u8ajqdwwsu	นาย	นางสาว	นันทพร	user033@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	1	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.075
cmd9tflq60001q7u8krg5gb1t	นาย	นาย	สมชาย	user001@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	3	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.079
cmd9tflq60006q7u80r0gz7tw	นาย	นาย	วีระ	user006@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	100	5	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.083
cmd9tflq70010q7u8t2g8wr6c	นาย	นาย	ธนวัฒน์	user036@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	2	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.09
cmd9tflq70011q7u839kqybp5	นาย	นางสาว	ศิริพร	user037@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	4	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.093
cmd9tflq70012q7u8j5vy8zmd	นาย	นาย	สุรศักดิ์	user038@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	3	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.096
cmd9tflq70013q7u84yaudfbb	นาย	นาง	กัลยา	user039@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	6	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.1
cmd9tflq70014q7u8raa893xu	นาย	นาย	วีรพล	user040@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	3	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.103
cmd9tflq70015q7u8vikzriu8	นาย	นางสาว	วารุณี	user041@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	1	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.106
cmd9tflq70016q7u8xgwu5iga	นาย	นาย	อาทิตย์	user042@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	2	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.109
cmd9tflq70017q7u89sy679z7	นาย	นาง	จันทรา	user043@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	2	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.113
cmd9tflq70018q7u8y452p9rw	นาย	นาย	อภิสิทธิ์	user044@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	2	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.116
cmd9tflq70019q7u8pdun488t	นาย	นางสาว	อริสรา	user045@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	6	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.119
cmd9tflq7001aq7u8whkbi8b8	นาย	นาย	ภาณุวัฒน์	user046@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	5	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.123
cmd9tflq7001bq7u85qjkhle3	นาย	นาง	ศศิธร	user047@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	4	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.126
cmd9tflq7001cq7u8ylr2tzpf	นาย	นาย	ปิยะพงษ์	user048@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	5	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.13
cmd9tflq7001dq7u898re8ieb	นาย	นางสาว	อรอนงค์	user049@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	5	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.133
cmd9tflq7001eq7u8p4nd4ejz	นาย	นาย	นพรัตน์	user050@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	2	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.136
cmd9tflq7001fq7u84b7zzot4	นาย	นาง	สุดารัตน์	user051@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	1	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.14
cmd9tflq7001gq7u8tfb5ie1m	นาย	นาย	ณัฐพงษ์	user052@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	6	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.143
cmd9tflq7001hq7u8zs95f5lr	นาย	นางสาว	ชนากานต์	user053@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	6	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.147
cmd9tflq7001iq7u88a75j4p5	นาย	นาย	พงศกร	user054@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	4	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.15
cmd9tflq7001jq7u8tly0td0l	นาย	นาง	กัญญาพัชร	user055@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	5	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.154
cmd9tflq7001kq7u8lttu5agg	นาย	นาย	ธีรภัทร	user056@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	2	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.157
cmd9tflq7001lq7u8q63r5njm	นาย	นางสาว	รุ่งทิวา	user057@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	4	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.16
cmd9tflq7001mq7u84lvixn80	นาย	นาย	ธนากร	user058@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	1	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.163
cmd9tflq7001nq7u8kba2tza5	นาย	นาง	ศิริลักษณ์	user059@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	6	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.166
cmd9tflq7001oq7u8770le2cw	นาย	เด็กชาย	ชัยวัฒน์	user060@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	3	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.172
cmd9tflq7001pq7u88nsi0c5c	นาย	เด็กหญิง	นภัสสร	user061@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	3	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.176
cmd9tflq7001qq7u88lhusnjs	นาย	เด็กชาย	กฤษณะ	user062@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	1	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.179
cmd9tflq7001rq7u8zelza9ko	นาย	เด็กหญิง	สุภัสสรา	user063@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	5	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.182
cmd9tflq7001sq7u8uzdogtmz	นาย	เด็กชาย	วรวิทย์	user064@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	2	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.186
cmd9tflq7001tq7u88dneripv	นาย	เด็กหญิง	ปิยะพร	user065@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	3	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.19
cmd9tflq7001uq7u8q48u9wzk	นาย	เด็กชาย	เจษฎา	user066@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	6	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.193
cmd9tflq7001vq7u8pmv2itwh	นาย	เด็กหญิง	กานดา	user067@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	2	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.196
cmd9tflq7001wq7u8piee93z1	นาย	เด็กชาย	ธีรยุทธ	user068@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	1	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.199
cmd9tflq7001xq7u8egdguk5k	นาย	เด็กหญิง	ขวัญฤดี	user069@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	2	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.202
cmd9tflq7000zq7u8dgfnj1g6	นาย	นาง	ผกามาศ	user035@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	5	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.087
cmd9tflq7000yq7u8spwvqb88	นาย	นาย	ศักดิ์ชัย	user034@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	3	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.205
cmd9tflq7001yq7u8u3za2gzw	นาย	เด็กชาย	สมศักดิ์	user070@example.com	$2b$10$abcdefghijklmnopqrstuvwxyza123456789012345	0	5	0	0	STUDENT	t	2025-07-19 05:36:52.926	2025-07-20 13:15:52.208
\.


--
-- Name: Attendance Attendance_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."Attendance"
    ADD CONSTRAINT "Attendance_pkey" PRIMARY KEY (id);


--
-- Name: Leave Leave_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."Leave"
    ADD CONSTRAINT "Leave_pkey" PRIMARY KEY (id);


--
-- Name: _ClubMembers _ClubMembers_AB_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."_ClubMembers"
    ADD CONSTRAINT "_ClubMembers_AB_pkey" PRIMARY KEY ("A", "B");


--
-- Name: admission_forms admission_forms_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.admission_forms
    ADD CONSTRAINT admission_forms_pkey PRIMARY KEY (id);


--
-- Name: admissions admissions_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.admissions
    ADD CONSTRAINT admissions_pkey PRIMARY KEY (id);


--
-- Name: announcements announcements_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.announcements
    ADD CONSTRAINT announcements_pkey PRIMARY KEY (id);


--
-- Name: clubs clubs_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.clubs
    ADD CONSTRAINT clubs_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: _ClubMembers_B_index; Type: INDEX; Schema: public; Owner: myuser
--

CREATE INDEX "_ClubMembers_B_index" ON public."_ClubMembers" USING btree ("B");


--
-- Name: admissions_cardId_key; Type: INDEX; Schema: public; Owner: myuser
--

CREATE UNIQUE INDEX "admissions_cardId_key" ON public.admissions USING btree ("cardId");


--
-- Name: admissions_studentId_key; Type: INDEX; Schema: public; Owner: myuser
--

CREATE UNIQUE INDEX "admissions_studentId_key" ON public.admissions USING btree ("studentId");


--
-- Name: clubs_userId_key; Type: INDEX; Schema: public; Owner: myuser
--

CREATE UNIQUE INDEX "clubs_userId_key" ON public.clubs USING btree ("userId");


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: myuser
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: Attendance Attendance_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."Attendance"
    ADD CONSTRAINT "Attendance_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Leave Leave_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."Leave"
    ADD CONSTRAINT "Leave_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: _ClubMembers _ClubMembers_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."_ClubMembers"
    ADD CONSTRAINT "_ClubMembers_A_fkey" FOREIGN KEY ("A") REFERENCES public.clubs(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _ClubMembers _ClubMembers_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."_ClubMembers"
    ADD CONSTRAINT "_ClubMembers_B_fkey" FOREIGN KEY ("B") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: clubs clubs_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.clubs
    ADD CONSTRAINT "clubs_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

