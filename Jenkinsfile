pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Build'
            }
        }
        stage('Component Test') {
            steps {
                echo 'CTest'
            }
        }
        stage('Integration test') {
            steps {
                echo 'ITest'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Merging to master...'
		withCredentials([
                    usernamePassword(credentials: '7b3625e0-0d7d-4a67-84d8-08a2d79f2b31', usernameVariable: USER, passwordVariable: PWD)
                ]) {
			sh 'git add -A'
			sh 'git commit -m "Merged dev branch to main"'
			sh 'git merge https://github.com/prod-des-project-2021/group_10.git dev'
			sh 'git push https://github.com/prod-des-project-2021/group_10.git main'
		}
            }
        }
    }
}
