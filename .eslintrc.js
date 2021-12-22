module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  extends: [ 'eslint:recommended' ],
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  rules: {
    'quotes': ['error', 'single'], // 单引号
    'no-cond-assign': ['error', 'always'], // if, while中使用赋值操作符
    'semi': ['error', 'never'], // 结尾有分号
    'eol-last': ['error', 'always'], // 结尾有空行
    'comma-dangle': ['error', {
      'arrays': 'never', // e.g. let [a,] = [1,];
      'objects': 'ignore', // e.g. let {a,} = {a: 1};
      'imports': 'never', // e.g. import {a,} from 'foo';
      'exports': 'never', // e.g. export {a,};
      'functions': 'ignore' // e.g. (function(a,){ })(b,);
    }], // 末尾逗号
    'comma-spacing': ['error', {
      'before': false, // e.g. { a: 1,b: 2}
      'after': true // e.g. { a: 1, b: 2}
    }], // 逗号前后空格
    'space-before-blocks': ['error', 'always'], // 块之前使用空格
    'space-before-function-paren': ['error', 'always'], // 函数定义的括号前使用空格
    'wrap-iife': ['error', 'outside'], // 立即执行函数的定义方式 e.g. (function () {}())
    'curly': 'error', // if else的使用方式
    'block-spacing': ['error', 'always'], // 块的大号括号内的空格
    'eqeqeq': 'error', // 使用 === 和 !==
    'keyword-spacing': ['error', {
      'before': true,
      'after': true,
      'overrides': {}
    }], // keyword前后的空格
    'key-spacing': ['error', {
      'beforeColon': false,
      'afterColon': true
    }], // key-value之间的空格
  },
  overrides: [
    {
      files: ['**/__tests__/**/*.js'],
      env: {
        jest: true
      },
      rules: {
        'node/no-extraneous-require': 'off'
      }
    }
  ]
}
