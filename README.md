# Spring-Boot-React


<p align="center">
  <img  src="https://github.com/image0of0pie/FashionHub/logo.png">
</p>

This is a full stack web application made with spring boot and ReactJs in the frontend. 
## Setting up Locally
* Install `psql` for your system which is a client for the Postgresql database.* Create a database named fashionHub
* Go the root directory of the system
* After the containers are up and running , run `psql -h 127.0.0.1 -d fashionhub -p 5432 -U postgres -c "\copy clothes FROM 'FashionHub.csv' DELIMITER ',' CSV";`.
* Then go to frontend directory of this repo and run `npm i && npm start`
* This starts the app on `localhost:3000`
* Docker environment codes are also written ( for the project to run in `Docker` you will need to replace `localhost` with `fashdb` in datasource url properties inside `application.properties`) 

### Caveats

* In case you are using chrome, go to chrome://flags/#allow-insecure-localhost and Enable the option that says "Allow invalid certificates for resources loaded from localhost".

