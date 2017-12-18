
node {
    def npm, node // tools
    def groupId = "nais"
    def appConfig = "nais.yaml"
    def committer, committerEmail, changelog // metadata
    def application = "fasit-frontend"
    def dockerDir = "./docker"
    def distDir = "${dockerDir}/dist"
    def releaseVersion

    try {
        stage("checkout") {
                git url: "https://github.com/navikt/fasit-frontend.git"

        }

        stage("initialize") {
            npm = "/usr/bin/npm"
            node = "/usr/bin/node"
			changelog = sh(script: 'git log `git describe --tags --abbrev=0`..HEAD --oneline', returnStdout: true)
            releaseVersion = sh(script: 'npm version major | cut -d"v" -f2', returnStdout: true).trim()


             committer = sh(script: 'git log -1 --pretty=format:"%ae (%an)"', returnStdout: true).trim()
             committerEmail = sh(script: 'git log -1 --pretty=format:"%ae"', returnStdout: true).trim()
        }


        stage("build frontend bundle") {
                withEnv(['HTTP_PROXY=http://webproxy-utvikler.nav.no:8088', 'NO_PROXY=adeo.no']) {
                        sh "mkdir -p ${distDir}"
                        sh "cp production_server.js config.js selftest.js ${distDir}"
                        sh "cd ${distDir} && cp ../../package.json . && npm install --production && cd -"
                     //    getting required node_modules for production
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

        stage("set version") {
             withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'srvauraautodeploy', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
                withEnv(['HTTPS_PROXY=http://webproxy-utvikler.nav.no:8088', 'NO_PROXY=adeo.no']) {
                    sh "git tag -a ${application}-${releaseVersion} -m ${application}-${releaseVersion}"
                    sh "git push https://${env.USERNAME}:${env.PASSWORD}@github.com/navikt/fasit-frontend.git --tags"
                    sh "git push https://${env.USERNAME}:${env.PASSWORD}@github.com/navikt/fasit-frontend.git"
                }
             }
        }

        stage("publish yaml") {
            withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'nexusUser', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
             sh "curl -s -F r=m2internal -F hasPom=false -F e=yaml -F g=${groupId} -F a=${application} -F v=${releaseVersion} -F p=yaml -F file=@${appConfig} -u ${env.USERNAME}:${env.PASSWORD} http://maven.adeo.no/nexus/service/local/artifact/maven/content"
                 }
           	}

        stage("deploy to !prod") {
                withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'srvauraautodeploy', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
                    sh "curl -k -d \'{\"application\": \"${application}\", \"version\": \"${releaseVersion}\", \"environment\": \"cd-u1\", \"zone\": \"fss\", \"namespace\": \"default\", \"username\": \"${env.USERNAME}\", \"password\": \"${env.PASSWORD}\"}\' https://daemon.nais.preprod.local/deploy"
                }
        }

        stage("verify resources") {
            retry(15) {
                sleep 5
                httpRequest consoleLogResponseBody: true,
                        ignoreSslErrors: true,
                        responseHandle: 'NONE',
                        url: 'https://fasit-frontend.nais.preprod.local/isalive',
                        validResponseCodes: '200'
            }
        }

        stage("deploy to prod") {
            withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'srvauraautodeploy', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
                sh "curl -k -d \'{\"application\": \"${application}\", \"version\": \"${releaseVersion}\", \"environment\": \"p\", \"zone\": \"fss\", \"namespace\": \"default\", \"username\": \"${env.USERNAME}\", \"password\": \"${env.PASSWORD}\"}\' https://daemon.nais.adeo.no/deploy"
            }
        }

        def successmessage = ":nais: Successfully deployed fasit-frontend:${releaseVersion} to prod :partyparrot: \nhttps://fasit-frontend.adeo.no\nLast commit by ${committer}: ${changelog}"
        slackSend channel: '#nye_fasit', message: successmessage, teamDomain: 'nav-it', tokenCredentialId: 'slack_fasit_frontend'

    } catch(e) {
        def message = ":shit: Your last commit on ${application} didn't go through. See log for more info ${env.BUILD_URL}\nLast commit ${changelog}"
       // slackSend channel: '#nais-internal', message: message, teamDomain: 'nav-it', tokenCredentialId: 'slack_fasit_frontend'
        throw e
    }
}

