// 导出一个对象，用于配置Prettier的规则
module.exports = {
  // 每行代码的最大长度
  printWidth: 80,
  // 缩进使用的空格数
  tabWidth: 2,
  // 是否使用制表符进行缩进
  useTabs: false,
  // 是否在语句末尾加分号
  semi: false,
  // 是否使用单引号
  singleQuote: true,
  // 末尾逗号的使用方式
  TrailingCooma: 'none',
  // 对象字面量的大括号内的首尾是否添加空格
  bracketSpacing: true,
  // 在jsx中，是否将>多行 JSX 元素放在最后一行的末尾，而不是单独放在下一行
  jsxBracketSameLine: false,
  // 在箭头函数参数只有一个时，是否省略括号
  arrowParens: 'avoid',
  // 在jsx中，是否使用单引号
  jsxSingleQuote: true,
  // 是否在导入语句之间添加空行
  importOrderSeparation: false,
  // 是否对导入语句进行排序
  importOrderSortSpecifiers: true,
  // 禁止非必要空格
  cssWhitespace: 'strict',
  // 导入语句的排序规则
  importOrder: [
    '^react',
    '^next',
    '<THIRD_PARTY_MODULES>',
    'highlight.js*',
    '@/app/(.*)',
    '@/config',
    '@/types',
    '@/providers',
    '@/components/ui/(.*)',
    '@/components/(.*)',
    '@/libs/(.*)',
    '@/utils/(.*)',
    '@/.*',
    '^./(.*)',
    '^../(.*)',
    '.(css|less|scss|sass|stylus)$'
  ]
}
