# 迁移内容至GitHub

如果你开始在GitBook上写书了，但现在你想把它的源代码托管到GitHub上，不用担心，这很简单：


## 使用GitHub导入工具

1. 使用GitHub的**导入工具**：[import.github.com/new](https://import.github.com/new)。
2. 输入你的GitBook的git url，例如：`https://git.gitbook.com/MyName/MyBook.git`（这个url可以在你书本的设置中找到）。
3. 输入你的GitHub仓库。
4. 当提示时输入你的GitBook凭证（你可以使用你的API token代替你的密码）。

当你的内容迁移到GitHub后，你可以建立集成来让GitBook依然能从GitHub中构建你的书本：[集成GitHub](./README.md)


## 使用命令行

在GitHub上创建完仓库后。

**注意：**这个操作会覆盖你的git历史记录。

```
# Clone你的GitBook仓库（你需要输入你的用户名和密码）
$ git clone https://git.gitbook.com/MyName/MyBook.git ./mybook

# 进入Clone的书本
cd ./mybook

# Push它至GitHub
$ git push https://github.com/username/repo.git master --force
```
