# Online Retail Application

This is a JavaScript implementation of an online retail application, made by some university students as a side project of the Principle of Database Management course.

## Features
* Staff page (including insert, update, and custom query for deleting and creating query)
* Client page (including adding bank account, registration system, login system, and product transaction).
* Unique API for client-server interactions
* Home-made database design

# Getting started
## Dependencies
### Global dependencies
* NodeJS v12.16.1
* MySQL Community

### Project-level dependencies
#### Client-side
* [ReactJS](https://reactjs.org)
* [react-bootstrap](https://react-bootstrap.github.io)
* [bootstrap](https://getbootstrap.com)
* [mdbreact](https://github.com/mdbootstrap/React-Bootstrap-with-Material-Design#readme)
* [react-router-dom](https://github.com/ReactTraining/react-router)
* [axios](https://github.com/axios/axios)

#### Server-side
* [express](http://expressjs.com/)
* [bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme)
* [concurrently](https://github.com/kimmobrunfeldt/concurrently#readme)
* [dotenv](https://github.com/motdotla/dotenv#readme)
* [cors](https://github.com/expressjs/cors#readme)
* [mysql](https://github.com/mysqljs/mysql#readme)

## How to download
```bash
https://github.com/minhlong94/ORA-IU.git
```
## Run
Prerequesite: global dependencies have been installed.

*Update later*

## Basic web direction
### Client
Register -> Login -> Add Bank Account -> Purchase.

### Staff
* For update query, please navigate to ``Update...`` (only support product update).
* For create query (create new product, add new supplier, etc.), please navigate to ``Insert...`` (support adding new product, supplier, categories, and bank name).
* For other queries, please navigate to ``Custom Query...`` (support for all kinds of query). However, this page is incomplete as compared to MySQL workbench (and other similar software); hence, MySQL is more recommended in such situation.

## Further improvement
### Frontend
* Make client site more user-friendly

### Backend
* Add API key 
* Using web token (for verification)
* Manage user session using cookies
