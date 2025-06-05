## 一级标题 1

**加粗**
_倾斜_
~~删除线~~

`行内代码`
==高亮==
X^上标^
H~2~O
<u>下划线</u>

配置服务器 ssh 免密登录（必须配置，配置后使用 ssh 登录服务器无需输入密码不会中断执行流程），这个很简单不过多介绍，配置完成后，在服务器上执行以下命令，将公钥复制到本地，然后粘贴到 github 的 ssh key 中，这样就可以使用 ssh 方式拉取代码了。

> 一级引用
>
> > 嵌套引用
> >
> > > 三级引用
> > > 带空格的嵌套

- 项目 1
  - 子项目（缩进 2 空格）

* 项目 2

- 项目 3

- 1.  第一项

2.  第二项
3.  子项（缩进 3 空格）
4.  第三项

### 三级标题 1

- [x] 已完成任务
- [ ] 未完成任务
- [ ] 待办事项

```python
def fibonacci(n):
    if n <= 1:
        return n
    else:
        return fibonacci(n-1) + fibonacci(n-2)
```

| 左对齐     | 居中对齐 | 右对齐 |
| :--------- | :------: | -----: |
| 数据 1     |  数据 2  | 数据 3 |
| 长内容示例 | 居中内容 | 100.00 |

## 一级标题 2

[普通链接](https://example.com)
[带标题链接](https://example.com '悬浮提示')
[引用式链接][ref]
[ref]: https://example.com "引用链接"
自动链接 <https://example.com>

![替代文字](https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg)

---

正文内容[1](@ref)
[1](@ref): 脚注说明内容

:smile: → 😄
:heart: → ❤️
:rocket: → 🚀
