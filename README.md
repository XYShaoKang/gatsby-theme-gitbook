# Gatsby 的 Gitbook 主题

模仿 Gitbook 的样式,将 Gitbook 文档无缝迁移到 Gatsby

- 图标 [`fortawesome`](https://fortawesome.com/)
- 解析 Markdown [`gatsby-transformer-remark`](https://www.gatsbyjs.org/packages/gatsby-transformer-remark/)
  - 将 mdast 节点转化为字符串 [`mdast-util-to-string`](https://github.com/syntax-tree/mdast-util-to-string)
- 搜索
  - 搜索引擎
    - [`js-search`](https://github.com/bvaughn/js-search)
  - 中文分词模块
    - [segmentit](https://github.com/linonetwo/segmentit)
  - 字典
    - [segment-dict](https://github.com/bluelovers/node-segment-dict)
- 样式 [`styled-components`](https://www.styled-components.com/)
  - 代码块渲染 [`prism`](https://prismjs.com/)
  - prism 主题来源
    - https://github.com/PrismJS/prism/tree/master/themes
    - https://github.com/PrismJS/prism-themes
- 演示用的文档来源 [chrisniael/gitbook-documentation](https://github.com/chrisniael/gitbook-documentation)

## TODO

- [x] 代码块的着色渲染
- [x] 添加隐藏显示侧边栏时的动画
- [x] 使用搜索时,跳转页面搜索栏应该保持,而不应该被重置
- [x] 添加分享功能
- [x] 调整样式跟 Gitbook 统一
- [x] 主题切换
  - [x] 添加字体设置功能,字体大小,系列
  - [x] 主题切换时,代码块的主题也跟着切换
  - [ ] 自定义滚动条,将滚动条的颜色统一为主题色
  - [ ] 优化弹出菜单样式
  - [ ] 弹出菜单时,点击其余地方隐藏菜单
- [x] 点击文章跳转时,滚动条不会重置到最上方
- [x] 添加上下章节的切换
- [x] 添加章节序号
- [ ] 侧边栏宽度可调整
- [x] 当鼠标停留在文章上方的 Header 区域时,会显示文档名
- [ ] 添加 toc
- [ ] 添加加载占位图,加载动画
- [ ] 添加图表支持
- [ ] 导出功能
  - [ ] PDF
  - [ ] ePub
  - [ ] Mobi
- [ ] 代码块
  - [ ] 复制功能
  - [ ] 实时预览
- [x] 修复搜索
  - [x] 偶尔会搜索不到内容
    - 应该是缓存引起的,`search.addDocuments`在`onCreateNode`中解析`Markdown`时去添加内容,当存在缓存时,好像并不会在去重新解析`Markdown`,所以就不会走到往`search`里添加索引这一步,这样没有索引,搜索结果就为空了.
    - 解决办法
      - 因为需要考虑编译后的使用搜索,将`js-search`迁移到浏览器上使用,需要的文档数据使用`Graphql`获取,不需要在`onCreateNode`中去添加文档
  - [ ] 输入时,展示界面闪屏
  - [x] 支持离线搜索
  - [x] 中文支持
    - 使用`segmentit`+`segment-dict`
  - [x] 热加载时,搜索索引也跟着更新
    - 在`getAllNodes`中添加`connectionType: 'MarkdownRemark'`
  - [ ] 高亮搜索的关键词
  - [ ] 滚动到关键词处
  - [ ] 搜索结果排序
  - [ ] 修复 js-search@2.0 类型
  - [ ] 完善 segmentit 类型
  - [ ] 添加搜索时的提示,在搜索过程中的进度条,搜索结束如果搜索没有结果,需要提示
  - [ ] 控制搜索的请求(当前是每输入一个字符都会发起请求)
    - [ ] 判断用户是否在输入,如果一直在输入,直到等待输入完成,在发送请求
    - [ ] 控制在比较小的时间间隔内,这样可以有一种实时的效果,又不会太频繁的发送请求
    - [ ] 可以考虑根据网络情况使用策略
  - [ ] 添加搜索结果直达快捷键,并显示
  - [ ] 明确搜索规则,并提供相应的可展示 UI
  - [ ] 添加搜索展示的滚动条
- [ ] 添加测试
- [ ] 主题可配置项
  - [ ] 目录页,默认为`/SUMMARY/`
- [ ] 解决控制台 404 报错

## FAQ

- 不要在浏览器使用`Apollo`来访问服务端的`___graphql`,编译后没有`___graphql`,只能在开发模式中用,可以用作开发过程中的辅助
  - 有机会可以尝试下能不能利用`Apollo Cache`,将一些数据规范化,导入到缓存中,在浏览器中使用
