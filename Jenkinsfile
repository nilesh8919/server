pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/nilesh8919/server.git'
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

        stage('Deploy to Docker') {
            steps {
                sh '''
                docker stop my-node-app || true
                docker rm my-node-app || true
                docker build -t my-node-app .
                docker run -d -p 8081:8080 -p 50000:50000 --name jenkins jenkins/jenkins:lts
                '''
            }
        }
    }
}
