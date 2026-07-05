# Node.js App — GitLab CI/CD Pipeline Deployment

> A Node.js + Express + MongoDB application deployed using a self-hosted GitLab CI/CD pipeline with automated build, test, and deployment stages.

**Author:** Muhammad Saad Hussain | [@saadhussain07](https://github.com/saadhussain07)  
**LinkedIn:** [muhammad-saad-hussain](https://www.linkedin.com/in/muhammad-saad-hussain-28435b3a2/)  
**Part of:** [GitLab CI/CD Projects](https://github.com/saadhussain07/gitlab-cicd-projects)

---

## Pipeline Flow

```
git push → GitLab CI → Install → Test → Deploy → App Running on Port 5050
```

---

## Project Structure

```
node_js_app/
├── .gitlab-ci.yml      # GitLab CI/CD pipeline configuration
├── server.js           # Express + MongoDB application server
├── package.json        # Node.js dependencies
└── README.md
```

---

## Application Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB |
| CI/CD | GitLab CI/CD (self-hosted) |
| Port | 5050 |

---

## Application Code

`server.js` sets up an Express server connected to MongoDB:

```javascript
const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");

const PORT = 5050;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const MONGO_URL = process.env.MONGO_URL || 
  "mongodb://admin:qwerty@mongo:27017/apnacollege-db";
```

MongoDB URL is injected via environment variable `MONGO_URL` — defaults to local Docker network connection.

---

## GitLab CI/CD Pipeline

Defined in `.gitlab-ci.yml` — triggers on every push to `main`:

```yaml
stages:
  - build
  - test
  - deploy

build:
  stage: build
  script:
    - npm install

test:
  stage: test
  script:
    - echo "Running tests..."

deploy:
  stage: deploy
  script:
    - echo "Deploying application..."
```

---

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGO_URL` | MongoDB connection string | `mongodb://admin:qwerty@mongo:27017/apnacollege-db` |
| `PORT` | Application port | `5050` |

Set these as **GitLab CI/CD Variables** under Settings → CI/CD → Variables for production deployments.

---

## Local Setup

```bash
# Clone the repo
git clone https://github.com/saadhussain07/gitlab-cicd-projects
cd gitlab-cicd-projects/node_js_app

# Install dependencies
npm install

# Run with local MongoDB
MONGO_URL="mongodb://localhost:27017/mydb" node server.js

# App runs at http://localhost:5050
```

---

## Self-Hosted GitLab Setup

This pipeline runs on a self-hosted GitLab instance deployed via Docker:

```bash
# GitLab Server
docker run -d --name gitlab-server \
  -p 8000:80 \
  gitlab/gitlab-ce:latest

# GitLab Runner
docker run -d --name gitlab-runner \
  --link gitlab-server \
  gitlab/gitlab-runner:latest
```

---

## Related Projects in This Repo

| Project | Description |
|---------|-------------|
| `nodejs-dockerized-app` | Same Node.js app — containerized with Docker |
| `flask-web-cicd` | Flask web app CI/CD pipeline |
| `blog-app-gitlab-ci` | Blog application with GitLab CI |
| `static-site-cicd` | Static website CI/CD pipeline |
| `php-web-automate-deploy` | PHP web auto-deployment |

---

## Related Repositories

- [🦊 GitLab CI/CD Projects](https://github.com/saadhussain07/gitlab-cicd-projects)
- [⚙️ Jenkins Pipeline](https://github.com/saadhussain07/jenkins-pipeline)
- [📊 K8s Monitoring Stack](https://github.com/saadhussain07/k8s-monitoring-stack)
- [🌐 RocketDevOps](https://rocketdevops.vercel.app)

---

<p align="center">⭐ Star this repo if it helped you!</p>