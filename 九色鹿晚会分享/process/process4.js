/**
 * Created by Allen Liu on 2022/3/24.
 */

let fs = require('fs')
let path = require('path')
var cp = require('child_process');


let opts = {}
let count = 0
process.stdin.on('data', data => {
  let str = data.toString().replace(/\s+/,'')
  if(!str){
    return
  }
  switch(count){
    case 0:
      if(str == 'a'){
        opts.useTs = false
        opts.cloneUrl = 'https://gitee.com/allen-lwh/vue3-js.git'
        count ++
      }else if(str == 'b'){
        opts.useTs = true
        opts.cloneUrl = 'https://gitee.com/allen-lwh/vue3-ts.git'
        count ++
      }else{
        return
      }
      process.stdout.write('使用vue-router吗? a:使用 b:不使用')
      break

    case 1:
      if(str == 'a'){
        opts.useRouter = true
        count ++
      }else if(str == 'b'){
        opts.useRouter = false
        count ++
      }else{
        return
      }
      process.stdout.write('使用vuex吗? a:使用 b:不使用')
      break
    case 2:
      if(str == 'a'){
        opts.useVuex = true
        count ++
      }else if(str == 'b'){
        opts.useVuex = false
        count ++
      }else{
        return
      }
      process.stdout.write('正在为您生成项目.............')
      createProject(()=>{
          process.stdout.write('项目创建完毕')
          process.exit();
      })
      break
  }
});

process.stdout.write('欢迎使用vue3工程创建器！！！,请通过选择配置项来创建工程\n使用typescript吗? a:不使用 b:使用')


function createProject(cb){
  let projectName = opts.useTs ? 'vue3-ts' : 'vue3-js'
  var options = {
    cwd: './'
  };
  cp.exec(`rimraf ${projectName}`, options, function(e, stdout, stderr) {
    if(!e) {
      // var cloneTask = cp.spawn('git.exe',['clone','https://gitee.com/allen-lwh/vue3-ts.git'],options);
      console.log(opts.cloneUrl);
      var cloneTask = cp.spawn('git.exe',['clone',opts.cloneUrl],options);
      //打印成功数据
      cloneTask.stdout.on('data', function(d) {
        console.log(d.toString());
      });

      //打印失败数据
      cloneTask.stderr.on('data', (data) => {
        console.error(`cloneTask stderr: ${data}`);
      });

      cloneTask.on('exit', function() {
        cloneTask.stdin.end();
        let content = fs.readFileSync(path.resolve(__dirname,`./${projectName}/src/main.${opts.useTs?'ts':'js'}`),'utf-8')
        if(!opts.useRouter){
          content = notUseRouterDo(content,projectName,options)
        }
        if(!opts.useVuex){
          content = notUseVuexDo(content,projectName,options)
        }
        fs.writeFileSync(path.resolve(__dirname,`./${projectName}/src/main.${opts.useTs?'ts':'js'}`),content,'utf-8')
        cb && cb()
      });
    }
  });
}

function notUseRouterDo(content,projectName,options){
  let replace1 = "import router from './router'"
  let replace2 = ".use(router)"
  content = content.replace(replace1,'')
  content = content.replace(replace2,'')
  cp.execSync(`rimraf ${projectName}/src/router`, options)
  return content
}
function notUseVuexDo(content,projectName,options){
  let replace1 = "import store from './store'"
  let replace2 = ".use(store)"
  content = content.replace(replace1,'')
  content = content.replace(replace2,'')
  cp.execSync(`rimraf ${projectName}/src/store`, options)
  return content
}