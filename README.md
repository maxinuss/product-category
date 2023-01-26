# product-category

### Task
```
Test task for SmartSuite Developer
The developer should build a microservice (backend) which should satisfy following
requirements:

1. User should have an ability to add/update/delete/list Products/Categories
2. Category should contain at least following pops:
    a. Name
    b. Image
    c. Description
3. Product should contain at least following pops:
    a. Name
    b. Images
    c. Description
    d. Price
4. Data should be stored in a non relational database.
5. Backend should be built using AWS lambda, main language - TypeScript.
6. Code should be covered with UTs and stored on Github or similar repo.
7. It’s up to you where to store images.
8. Code should contain README.md with all the details needed to setup and use it.
9. Backend should be deployed to AWS lambda, details should be part of
README.md.
```
---
### Stack

* Docker & Docker-compose
* NestJs using TS
* MongoDB
* Jest for testing
* Serverless Framework

### How to run this project

* Clone this repo
* Go to the repo root
* Copy the .env.example file to .env (Default params will work for local)
* Run ```make up``` if you use Linux or Mac (if not you can run ``` docker-compose up -d```).
* Run ```make logs``` (or ```docker-compose logs -f```) to check when startup has finished.
* Access to the endpoints (Postman collection attached)

### How to deploy
* Create a free MongoDB Atlas account: https://www.mongodb.com/cloud/atlas
* Modify .env file with the new credentials
* Run ```make node``` (or ```docker exec -it node-pc-container bash```).
* Inside the container run:
  * ```npm run build```
  * ```export AWS_ACCESS_KEY_ID=<YOUR AWS KEY ID>```
  * ```export AWS_SECRET_ACCESS_KEY=<YOUR AWS KEY SECRET>```
  * ```npx sls deploy --param="env=STAGE"```
  * You will get the API Gateway URL for your lambda

### Postman collection
Collection is exported and can be find in tools folder.

### How to run tests
* Run ```make node``` (or ```docker exec -it node-pc-container bash```).
* Run ```npm run test```

### Images uploading
For time reasons is just a link.
A good implementation would be to create some specific endpoint for upload images and get the link. Then this link can be sent to the Entities creation.
Both Categories and Products should use the same endpoint.

### What could be improved?
* Data inputs validation (Just validating types now)
* Error handling, responses and status
* Deploy process
* Unified responses
* Cache
* E2E testing
* Deeper Unit testing and more cases
* Wrap Queries into repositories and not directly into services.
* Add linter
* Add git-hooks to run linter and test before push
