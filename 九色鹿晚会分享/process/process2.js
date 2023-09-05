/**
 * Created by Allen Liu on 2022/3/4.
 */
console.log(process.pid);
setTimeout(()=>{
  process.exit(process.pid)
  // process.kill(process.pid)
},3000)
