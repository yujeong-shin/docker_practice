// vue cli 구성 옵션을 지정하는 파일
// transpileDependencies 옵션을 통해 의존성을 ES5로 트랜스form 한다.
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
