# Instructions for ${teanName}-${artifactId}

## Pre-Requisites
    - Node
    - Java 8 
    - Apache Maven 3.3  
    - Apigeelint 

## Features/Stages 
This Edge Proxy supports the following life cycles:
1. Linting 
2. Unit Testing 
3. Package
4. Deploy
- Proxy Dependencies 
- Edge Proxy 
5. Integration Test
- Setup 
- Execute

### Data elements 
Token Name   | Desciption   
---   | ---   
@@org@@ | Apigee Org Name 
@@env@@ | Apigee Environment Name
@@username@@ | Apigee Edge username
@@password@@ | Apigee Edge password

*@@token@@: Replace tokens used in the below commands with their Apigee values* 


#### Execute the below commands on the edge directory


### Linting
#### Commands 
```
apigeelint -s apiproxy -f table.js
```
 
## Unit Testing 
The base package comes enabled with Java Script unit tests. All Unit Tests are under test/unit. The unit tests can be run usign the following command/s
### Commands 
```
mvn test -Pproxy-unit-test
```
 
## Package 
Creates the package which contains the proxy policies and the required assets for the proxy 
```
mvn package -Papigee -Denv=@@env@@ -Dorg=@@org@@ 
```
 
## Deploy - Proxy Dependencies 
### Commands 
```
# Add Caches , targetservers and KVM's

mvn apigee-config:caches apigee-config:targetservers apigee-config:keyvaluemaps \
    -Papigee -Denv=@@env@@ -Dorg=@@org@@ \
    -Dusername=@@username@@ \
    -Dpassword=@@password@@
```
 
## Deploy - Proxy 
```
mvn apigee-enterprise:deploy \ 
    -Papigee -Denv=@@env@@ -Dorg=@@org@@ \ 
    -Dusername=@@username@@ -Dpassword=@@password@@ 
```
 
## Integration Testing - Setup
### Commands 
```
# Setup Product, Developer, Developer App and export keys 
mvn -Papigee -Denv=@@env@@ -Dorg=@@org@@ \ 
    -Dapigee.config.options=create\
    -Dusername=@@username@@ -Dpassword=@@password@@ \ 
    apigee-config:apiproducts \
    apigee-config:developers apigee-config:apps apigee-config:exportAppKeys
```
 
## Integration Test - Execute
### Commands 
```
node ./node_modules/cucumber/bin/cucumber.js target/test/integration/features --format json:target/reports.json
```
