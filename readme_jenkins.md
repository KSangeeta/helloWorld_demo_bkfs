# Jenkins Job 

## Pre-reqs 

- Maven tool with the name 'Maven' must be added to Jenkins 
- Node.js tool with the name "NodeJS" must be added to Jenkins 
- Jenkins use must have access to node and maven in their class path 
- Maven will try to pull a bunch of dependencies from central. If the jenkins server does not have access to central then a maven mirror repo must be setup  

This project connects to apigee SaaS / cloud. For an on-prem install change the below properties found in the commons-pom 

```
            <apigee.api.protocol>https</apigee.api.protocol>
            <apigee.api.host>api.enterprise.apigee.com</apigee.api.host>
            <apigee.api.port>443</apigee.api.port>
            <apigee.apiversion>v1</apigee.apiversion>


```


## Steps 

To onboard this project to Jenkins follow the given steps 

1. Add the the root folder of the project under Git
1. Create a new pipeline type job in jenkins 
1. Load the project that was added to git 
1. Enable on commit hooks
1. Indicate that the project is parameterized 
1. Add the below params 
    1. apigee_env
    1. apigee_org
    1. apigee_username
    1. apigee_pwd 
1. Select the Jenkinsfile as the script for your build 

You are now able to run the job and see the various stages build 
