# Gatsby 的 Gitbook 主题

模仿 Gitbook 的样式,将 Gitbook 文档无缝迁移到 Gatsby

- 样式 `styled-components`
- 图标 `fortawesome`
- 解析 Markdown `gatsby-transformer-remark`
  - 将 mdast 节点转化为字符串 `mdast-util-to-string`
- 搜索
  - 搜索引擎 `js-search`
  - 中文分词支持 `nodejieba`
  - 客户端查询 `apollo`

## TODO

- [x] 代码块的着色渲染
- [x] 添加隐藏显示侧边栏时的动画
- [x] 使用搜索时,跳转页面搜索栏应该保持,而不应该被重置
- [x] 添加分享功能
- [x] 调整样式跟 Gitbook 统一
- [x] 主题切换
  - [x] 添加字体设置功能,字体大小,系列
  - [x] 主题切换时,代码块的主题也跟着切换
- [x] 点击文章跳转时,滚动条不会重置到最上方
- [ ] 添加上下章节的切换
- [ ] 添加章节序号
- [ ] 侧边栏宽度可调整
- [ ] 当鼠标停留在文章上方的 Header 区域时,会显示文档名
- [ ] 弹出菜单时,点击其余地方隐藏菜单

演示用的文档来源 [chrisniael/gitbook-documentation](https://github.com/chrisniael/gitbook-documentation)

- prism 主题来源
  - https://github.com/PrismJS/prism/tree/master/themes
  - https://github.com/PrismJS/prism-themes
