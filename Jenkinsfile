pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/nilesh8919/server.git'
            }
        }
        stage('Build') {
            steps {
                echo 'Building...'
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
            }
        }
    }
}
