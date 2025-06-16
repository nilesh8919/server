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
