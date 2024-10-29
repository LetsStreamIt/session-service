# Session Service

![CI status](https://github.com/letsstreamit/session-service/actions/workflows/ci.yml/badge.svg)
![Deploy Image status](https://github.com/letsstreamit/session-service/actions/workflows/deploy-image.yaml/badge.svg)
![GH pages status](https://github.com/letsstreamit/session-service/actions/workflows/gh-pages.yaml/badge.svg)
![Release status](https://github.com/letsstreamit/session-service/actions/workflows/release.yaml/badge.svg)


[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Version](https://img.shields.io/github/v/release/letsstreamit/session-service?style=plastic)


[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=LetsStreamIt_session-service&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=LetsStreamIt_session-service)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=LetsStreamIt_session-service&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=LetsStreamIt_session-service)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=LetsStreamIt_session-service&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=LetsStreamIt_session-service)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=LetsStreamIt_session-service&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=LetsStreamIt_session-service)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=LetsStreamIt_session-service&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=LetsStreamIt_session-service)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=LetsStreamIt_session-service&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=LetsStreamIt_session-service)

Session Service is responsible to manage a Youtube streaming session.

It ensures synchronized video playback, in response to play and stop performed by the users. It also contains a chat through which users can communicate during the streaming.


## Technologies

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/en/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-25c2a0?style=for-the-badge&logo=socketdotio&logoColor=white)](https://socket.io/)

### Infrastructure

[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com)

### DevOps

[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/features/actions)
[![Semantic Release](https://img.shields.io/badge/Semantic_Release-494949?style=for-the-badge&logo=semantic-release&logoColor=white)](https://semantic-release.gitbook.io/)
[![Semantic Versioning](https://img.shields.io/badge/Semantic_Versioning-333333?style=for-the-badge&logo=semver&logoColor=white)](https://semver.org/)
[![Conventional Commits](https://img.shields.io/badge/Conventional_Commits-FE5196?style=for-the-badge&logo=conventionalcommits&logoColor=white)](https://www.conventionalcommits.org/en/v1.0.0/)
[![Renovate](https://img.shields.io/badge/RenovateBot-1A1F6C?style=for-the-badge&logo=renovate&logoColor=white)](https://renovatebot.com/)
[![SonarCloud](https://img.shields.io/badge/SonarCloud-F3702A?style=for-the-badge&logo=sonarcloud&logoColor=white)](https://sonarcloud.io/)



## Usage

In order to run it, specify the following environment variables:
- `SESSION_SERVICE_PORT`: Port where to deploy the service
- `SESSION_SERVICE_HOSTNAME`: Hostname where to deploy the service
- `PROFILE_SERVICE_HOSTNAME`: Profile Service hostname
- `PROFILE_SERVICE_PORT`: Profile Service Port
- `AUTH_SERVICE_HOSTNAME`: Auth Service Hostname
- `AUTH_SERVICE_PORT`: Auth Service Port

It is possible to run the service both locally or through a Docker container:
1. To run the service locally:
    ```bash
    git clone git@github.com:LetsStreamIt/session-service.git && cd session-service
    npm install
    npm run build && npm run start
    ```
2. Using the docker container:
    1. Create a ```env.list``` file specifying the environment variable values:
        ```plaintext
        PROFILE_SERVICE_HOSTNAME="localhost"
        PROFILE_SERVICE_PORT=3001
        AUTH_SERVICE_HOSTNAME="localhost"
        AUTH_SERVICE_PORT=3000
        SESSION_SERVICE_HOSTNAME="localhost"
        SESSION_SERVICE_PORT=4000
        ```
        The values listed above are the current default values if they are not specified by the user.

    2. Run the docker container:
        ```bash
        docker run --env-file ./env.list ghcr.io/letsstreamit/session-service:main
        ```

## Documentation

Session Service code documentation is built using [Typedoc](https://typedoc.org/api/) and is available to the following [link](https://letsstreamit.github.io/session-service/).

## License

Session Service is licensed under [MIT](./LICENSE).
