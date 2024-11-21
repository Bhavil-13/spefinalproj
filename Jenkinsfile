pipeline {
    agent any
    environment {
        REPO_URL = 'https://github.com/Bhavil-13/spefinalproj.git'
        APP_NAME = 'spefinalproj'
    }
    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: "${REPO_URL}"
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh '''
                    echo "Building Docker image..."
                    docker build -t ${APP_NAME}:latest .
                    '''
                }
            }
        }
        stage('Run Docker Container') {
            steps {
                script {
                    sh '''
                    echo "Running Docker container..."
                    docker run -d -p 3000:3000 --name ${APP_NAME}_container ${APP_NAME}:latest
                    '''
                }
            }
        }
    }
    post {
        always {
            echo "Cleaning up..."
            sh 'docker stop ${APP_NAME}_container || true && docker rm ${APP_NAME}_container || true'
        }
    }
}
