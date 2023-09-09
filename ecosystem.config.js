module.exports = {
  apps: [
    {
      name: 'dev-server', // 실행 프로세스 이름
      script: './dist/index.js', // 실행 파일명
      exec_mode: 'fork', // fork, cluster 모드 중 선택
      merge_logs: true, // 클러스터 모드 사용 시 각 클러스터에서 생성되는 로그를 한 파일로 합쳐준다.
      watch: ['dist'], // 파일이 변경되었을 때 재시작 할지 선택, true 또는 디렉터리 배열로 입럭한다.
      // max_memory_restart: "512M", // 프로그램의 메모리 크기가 일정 크기 이상이 되면 재시작한다.
      env: {
        // 개발 환경설정
        PORT: 3030,
        NODE_ENV: 'development',
      },
    },
    {
      name: 'prod-server',
      script: './dist/index.js',
      exec_mode: 'cluster',
      instances: 'max', // 0이면 CPU 코어 수 만큼 인스턴스를 실행한다.
      max_memory_restart: '500M', // 프로세스의 메모리가 300MB에 도달하면 reload 실행
      watch: false, //bin폴더, routes폴더를 감시해서 변경사항 실행
      env: {
        // 환경 변수 설정
        PORT: 4040,
        NODE_ENV: 'production',
      },
      output: './logs/pm2/console.log', // 로그 출력 경로 재설정
      error: './logs/pm2/onsoleError.log', // 에러 로그 출력 경로 재설정
    },
  ],
  /* deploy는 원격 서버와 git을 연동해서 배포하는 방식 */
  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
}
