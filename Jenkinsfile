#!groovy

pipeline {
    agent any
    /*node{
        withCredentials([usernamePassword(credentialsId: 'sangeetak-eval_Edge_Creds', usernameVariable: 'Username', passwordVariable: 'Password')]) {
            // available as an env variable, but will be masked if you try to print it out any which way
            // note: single quotes prevent Groovy interpolation; expansion is by Bourne Shell, which is what you want
            sh 'echo $Password'
            // also available as a Groovy variable
            echo Username
            // or inside double quotes for string interpolation
            echo "Username is $USERNAME"
        }
    }*/
    tools {
        maven 'Maven'
        nodejs 'NodeJS'
    }
    stages {
            stage('Clean') {
                steps {
                dir('edge') {
                    bat "mvn clean"
                }
            }
        }
            stage('Proxy linting') {

            steps {
                dir('edge') {
                    bat "mvn test -Pproxy-linting > proxy-linting-test.html"
                }
            }
        }

        stage('Static Code Analysis, Unit Test and Coverage') {
            
                steps {
                    dir('edge') {
                    bat "mvn test -Pproxy-unit-test "
                }
            }
        }

            stage('Pre-Deployment Configuration - Caches') {
                steps {
                    dir('edge') {
                    println "Predeployment of Caches "
                    bat "mvn apigee-config:caches " +
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
                    bat "mvn apigee-config:targetservers " +
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
                    bat "mvn apigee-config:keyvaluemaps " +
                            "    -Papigee -Denv=${params.apigee_env} -Dorg=${params.apigee_org} " +
                            "    -Dusername=${params.apigee_user} " +
                            "    -Dpassword=${params.apigee_pwd}"

                }
            }
        }

            stage('Build proxy bundle') {
                steps {
                    dir('edge') {
                    bat "mvn package -Papigee -Denv=${params.apigee_env} -Dorg=${params.apigee_org}"

                }
            }
        }

            stage('Deploy proxy bundle') {
                steps {
                    dir('edge') {
                    bat "mvn apigee-enterprise:deploy -Papigee -Denv=${params.apigee_env} -Dorg=${params.apigee_org} -Dusername=${params.apigee_user} -Dpassword=${params.apigee_pwd}"
                }
            }
        }
            stage('Post-Deployment Configurations for API ') {
                steps {
                    dir('edge') {
                    println "Post-Deployment Configurations for API Products Configurations, App Developer and App Configuration "
                    bat "mvn -Papigee -Denv=${params.apigee_env} -Dorg=${params.apigee_org} " +
                            "    -Dapigee.config.options=create " +
                            "    -Dusername=${params.apigee_user} -Dpassword=${params.apigee_pwd} " +
                            "    apigee-config:apiproducts " +
                            "    apigee-config:developers apigee-config:apps apigee-config:exportAppKeys"
                }
            }
        }

//            stage('Functional Test') {
//                steps {
//                    dir('edge') {
//                    bat "node ./node_modules/cucumber/bin/cucumber-js target/test/integration/features --format json:target/reports.json"
//                }
//            }
//        }
            stage('Proxy Linting Report') {
                steps {
                    dir('edge') {
                        publishHTML(target: [
                                allowMissing         : false,
                                alwaysLinkToLastBuild: false,
                                keepAll              : false,
                                reportDir            : "./target",
                                reportFiles          : 'proxy-linting-test.html',
                                reportName           : 'HTML Report'
                        ]
                        )
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
                            reportDir            : "target/unit-test-coverage/lcov-report",
                            reportFiles          : 'index.html',
                            reportName           : 'HTML Report'
                    ]
                    )
                }
            }


        }

//            stage('Functional Test Report') {
//                steps {
//                    dir('edge') {
//                    step([
//                            $class             : 'CucumberReportPublisher',
//                            fileExcludePattern : '',
//                            fileIncludePattern : "**/reports.json",
//                            ignoreFailedTests  : false,
//                            jenkinsBasePath    : '',
//                            jsonReportDirectory: "target",
//                            missingFails       : false,
//                            parallelTesting    : false,
//                            pendingFails       : false,
//                            skippedFails       : false,
//                            undefinedFails     : false
//                    ])
//                }
//            }
//        }

    }
}

