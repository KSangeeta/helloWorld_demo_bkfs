#!groovy

pipeline {
    agent any
    tools {
        maven 'Maven'
        nodejs 'NodeJS'
    }
    stages {
            stage('Clean') {
                steps {
                dir('edge') {
                    sh "mvn clean"
                }
            }
        }
            stage('Static Code Analysis, Unit Test and Coverage') {
            
                steps {
                    dir('edge') {
                    sh "mvn test -Pproxy-unit-test "
                }
            }
        }

            stage('Pre-Deployment Configuration - Caches') {
                steps {
                    dir('edge') {
                    println "Predeployment of Caches "
                    sh "mvn apigee-config:caches " +
                            "    -Papigee -Denv=${params.apigee_env} -Dorg=${params.apigee_org} " +
                            "    -Dusername=${params.apigee_user} " +
                            "    -Dpassword=${params.apigee_pwd}"

                }
            }
        }

            stage('Pre-Deployment Configuration - targetservers') {
                steps {
                    dir('edge') {
                    println "Predeployment of targetservers "
                    sh "mvn apigee-config:targetservers " +
                            "    -Papigee -Denv=${params.apigee_env} -Dorg=${params.apigee_org} " +
                            "    -Dusername=${params.apigee_user} " +
                            "    -Dpassword=${params.apigee_pwd}"

                }
            }
        }

            stage('Pre-Deployment Configuration - keyvaluemaps ') {
                steps {
                    dir('edge') {
                    println "Predeployment of keyvaluemaps  "
                    sh "mvn apigee-config:keyvaluemaps " +
                            "    -Papigee -Denv=${params.apigee_env} -Dorg=${params.apigee_org} " +
                            "    -Dusername=${params.apigee_user} " +
                            "    -Dpassword=${params.apigee_pwd}"

                }
            }
        }

            stage('Build proxy bundle') {
                steps {
                    dir('edge') {
                    sh "mvn package -Papigee -Denv=${params.apigee_env} -Dorg=${params.apigee_org}"

                }
            }
        }

            stage('Deploy proxy bundle') {
                steps {
                    dir('edge') {
                    sh "mvn apigee-enterprise:deploy -Papigee -Denv=${params.apigee_env} -Dorg=${params.apigee_org} -Dusername=${params.apigee_user} -Dpassword=${params.apigee_pwd}"
                }
            }
        }
            stage('Post-Deployment Configurations for API ') {
                steps {
                    dir('edge') {
                    println "Post-Deployment Configurations for API Products Configurations, App Developer and App Configuration "
                    sh "mvn -Papigee -Denv=${params.apigee_env} -Dorg=${params.apigee_org} " +
                            "    -Dapigee.config.options=create " +
                            "    -Dusername=${params.apigee_user} -Dpassword=${params.apigee_pwd} " +
                            "    apigee-config:apiproducts " +
                            "    apigee-config:developers apigee-config:apps apigee-config:exportAppKeys"
                }
            }
        }

            stage('Functional Test') {
                steps {
                    dir('edge') {
                    sh "node ./node_modules/cucumber/bin/cucumber-js target/test/integration/features --format json:target/reports.json"
                }
            }
        }

            stage('Coverage Test Report') {
                steps {
                    dir('edge') {
                    publishHTML(target: [
                            allowMissing         : false,
                            alwaysLinkToLastBuild: false,
                            keepAll              : false,
                            reportDir            : "target/coverage/lcov-report",
                            reportFiles          : 'index.html',
                            reportName           : 'HTML Report'
                    ]
                    )
                }
            }
        }

            stage('Functional Test Report') {
                steps {
                    dir('edge') {
                    step([
                            $class             : 'CucumberReportPublisher',
                            fileExcludePattern : '',
                            fileIncludePattern : "**/reports.json",
                            ignoreFailedTests  : false,
                            jenkinsBasePath    : '',
                            jsonReportDirectory: "target",
                            missingFails       : false,
                            parallelTesting    : false,
                            pendingFails       : false,
                            skippedFails       : false,
                            undefinedFails     : false
                    ])
                }
            }
        }
        
    }
}

