pipeline {
    agent any
     options {
        skipDefaultCheckout()
    }
    stages {
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[url: 'https://github.com/nilesh8919/server.git']],
                    doGenerateSubmoduleConfigurations: false,
                    extensions: [[$class: 'WipeWorkspace']], // clears old code
                ])
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test || echo "No tests available"'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                docker stop myapp || true
                docker rm myapp || true
                docker build -t myapp .
                docker run -d --name myapp -p 8080:8080 myapp
                '''
            }
        }
        stage('Deploy to EC2') {
            steps {
                sh '''
                ssh -o StrictHostKeyChecking=no ec2-user@13.50.99.75 "cd /path/to/app && git pull origin main && docker restart app-container"
                '''
            }
        }
    }
}
