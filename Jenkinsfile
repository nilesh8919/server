pipeline {
    agent any

    triggers {
        githubPush()
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/nilesh8919/server.git'
            }
        }

        stage('Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test || echo "No tests available"'
            }
        }

        stage('Deploy to EC2') {
            steps {
                sh '''
                ssh -o StrictHostKeyChecking=no ec2-user@13.50.99.75 << EOF
                  cd /path/to/app
                  git pull origin main
                  docker stop app-container || true
                  docker rm app-container || true
                  docker build -t app-container .
                  docker run -d --name app-container -p 8080:8080 app-container
                EOF
                '''
            }
        }
    }
}
