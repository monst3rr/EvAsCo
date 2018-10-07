![Alt text](docs/project1.gif?raw=true?)
# EvAsCo(Everything As Code)

EvAsCo is a sample code to demonstrate infrastructure automation, immutable application deployment and versioning using Docker, Kubernetes, Helm and Terraform on Azure Cloud.

### Prerequisites
- Following softwares are prequisite to successfully run this project. 
   1. Docker
   2. Kubectl
   3. Helm
   4. Terraform
- Azure Service role credentials: Configure these credentials in **cluster/cred.tfvars**.


### Installation
```sh
$ cd cluster
$ chmod +x ./init.sh
$ ./init.sh
```
>After successfully running, above command will print a url of the application running on azure cluster. 
>API documentation can be found at [ApiDocs](https://monst3rr.github.io/EvAsCo/).
###### What it does?
- Initialize Terraform.
- Creates Kubernetes Cluster and Cosmos DB in Azure.
- Add Consmos DB connection string as Kubernetes Secret.
- Initialize kubeconfig and helm.
- Deploy docker image in Kubernetes
- Map service ip to a DNS.
> By default docker hub is being used as docker repository which can be configured in helm chart.
>Docker image of application which is in directory "app" can be found at [Messages](https://hub.docker.com/r/monst3r/messages/)
#### Diagram
![Alt text](docs/diagram.jpg?raw=true?)

&nbsp;
&nbsp;
---
### Run Application on local machine

```sh
$ export CONNECTION=<YOUR_MONGODB_CONNECTION_STRING>
$ cd app
$ node index.js
```
To Run Test:
```sh
$ export CONNECTION=<YOUR_MONGODB_CONNECTION_STRING>
$ cd app
$ npm test
```
>Visit http://localhost:1337 to view application.

&nbsp;

---
### Build and Run Dockerized App on local machine

```sh
$ export CONNECTION=<YOUR_MONGODB_CONNECTION_STRING>
$ cd app
$ docker build -t <TAG_NAME> ./
$ docker run -p 1337:1337 -e CONNECTION=$CONNECTION
```
>Visit http://localhost:1337 to view application.

&nbsp;

---
### Application versioning and Rollback

```sh
$ helm list
$ helm rollback release_name release_version
```
> It will rollback the deployed application to required version.

&nbsp;

### Tech Used

This project usees a number of open source technology:

* [Terraform](https://www.terraform.io/) - Write, Plan, and Create Infrastructure as Code.
* [Docker](https://www.docker.com/) - contenarization.
* [Kubernetes](https://kubernetes.io/) - Container Orchestration.
* [Helm](https://helm.sh/) - The package manager for Kubernetes.
* [node.js](https://nodejs.org/) - JavaScript runtime.
* [Express](https://expressjs.com/) - fast node.js network app framework
* [VueJs](https://vuejs.org) - The Progressive JavaScript Framework
* [bootstrap-vue](https://bootstrap-vue.js.org/) - Bootstrap + Vue

### Todos

 - Integrating in CI/CD pipeline.
 - Code Improvement

License
----

MIT


**Free Software, Hell Yeah!**
