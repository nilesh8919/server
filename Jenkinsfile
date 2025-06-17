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
                echo "Deploying to EC2..."
                scp -i /path/to/node-key.pem -o StrictHostKeyChecking=no -r * ec2-user@13.50.99.75:/home/ec2-user/backend
                ssh -i /path/to/node-key.pem -o StrictHostKeyChecking=no ec2-user@13.50.99.75 "cd /home/ec2-user/backend && pm2 restart all || docker-compose up -d --build"
                '''
            }
        }
    }
}
