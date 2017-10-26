
node {
    def npm, node // tools
    def groupId = "nais"
    def appConfig = "nais.yaml"
    def committer, committerEmail, changelog, releaseVersion // metadata
    def application = "fasit-frontend"
    def dockerDir = "./docker"
    def distDir = "${dockerDir}/dist"

    try {
        stage("checkout") {
                git url: "ssh://git@stash.devillo.no:7999/aura/${application}.git",  branch: "naisify"
        }

        stage("initialize") {
            //mvnHome = tool "maven-3.3.9"
            //mvn = "${mvnHome}/bin/mvn"
            npm = "/usr/bin/npm"
            node = "/usr/bin/node"
			changelog = sh(script: 'git log `git describe --tags --abbrev=0`..HEAD --oneline', returnStdout: true)
            releaseVersion = sh(script: 'npm version major | cut -d"v" -f2', returnStdout: true).trim()

             // aborts pipeline if releaseVersion already is released
             //sh "if [ \$(curl -s -o /dev/null -I -w \"%{http_code}\" http://maven.adeo.no/m2internal/no/nav/aura/${application}/${application}/${releaseVersion}) != 404 ]; then echo \"this version is somehow already released, manually update to a unreleased SNAPSHOT version\"; exit 1; fi"
             committer = sh(script: 'git log -1 --pretty=format:"%ae (%an)"', returnStdout: true).trim()
             committerEmail = sh(script: 'git log -1 --pretty=format:"%ae"', returnStdout: true).trim()
        }

        stage("create version") {
                    //sh "${mvn} versions:set -f app-config/pom.xml -DgenerateBackupPoms=false -B -DnewVersion=${releaseVersion}"
                    //sh "git commit -am \"set version to ${releaseVersion} (from Jenkins pipeline)\""
                    //sh "git push origin master"

        }

        stage("build frontend bundle") {
                withEnv(['HTTP_PROXY=http://webproxy-utvikler.nav.no:8088', 'NO_PROXY=adeo.no']) {
                        sh "mkdir -p ${distDir}"
                        sh "cp production_server.js config.js selftest.js ${distDir}"
                        sh "cd ${distDir} && cp ../../package.json . && npm install --production && cd -"
                        // getting required node_modules for production
                        sh "npm install && npm run build || exit 1" // Creating frontend bundle
                        sh "cp -r dist ${distDir}" // Copying frontend bundle
                        sh "cp Dockerfile ${dockerDir}"
                }
        }

        stage("build and publish docker image") {
                    def imageName = "docker.adeo.no:5000/${application}:${releaseVersion}"
                    sh "sudo docker build -t ${imageName} ./docker"
                    sh "sudo docker push ${imageName}"
        }

       // stage("publish app-config artifact") {
         //       sh "${mvn} clean deploy -f app-config/pom.xml -DskipTests -B -e"
        //}

        stage("publish yaml") {
              withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'nexusUser', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
                 sh "curl -s -F r=m2internal -F hasPom=false -F e=yaml -F g=${groupId} -F a=${application} -F v=${releaseVersion} -F p=yaml -F file=@${appConfig} -u ${env.USERNAME}:${env.PASSWORD} http://maven.adeo.no/nexus/service/local/artifact/maven/content"
                        }
            	}

        stage("jilease") {
                withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'jiraServiceUser', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
                    sh "/usr/bin/jilease -jiraUrl https://jira.adeo.no -project AURA -application ${application} -version $releaseVersion -username $env.USERNAME -password $env.PASSWORD"
                }
        }

        stage("deploy to cd-u1") {
                withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'srvauraautodeploy', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
                    sh "curl -k -d \'{\"application\": \"${application}\", \"version\": \"${releaseVersion}\", \"environment\": \"cd-u1\", \"zone\": \"fss\", \"namespace\": \"default\", \"username\": \"${env.USERNAME}\", \"password\": \"${env.PASSWORD}\"}\' https://daemon.nais.preprod.local/deploy"
                }
        }

       // stage("deploy to production") {
         //       withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'srvauraautodeploy', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
           //         sh "${mvn} aura:deploy -Dapps=${application}:${releaseVersion} -Denv=p -Dusername=${env.USERNAME} -Dpassword=${env.PASSWORD} -Dorg.slf4j.simpleLogger.log.no.nav=debug -B -Ddebug=true -e"
             //   }
       // }

        //def successmessage = "Successfully deployed fasit-frontend:${releaseVersion} to prod :partyparrot: \nhttps://fasit-frontend.adeo.no\nLast commit by ${committer}: ${changelog}"
        //slackSend channel: '#nye_fasit', message: successmessage, teamDomain: 'nav-it', tokenCredentialId: 'slack_fasit_frontend'

    } catch(e) {
        //currentBuild.result = "FAILED"
        //GString message = ":shit: Your last commit on ${application} didn't go through. See log for more info ${env.BUILD_URL}\nLast commit ${changelog}"
        //mail body: message, from: "jenkins@aura.adeo.no", subject: "FAILED to complete ${env.JOB_NAME}", to: committerEmail

       // slackSend channel: '#nye_fasit', message: message, teamDomain: 'nav-it', tokenCredentialId: 'slack_fasit_frontend'

        throw e
    }
}

