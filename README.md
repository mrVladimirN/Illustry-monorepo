# Illustry backend

This project serves as a server for the Illustry visualization HUB

# Configuration

The following configuration is needed in order for the server to work:

## Locally:
A file named .env is needed at the root of the project containing the following fields:
```
MONGO_URL=mongodb://127.0.0.1:27017/illustry
MONGO_TEST_URL=mongodb://127.0.0.1:27017/illustrytest
MONGO_USER= <your_personal_mongo_user>
MONGO_PASSWORD=<your_personal_mongo_password>
ILLUSTRY_PORT=7000 
```
After the env is provided run one of the following commands: 
- ```npm run start:dev``` for dev purposes 
- ```npm run start:prod``` from a bundled version.

## Docker: 

Run the following commands:
```shell
docker build -t illustry .
docker-compose up -d
```

# Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

# License

[Apache-2.0](https://choosealicense.com/licenses/apache)