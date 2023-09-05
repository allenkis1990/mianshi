/**
 * Created by Allen Liu on 2023/3/24.
 */
let workerUrlBase = location.protocol + "//" + location.host;
addEventListener('message', function (e) {
  self.token = e.data.token
  self.pathApi = e.data.pathApi
  let course_arrangement_id = e.data.course_arrangement_id
  let class_id = e.data.class_id
  importScripts(
      `${workerUrlBase}/static/worker/assets/http.js`
  );
  function renewOnline(){
    let params = {
      course_arrangement_id,
      class_id
    }
    httpPostNew(`virtual-classroom/renew-online`,params).then((res) => {
      let {error_code, data} = res
      if (!error_code) {
        if(data){
          let {inclass_task_id,not_done_flag,gold_of_lesson_student} = data
          postMessage({
            inclass_task_id,not_done_flag,gold_of_lesson_student
          })
        }else{
          postMessage({
            inclass_task_id:null,not_done_flag:null,gold_of_lesson_student:null
          })
        }
      }
    })
  }
  renewOnline()
  setInterval(()=>{
    renewOnline()
  },3000)
}, false);

