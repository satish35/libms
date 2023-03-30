CREATE DATABASE libms;

CREATE TABLE studentinfo(
    name varchar(50),
    roll_no varchar(25) PRIMARY KEY,
    branch char(10),
    div char(1),
    contact_no numeric(10),
    email varchar(50),
    username varchar(20),
    password varchar(10)
)

CREATE TABLE admininfo(
    name varchar(50),
    staff_id varchar(25) PRIMARY KEY,
    contact_no numeric(10),
    email varchar(50),
    username varchar(20),
    password varchar(100)
)

CREATE TABLE book(
    title varchar(100),
    isbn_code numeric(13) PRIMARY KEY,
    author_name char(25),
    quantity numeric(50)
)

CREATE TABLE studentstatus(
    id SERIAL PRIMARY KEY,
    student_roll_no varchar(25) REFERENCES studentinfo (roll_no),
    book_details numeric(13) REFERENCES book (isbn_code),
    book_issued_on date,
    book_to_be_returned date,
    fine numeric(100)
)

CREATE TABLE suggestion(
    id SERIAL PRIMARY KEY,
    student_id varchar(25) REFERENCES studentinfo (roll_no),
    suggestion varchar(250)
)
