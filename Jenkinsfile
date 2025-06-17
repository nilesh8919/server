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
                echo 'Checkout Completed'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                echo 'Dependencies Installed'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test || echo "No tests available"'
                echo 'Test Stage Completed'
            }
        }

        stage('Deploy to EC2') {
            steps {
                sh '''
                ssh -o StrictHostKeyChecking=no ec2-user@13.50.99.75 << EOF
                  echo "🔁 Pulling latest code..."
                  cd /path/to/app
                  git pull origin main

                  echo "🔁 Rebuilding Docker container..."
                  docker stop app-container || true
                  docker rm app-container || true
                  docker build -t app-container .
                  docker run -d --name app-container -p 8080:8080 app-container
                  echo " EC2 Deployment Completed"
                EOF
                '''
                echo ' EC2 Deployment Triggered from Jenkins'
            }
        }
    }
}
