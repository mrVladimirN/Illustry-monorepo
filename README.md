# Illustry frontend

This project serves as a frontend for the Illustry visualization HUB

# Configuration

The following configuration is needed in order for the frontend to work:

## Locally:
A file named .env is needed at the root of the project containing the following fields:
```
NEXT_PUBLIC_BACKEND_PUBLIC_URL: http://0.0.0.0:7000
```
After the env is provided run one of the following commands: 
- ```npm run start:dev``` for dev purposes 
- ```npm run start:prod``` from a bundled version.

## Docker: 
Before running create the backend imagine:
Run the following commands:
```shell
docker build -t illustryfrontend .
docker run -p 3000:3000 -e NEXT_PUBLIC_BACKEND_PUBLIC_URL=http://ilustrybackend:7000 illustryfrontend
```

# Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

# License

[Apache-2.0](https://choosealicense.com/licenses/apache)