/**
 * Created by Allen Liu on 2022/3/24.
 */


let count = 0
process.stdin.on('data', data => {
  let str = data.toString().replace(/\s+/,'')
  if(!str){
    process.stdout.write(`警告：输入的内容不可为空！\r\n`)
    return
  }
  process.stdout.write(`你的输入： ${data.toString()}`)
  process.exit();
});

process.stdout.write('你的名字叫什么？')
