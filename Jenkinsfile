// pipeline {
//     environment {
//         backend = 'backend-image' // Specify your backend Docker image name/tag
//         frontend = 'frontend-image' // Specify your frontend Docker image name/tag
//         mysqlImage = 'mysql:latest' // Specify the MySQL Docker image
//         mysqlContainerName = 'mysql-container' // Specify the name for your MySQL container
//         MYSQL_ROOT_PASSWORD = 'ssg2bhavil'
//         MYSQL_PORT = '3306'
//         docker_image = ''
//         NETWORK = 'deployment_my-network'
        
//     }
    
//     agent any

//     stages {
//         stage('Stage 0: Pull MySQL Docker Image') {
//             steps {
//                 echo 'Pulling MySQL Docker image from DockerHub'
//                 script {
//                     docker.image("${mysqlImage}").pull()
//                 }
//             }
//         }

//         stage('Create Docker Network') {
//             steps {
//                 script {
//                     sh "docker network create ${NETWORK} || true"
//                 }
//             }
//         }

//         stage('Stage 0.1: Run MySQL Container') {
//             steps {
//                 script {
//                     sh  'docker container stop mysqldb'
//                     sh  'docker container rm mysqldb'
//                     sh  'docker run --name mysqldb -p 3306:3306 -e MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD} -d -v "/var/lib/mysql" --network=${NETWORK} mysql:latest'
//                 }
//             }
//         }

        
//         stage('Stage 1: Git Clone') {
//             steps {
//                 echo 'Cloning the Git repository'
//                 git branch: 'main', url: 'https://github.com/Bhavil-13/spefinalproj.git'
//             }
//         }

//         stage('Stage 2: Build Spring Boot backend') {
//             steps {
//                 echo 'Building Spring Boot backend'
//                 sh 'mvn clean install'
//             }
//         }
        
//         stage('Stage 3: Build backend Docker Image') {
//             steps {
//                 echo 'Building backend Docker image'
//                 sh "docker build -t bhavil13/${backend} ."
//             }
//         }

//         stage('Stage 4: Build frontend Docker image') {
//             steps {
//                 echo 'Building frontend Docker image'
//                 dir('frontend') {
//                     echo 'Changing to frontend directory'
//                     sh "docker build -t bhavil13/${frontend} ."
//                 }
//             }
//         }
//         stage('Stage 5: Push backend Docker image to DockerHub') {
//             steps {
//                 echo 'Pushing backend Docker image to DockerHub'
//                 script {
//                     docker.withRegistry('', 'DockerHub_ID') {
//                         sh 'docker push bhavil13/${backend}'
//                     }
//                 }
//             }
//         }
//         stage('Stage 6: Push frontend Docker image to DockerHub') {
//             steps {
//                 echo 'Pushing frontend Docker image to DockerHub'
//                 script {
//                     docker.withRegistry('', 'DockerHub_ID') {
//                         sh 'docker push bhavil13/${frontend}'
//                     }
//                 }
//             }
// }

//         stage('Stage 7: Clean docker images') {
//             steps {
//                 script {
//                     sh 'docker container prune -f'
//                     sh 'docker image prune -f'
//                 }
//             }
//         }

//         stage('Stage 8: Ansible Deployment') {
//             steps {
//                 dir('Deployment'){
//                     sh 'ansible-playbook -i inventory deploy.yml'
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
        mysqlContainerName = 'mysqldb' // Specify the name for your MySQL container
        MYSQL_ROOT_PASSWORD = 'ssg2bhavil'
        MYSQL_PORT = '3306'
        NETWORK = 'deployment_my-network'
        DOCKERHUB_CREDENTIALS_ID = 'DockerHub_ID' // Update with your Jenkins credentials ID for DockerHub
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

        stage('Create Docker Network') {
            steps {
                script {
                    // Check if the network exists, create it if not
                    sh "docker network ls | grep -w ${NETWORK} || docker network create ${NETWORK}"
                }
            }
        }

        stage('Stage 0.1: Run MySQL Container') {
            steps {
                script {
                    // Stop and remove the container if it exists
                    sh """
                        docker ps -a --format '{{.Names}}' | grep -w ${mysqlContainerName} && docker container stop ${mysqlContainerName} || true
                        docker ps -a --format '{{.Names}}' | grep -w ${mysqlContainerName} && docker container rm ${mysqlContainerName} || true
                    """
                    // Run the MySQL container
                    sh """
                        docker run --name ${mysqlContainerName} \
                        -p ${MYSQL_PORT}:3306 \
                        -e MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD} \
                        -d \
                        --network=${NETWORK} \
                        -v mysql-data:/var/lib/mysql \
                        ${mysqlImage}
                    """
                }
            }
        }

        stage('Stage 1: Git Clone') {
            steps {
                echo 'Cloning the Git repository'
                git branch: 'main', url: 'https://github.com/Bhavil-13/spefinalproj.git'
            }
        }

        stage('Stage 2: Build Spring Boot Backend') {
            steps {
                echo 'Building Spring Boot backend'
                sh 'mvn clean install'
            }
        }
        
        stage('Stage 3: Build Backend Docker Image') {
            steps {
                echo 'Building backend Docker image'
                sh "docker build -t bhavil13/${backend} ."
            }
        }

        stage('Stage 4: Build Frontend Docker Image') {
            steps {
                echo 'Building frontend Docker image'
                dir('frontend') {
                    echo 'Changing to frontend directory'
                    sh "docker build -t bhavil13/${frontend} ."
                }
            }
        }

        stage('Stage 5: Push Backend Docker Image to DockerHub') {
            steps {
                echo 'Pushing backend Docker image to DockerHub'
                script {
                    docker.withRegistry('', "${DOCKERHUB_CREDENTIALS_ID}") {
                        sh "docker push bhavil13/${backend}"
                    }
                }
            }
        }

        stage('Stage 6: Push Frontend Docker Image to DockerHub') {
            steps {
                echo 'Pushing frontend Docker image to DockerHub'
                script {
                    docker.withRegistry('', "${DOCKERHUB_CREDENTIALS_ID}") {
                        sh "docker push bhavil13/${frontend}"
                    }
                }
            }
        }

        stage('Stage 7: Clean Docker Images') {
            steps {
                script {
                    // Remove specific images instead of pruning everything
                    sh "docker rmi -f bhavil13/${backend} || true"
                    sh "docker rmi -f bhavil13/${frontend} || true"
                }
            }
        }

        stage('Stage 8: Ansible Deployment') {
            steps {
                dir('Deployment') {
                    echo 'Running Ansible Playbook'
                    sh 'ansible-playbook -i inventory deploy.yml'
                }
            }
        }
    }
}
