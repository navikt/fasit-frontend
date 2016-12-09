def mvnHome, mvn, nodeHome, npm, node // tools
def committer, lastcommit, releaseVersion // metadata
def application = "fasit-frontend"
def dockerDir = "./docker"
def distDir = "${dockerDir}/dist"

pipeline {
    agent label: ""

    stages {
        stage("checkout") {
            steps {
                git url: "ssh://git@stash.devillo.no:7999/aura/${application}.git"
            }
        }

        stage("initialize") {
            steps {
                script {
                    mvnHome = tool "maven-3.3.9"
                    mvn = "${mvnHome}/bin/mvn"
                    nodeHome = tool "nodejs-6.6.0"
                    npm = "${nodeHome}/bin/npm"
                    node = "${nodeHome}/bin/node"

                    releaseVersion = sh(
                            script: 'npm version major | cut -d"v" -f2',
                            returnStdout: true
                    ).trim()

                    // aborts pipeline if releaseVersion already is released
                    sh "if [ \$(curl -s -o /dev/null -I -w \"%{http_code}\" http://maven.adeo.no/m2internal/no/nav/aura/${application}/${application}/${releaseVersion}) != 404 ]; then echo \"this version is somehow already released, manually update to a unreleased SNAPSHOT version\"; exit 1; fi"

                    committer = sh(
                            script: 'git log -1 --pretty=format:"%ae (%an)"',
                            returnStdout: true
                    ).trim()


                    lastcommit = sh(
                            script: 'git log -1 --pretty=format:"%ae (%an) %h %s" --no-merges',
                            returnStdout: true
                    ).trim()
                }
            }
        }

        stage("npm install") { //
            steps {
                withEnv(['HTTP_PROXY=http://webproxy-utvikler.nav.no:8088', 'NO_PROXY=adeo.no']) {
                    sh "${npm} install"
                }
            }
        }

        stage("create version") {
            steps {
                script {
                    sh "${mvn} versions:set -f app-config/pom.xml -DgenerateBackupPoms=false -B -DnewVersion=${releaseVersion}"
                    sh "git commit -am \"set version to ${releaseVersion} (from Jenkins pipeline)\""
                    sh "git push origin master"
                    sh "git tag -a ${application}-${releaseVersion} -m ${application}-${releaseVersion}"
                    sh "git push --tags"
                }
            }
        }

        stage("build frontend bundle") {
            steps {
                withEnv(['HTTP_PROXY=http://webproxy-utvikler.nav.no:8088', 'NO_PROXY=adeo.no']) {
                    script {
                        sh "mkdir -p ${distDir}"
                        sh "cp production_server.js config.js selftest.js ${distDir}"
                        sh "cd ${distDir} && cp ../../package.json . && npm install --production && cd -"
                        // getting required node_modules for production
                        sh "npm install && npm run build || exit 1" // Creating frontend bundle
                        sh "cp -r dist ${distDir}" // Copying frontend bundle
                        sh "cp Dockerfile ${dockerDir}"
                    }
                }
            }
        }

        stage("build and publish docker image") {
            steps {
                script {
                    def imageName = "docker.adeo.no:5000/${application}:${releaseVersion}"
                    sh "sudo docker build -t ${imageName} ./docker"
                    sh "sudo docker push ${imageName}"
                }
            }
        }

        stage("publish app-config artifact") {
            steps {
                sh "${mvn} clean deploy -f app-config/pom.xml -DskipTests -B -e"
            }
        }

        stage("jilease") {
            steps {
                withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'jiraServiceUser', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
                    sh "/usr/bin/jilease -jiraUrl http://jira.adeo.no -project AURA -application ${application} -version $releaseVersion -username $env.USERNAME -password $env.PASSWORD"
                }
            }
        }

        stage("deploy to cd-u1") {
            steps {
                withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'srvauraautodeploy', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
                    sh "${mvn} aura:deploy -Dapps=${application}:${releaseVersion} -Denv=cd-u1 -Dusername=${env.USERNAME} -Dpassword=${env.PASSWORD} -Dorg.slf4j.simpleLogger.log.no.nav=debug -B -Ddebug=true -e"
                }
            }
        }

        stage("deploy to production") {
            steps {
                withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'srvauraautodeploy', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
                    sh "${mvn} aura:deploy -Dapps=${application}:${releaseVersion} -Denv=p -Dusername=${env.USERNAME} -Dpassword=${env.PASSWORD} -Dorg.slf4j.simpleLogger.log.no.nav=debug -B -Ddebug=true -e"
                }
            }
        }
    }

    notifications {
        success {
            script {
                GString message = "${application}:${releaseVersion} now in production. See jenkins for more info ${env.BUILD_URL}\nLast commit ${lastcommit}"
                mail body: message, from: "jenkins@aura.adeo.no", subject: "SUCCESSFULLY completed ${env.JOB_NAME}!", to: committerEmail
            }
        }

        failure {
            script {
                GString message = "AIAIAI! Your last commit on ${application} didn't go through. See log for more info ${env.BUILD_URL}\nLast commit ${lastcommit}"
                mail body: message, from: "jenkins@aura.adeo.no", subject: "FAILED to complete ${env.JOB_NAME}", to: committerEmail
            }
        }
    }
}

