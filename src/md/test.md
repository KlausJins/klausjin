## 前言

前端单页面(SPA)项目的部署流程一般是：

1. 前端本地执行 build 命令，得到一个打包后的文件夹（一般叫 dist，本文后面都用 dist 文件夹代指打包后的文件）
2. 使用 xshell、secureCRT 远程连接工具连接服务器，然后把 dist 文件夹上传到服务器内
3. 编写 nginx.conf，实现页面代理
4. 访问对应网站，刷新页面

如果项目上线后有 bug 需要修复，改完代码后需要重新部署+验证，只需重复第 1、2、4 步骤即可

这时可能会遇到的问题：

只要项目有改动，不管大小，修改完后要重新部署都需要人工手动重复第 1、2、4。可能 1 次、2 次改动后重新部署还好，但是如果有很多次改动，每次改动完都要人工部署，这样效率太低了

针对上面这种重复无聊的情况，我们可以编写一个 shell 脚本帮我们自动做这些事情，每次需要重新部署时执行这个脚本文件就行

## 实现思路

1. 执行本地构建命令，得到 dist 文件夹
2. 备份服务器上之前的 dist 目录到备份目录(bakup)，防止出现问题后能够快速还原回去
3. 使用 `scp` 命令把 dist 文件夹上传到服务器的上传目录(uploads)
4. 把刚刚上传的 dist 文件夹拷贝到服务器的部署目录并覆盖之前的 dist 文件夹
5. 访问对应网站，刷新页面

### 前置准备

1. 配置服务器 ssh 免密登录（必须配置，配置后使用 ssh 登录服务器无需输入密码不会中断执行流程），这个很简单不过多介绍
2. 预先在服务器的工作目录下创建好 2 个文件夹：
   - uploads：用来存放上传过来的文件
   - backup：用来存放之前已部署的 dist 文件夹内的内容

示例代码：

```shell
# 遇到报错就停止执行
set -e

# 构建dist
npm run build

# 服务器工作目录
workspace="/home/web/my-project"
# 服务器用户名
user="root"
# 服务器ip
addr="123.456.789.123"

# 根据当前时间创建文件夹，eg: 20241016_234950
folder_name=$(date +"%Y%m%d_%H%M%S")

# 创建上传目录
ssh "$user@$addr" "mkdir -p "$workspace/uploads/$folder_name""
# 创建备份目录
ssh "$user@$addr" "mkdir -p "$workspace/backup/$folder_name""

# 备份已有的dist目录
ssh "$user@$addr" "cp -r "$workspace/dist/*" "$workspace/backup/$folder_name/""

# 把本地打包好的dist文件夹复制到服务器，注意：这个本地路径需要根据实际情况编写
scp -r /Users/fuxiaochen/Documents/code/my-project/dist/* "$user@$addr:$workspace/uploads/$folder_name/"

# 把上传好的文件替换掉dist中的内容
ssh "$user@$addr" "cp -r "$workspace/uploads/$folder_name/*" "$workspace/dist/""

```

将上面内容保存为 `deploy.sh` 文件

执行`deploy.sh` 脚本文件

```sh
./deploy.sh
```

## 注意事项

- 执行脚本 `deploy.sh` 时提示没有权限 Permission denied

报这个错是因为没有可执行的权限，可以执行下面命令给脚本文件加上可执行的权限

```shell
chmod +x ./deploy.sh
```

- 以上 shell 脚本只在 Mac/Linux 环境下测试过，Windows 上如果需要执行 shell 脚本需要在 git bash 的终端环境内执行

  - git bash 在你安装 git 的时候已经装上了
  - git bash 终端环境中本地的路径不是传统的 Windows 路径比如：`C:\Users\aifuxi\xxx` 而是类似 `/c/users/aifuxi/xx` 这种，具体可以执行 `pwd` 查看具体路径

![image.png](https://aifuxi.oss-cn-shanghai.aliyuncs.com/fuxiaochen/image-icblh4yirans0bpwq2a8wb3k.webp)
