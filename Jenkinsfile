// pipeline {
//     agent any
//     environment {
//         REPO_URL = 'https://github.com/Bhavil-13/spefinalproj.git'
//         APP_NAME = 'spefinalproj'
//     }
//     stages {
//         stage('Clone Repository') {
//             steps {
//                 git branch: 'main', url: "${REPO_URL}"
//             }
//         }
//         stage('Build Docker Image') {
//             steps {
//                 script {
//                     sh '''
//                     echo "Building Docker image..."
//                     docker build -t ${APP_NAME}:latest .
//                     '''
//                 }
//             }
//         }
//         stage('Run Docker Container') {
//             steps {
//                 script {
//                     sh '''
//                     echo "Cleaning up any existing containers..."
//                     docker stop ${APP_NAME}_container || true
//                     docker rm ${APP_NAME}_container || true

//                     echo "Running Docker container..."
//                     docker run -d -p 3000:3000 --name ${APP_NAME}_container ${APP_NAME}:latest
//                     '''
//                 }
//             }
//         }
//     }
// }

pipeline {
    environment {
        backend = 'backend-image' // Specify your backend Docker image name/tag
        frontend = 'frontend-image' // Specify your frontend Docker image name/tag
        mysqlImage = 'mysql:latest' // Specify the MySQL Docker image
        mysqlContainerName = 'mysql-container' // Specify the name for your MySQL container
        MYSQL_ROOT_PASSWORD = 'ssg2bhavil'
        MYSQL_PORT = '3306'
        docker_image = ''
        NETWORK = 'deployment_my-network'
        
    }
    
    agent any

    stages {
        
        stage('Stage 0: Pull MySQL Docker Image') {
            steps {
                echo 'Pulling MySQL Docker image from DockerHub'
                script {
                    docker.image("${mysqlImage}").pull()
                }
            }
        }

        // stage('Stage 0: Pull MySQL Docker Image') {
        //     steps {
        //         echo 'Pulling MySQL Docker image from DockerHub'
        //         script {
        //             docker.withRegistry('', 'DockerCred') {
        //                 docker.image("${mysqlImage}").pull()
        //             }
        //         }
        //     }
        // }
        stage('Stage 0.1: Run MySQL Container') {
            steps {
                script {
                    sh  'docker container stop mysqldb'
                    sh  'docker container rm mysqldb'
                    sh  'docker run --name mysqldb -p 3306:3306 -e MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD} -d -v "/var/lib/mysql" --network=${NETWORK} mysql:latest'
                }
            }
        }
        
        stage('Stage 1: Git Clone') {
            steps {
                echo 'Cloning the Git repository'
                git branch: 'main', url: 'https://github.com/Bhavil-13/spefinalproj.git'
            }
        }

        stage('Stage 2: Build Spring Boot backend') {
            steps {
                echo 'Building Spring Boot backend'
                sh 'mvn clean install'
            }
        }
        
        stage('Stage 3: Build backend Docker Image') {
            steps {
                echo 'Building backend Docker image'
                sh "docker build -t bhavil13/${backend} ."
            }
        }

        stage('Stage 4: Build frontend Docker image') {
            steps {
                echo 'Building frontend Docker image'
                dir('frontend1') {
                    echo 'Changing to frontend1 directory'
                    sh "docker build -t bhavil13/${frontend} ."
                }
            }
        }

        stage('Stage 5: Push backend Docker image to DockerHub') {
            steps {
                echo 'Pushing backend Docker image to DockerHub'
                script {
                    docker.withRegistry('', 'DockerCred') {
                        sh 'docker push bhavil13/${backend}'
                    }
                }
            }
        }
        
        stage('Stage 6: Push frontend Docker image to DockerHub') {
            steps {
                echo 'Pushing frontend Docker image to DockerHub'
                script {
                    docker.withRegistry('', 'DockerCred') {
                        sh 'docker push bhavil13/${frontend}'
                    }
                }
            }
}

        stage('Stage 7: Clean docker images') {
            steps {
                script {
                    sh 'docker container prune -f'
                    sh 'docker image prune -f'
                }
            }
        }

        stage('Stage 8: Ansible Deployment') {
            steps {
                dir('Deployment'){
                    sh 'ansible-playbook -i inventory deploy.yml'
                }
            }
        }
    }
}