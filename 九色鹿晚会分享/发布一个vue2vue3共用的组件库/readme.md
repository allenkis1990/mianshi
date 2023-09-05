###发布一个vue2vue3共用的组件库
###背景
##题型独立为公共组件，让多项目复用，但有的项目是vue3 有的是vue2 (例：虚拟教室为vue2  编程考试为vue3)，所以发布的组件必须V2和V3都兼容

###大体思路
##1.开发的时候统一用vue2的语法来编写组件
##2.把编写好的组件发布到npm上
##3.npm install 组件，并使用

###细节点
##1.复用组件相关
###install和use
###局部注册组件

##2.npm发布组件相关
#注册npm账号
#测试组件功能
#打包：package.json指定打包入口 vue-cli-service build --target lib src/components/questions/buildEntry.js --name zykjcommon-questions
#package.json三要素：name version main
#npm login --> npm publish

##3.发布的组件怎么让vue2和vue3项目都兼容
#vue3项目使用编译后的组件代码，vue2项目使用编译前的组件代码

##4.讨论