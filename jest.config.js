module.exports = {
  coverageDirectory: '<rootDir>/coverage', //覆盖率报告生成目录
  collectCoverage: true,
  collectCoverageFrom: [ //从如下文件收集覆盖率
    'lib/**/*.js', //src下的文件
    '!**/node_modules/**' //不包括node_modules下的文件
  ]
};

