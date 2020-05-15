1.git init创建git仓库 会多一个.git文件夹
2.git add xx.js   git add .新增全部 （黄到绿）
3.git rm --cached a1.js 取消新增（绿到黄）, git rm --cached . -r全部取消新增  (后面加-f强制)
4.git checkout a1.js 把新写得撤回保持和暂存区一样 git checkout .(全部)
5.git commit -m'备注'
6.git push origin master 提交到服务器
7.git pull origin master 和服务器上得代码同步
8.git branch 查看当前分支
9.git branch dev 创建一个分支 git checkout -b dev创建一个分支并切换到这个分支上
10.git checkout dev 切换到某个分支
11.git push origin --tags       checkout到这个tag然后执行命令
12.git push origin :refs/tags/1.0.2 删除1.0.2tag 要重新切到某个分支上重新打tag然后执行11命令
13.git clone -b master https://github.com/allenkis1990/gitTest.git  克隆一个分支到本地
14.git clone -b 1.0.1 https://github.com/allenkis1990/gitTest.git  克隆一个tag到本地只是修改了无法提交

