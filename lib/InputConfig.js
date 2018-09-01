const problems = [];

// 项目名
problems.push({
  type: 'input',
  name: 'projectName',
  message: 'Project name:',
  default: 'default project name',
});
// 项目简介
problems.push({
  type: 'input',
  name: 'description',
  message: 'Project description:',
  default: 'A Kirin project',
});
// 项目作者
problems.push({
  type: 'input',
  name: 'author',
  message: 'Project author:'
});
// 项目选择
problems.push({
  type: 'list',
  message: 'Project template:',
  name: 'template',
  choices: [
      {
        name: 'Base project',
        value: 'base',
      },
      {
        name: 'Empty project',
        value: 'empty'
      },
      {
        name: 'Demo project',
        value: 'demo'
      }
    ]
});

module.exports = problems;
