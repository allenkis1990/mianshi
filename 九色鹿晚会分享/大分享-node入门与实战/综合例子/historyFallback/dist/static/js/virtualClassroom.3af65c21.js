(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["virtualClassroom"],{4183:function(e,t,i){e.exports=i.p+"static/img/empty-img.f9c4384a.png"},"647b":function(e,t,i){"use strict";var n=i("cd20"),o=i.n(n);o.a},cd20:function(e,t,i){},ea49:function(e,t,i){e.exports=i.p+"static/img/v-logo.7c7ecbc2.png"},f19d:function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"virtualClassroom"},[n("div",{staticClass:"v-header"},[e._m(0),n("div",{staticClass:"v-title"},[e._v(e._s(e.$route.query.course_name)+" - "+e._s(e.$route.query.arrangement_name))]),n("div",{staticClass:"user-box"},[n("img",{attrs:{src:e.homeData.student_head_url,alt:""}}),n("div",{staticClass:"user-box-right"},[n("div",{staticClass:"user-name"},[e._v(e._s(e.homeData.student_name))]),n("div",{staticClass:"coin-box"},[n("div",{staticClass:"coin"}),n("div",{staticClass:"coin-count"},[e._v(e._s(e.homeData.gold_of_lesson))])])])])]),n("div",{staticClass:"v-main"},[n("div",{staticClass:"exam-main"},[e.componentShow?n(e.currentQuestionItem.questionComponent,{ref:"questionItem",tag:"component",attrs:{bus:e.$bus,urlQuery:e.getUrlQuery(e.currentQuestionItem),isEnterCodeByInit:!0,questionInfo:e.currentQuestionItem,inclass_task_record_id:e.inclass_task_record_id},on:{getIsAnswered:e.getIsAnswered,closeAndSave:e.submit,saveCodeOnly:e.saveCodeOnly}}):e._e(),e.currentQuestionItem.question_type&&!e.isExistQuestionComponent?n("div",{staticClass:"empty-box"},[n("img",{attrs:{src:i("4183"),alt:""}}),n("p",{staticClass:"empty-txt"},[e._v(e._s(e.currentQuestionItem.question_type_str?e.currentQuestionItem.question_type_str:"当前题型")+"还未适配")])]):e._e()],1)]),n("div",{staticClass:"v-footer"},[16!=e.currentQuestionItem.question_type?n("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"submit-btn",class:{disabled:!e.isAnswered&&e.isExistQuestionComponent},on:{click:e.submit}},[e._v("提交")]):e._e()]),n("vir-dialog",{attrs:{visible:e.dialogData.visible,dialogData:e.dialogData},on:{"update:visible":function(t){return e.$set(e.dialogData,"visible",t)},animationEnd:e.animationEnd}}),n("code-checking",{attrs:{visible:e.checkingCodeDialog.visible},on:{"update:visible":function(t){return e.$set(e.checkingCodeDialog,"visible",t)}}}),n("lock-dialog",{attrs:{visible:e.lockDialog.visible},on:{"update:visible":function(t){return e.$set(e.lockDialog,"visible",t)}}})],1)},o=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"v-logo"},[n("img",{attrs:{src:i("ea49"),alt:""}})])}],s=(i("ac6a"),i("456d"),i("cebc")),a=i("2f62"),_=function(e){var t=e||1440,i=100,n=document.documentElement.clientWidth||document.body.clientWidth,o=document.getElementsByTagName("html")[0],s=n-50;o.style.fontSize=s/t*i+"px"},r=i("c114"),l=i("cbbf"),c={1:"Question_SingleChoice",2:"Question_MultipleChoice",3:"Question_SingleChoice",7:"Question_BriefAnswer",16:"Question_Programming",11:"Question_Reading",4:"Question_FillBlank"},u=function(){var e=this,t=e.$createElement,i=e._self._c||t;return e.visible?i("div",{staticClass:"vir-dialog"},[i("div",{staticClass:"dialog-mask"}),i("div",{staticClass:"dialog-main"},[i("div",{staticClass:"dialog-msg",class:[e.dialogData.icoType]},[i("div",{staticClass:"msg-ico"}),i("div",{staticClass:"msg"},[e._v(e._s(e.dialogData.msg))])]),e.dialogData.subMsg?i("div",{staticClass:"dialog-msg-sub"},[e._v(e._s(e.dialogData.subMsg))]):e._e(),"wrong"!==e.dialogData.icoType&&e.dialogData.gold?i("div",{staticClass:"gold-main"},[i("div",{staticClass:"gold"},[e.dialogData.showGoldAnimation?i("div",{staticClass:"gold-child"}):e._e()]),i("div",{staticClass:"gold-num"},[e._v("+"+e._s(e.dialogData.gold))])]):e._e()])]):e._e()},d=[],m={props:{visible:{type:Boolean,default:!1},dialogData:{type:Object,default:function(){return{}}}},mounted:function(){},data:function(){return{}},watch:{visible:{handler:function(e,t){var i=this,n=this;e&&(this.$nextTick(function(){n.setGoldAnimationEndListener()}),setTimeout(function(){i.close()},3e3))},immediate:!0}},computed:{},methods:{close:function(){this.$emit("update:visible",!1)},setGoldAnimationEndListener:function(){var e=this,t=e.dialogData.showGoldAnimation,i=document.querySelector(".gold-child");t&&i&&(i.removeEventListener("webkitAnimationEnd",e.animationEnd),i.addEventListener("webkitAnimationEnd",e.animationEnd))},animationEnd:function(){console.log(this,33333),this.$emit("animationEnd")}}},p=m,h=i("2877"),g=Object(h["a"])(p,u,d,!1,null,"68eefd18",null),f=g.exports,y=function(){var e=this,t=e.$createElement,i=e._self._c||t;return e.visible?i("div",{staticClass:"code-checking"},[i("div",{staticClass:"dialog-main"},[e._v(e._s(e.visible))]),i("div",{staticClass:"dialog-mask"})]):e._e()},b=[],v={props:{visible:{type:Boolean,default:!1},dialogData:{type:Object,default:function(){return{}}}},mounted:function(){},data:function(){return{}},watch:{visible:{handler:function(e,t){},immediate:!0}},computed:{},methods:{}},w=v,x=Object(h["a"])(w,y,b,!1,null,"0f055304",null),k=x.exports,q=function(){var e=this,t=e.$createElement,i=e._self._c||t;return e.visible?i("div",{staticClass:"lock-dialog"},[i("div",{staticClass:"dialog-mask"}),e._m(0)]):e._e()},I=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"dialog-main"},[e._v("\n    上课中"),i("br"),e._v("请认真听讲\n  ")])}],E={props:{visible:{type:Boolean,default:!1},dialogData:{type:Object,default:function(){return{}}}},mounted:function(){},data:function(){return{}},watch:{visible:{handler:function(e,t){},immediate:!0}},computed:{},methods:{}},Q=E,D=Object(h["a"])(Q,q,I,!1,null,"c9c72e70",null),j=D.exports,C={data:function(){return{url:"http://localhost:8601/?token=01e8053b6bc764a5dbcc1688884f3004nwvpb0je&codeUrl=https://dev-media.thedeer.cn/code/0b50429be2cf6d702fcccedf1bb53275ii0788r1fgdi7dzo.sb3&tmplUrl=https://dev-media.thedeer.cn/code/0b50429be2cf6d702fcccedf1bb53275ii0788r1fgdi7dzo.sb3&practiceId=148&practiceName=Scratch作品&scene=startCode&editorMode=editPractice&userId=85&isExam=1&examType=2",question_list:[],currentQuestionIndex:0,currentQuestionItem:{},componentShow:!0,isAnswered:!1,begin_time_long_sec:0,end_time_long_sec:0,homeData:{},currentQuestionIndexKey:"",examination_paper:{},inclass_task_record_id:"",loading:!1,waiting:!1,dialogData:{visible:!1},lockDialog:{visible:!1},checkingCodeDialog:{},worker:null,not_done_flag:null,gold_of_lesson_student:null,inclass_task_id:null,tempGoldOfLesson:0,hasNoExistQuestionType:!1,submitTaskInterval:null,nextQuestionDoInterval:null}},methods:Object(s["a"])({},Object(a["b"])("virtualClassroom",["homeDataActions","enterInclassTaskActions","checkAnswerActions","submitTaskActions","resendActions","submitTaskForAllActions","autoSaveActions"]),{getUrlQuery:function(e){var t="canEdit=1",i="token=".concat(this.info.token,"&tmplUrl=").concat(e.template_file_full_url,"&isExam=1&examType=2&questionId=").concat(e.question_id,"&").concat(t);return i},getIfHasNoExistQuestionType:function(e){for(var t=Object.keys(c),i=!1,n=0;n<e.length;n++){var o=e[n];if(i=t.indexOf(o.question_type)<0,i)break}return i},animationEnd:function(){this.homeData.gold_of_lesson=this.tempGoldOfLesson,this.tempGoldOfLesson=0},resend:function(){var e=this;this.submitTaskForAllActions().then(function(){e.resendActions()})},isCorrect:function(e){var t="1"===e.is_correct;return t},getEnterInclassTask:function(e){var t=this,i=this,n={inclass_task_id:i.homeData.inclass_task_id};this.enterInclassTaskActions(n).then(function(i){var n=i.error_code,o=i.data;o=o||{};var s=o,a=s.examination_paper,_=s.student_answer_map,r=s.inclass_task_record_id,c=s.need_reset;if(!n){e&&e(),t.inclass_task_record_id=r,t.examination_paper=a;var u=a.question_list;u=[{question_type_str:"填空题",data_mode:1,correct_judge:"",is_auto_check:"",content:'[{"<>":"p","html":[{"<>":"span","style":"","text":"六年级数学课程特色是： "},{"<>":"span","style":"display:inline-block; line-height:1.2; text-align:center; padding:0 1.5em; border:0; border-bottom: 1px solid #000; color:#E6A23C;","html":[{"<>":"span","text":"①"},{"<>":"span","style":""}],"data_key":"fill-blank-6281256","class":"fill-blank"},{"<>":"span","style":""},{"<>":"span","style":"","text":"学习，循环巩固； "},{"<>":"span","style":"display:inline-block; line-height:1.2; text-align:center; padding:0 1.5em; border:0; border-bottom: 1px solid #000; color:#E6A23C;","html":[{"<>":"span","text":"②"},{"<>":"span","style":""}],"data_key":"fill-blank-11845542","class":"fill-blank"},{"<>":"span","style":""},{"<>":"span","style":"","text":"教学，因材施教；精选精讲， "},{"<>":"span","style":"display:inline-block; line-height:1.2; text-align:center; padding:0 1.5em; border:0; border-bottom: 1px solid #000; color:#E6A23C;","html":[{"<>":"span","text":"③"},{"<>":"span","style":""}],"data_key":"fill-blank-95523722","class":"fill-blank"},{"<>":"span","style":""},{"<>":"span","style":"","html":[{"<>":"font","text":"练习； "},{"<>":"span","style":"display:inline-block; line-height:1.2; text-align:center; padding:0 1.5em; border:0; border-bottom: 1px solid #000; color:#E6A23C;","html":[{"<>":"span","text":"④"}],"data_key":"fill-blank-5441657","class":"fill-blank"},{"<>":"font","text":"进阶，循环巩固。"}]},{"<>":"span","style":""}]}]',correct_subjective_answer:"",auto_check:!0,options_data:[],score:"2.00",sub_questions:[],style_type:"",template_file_full_url:"",question_name:"六年级数学课程特色是： ①学习，循环巩固； ②教学，因材施教；精选精讲， ③练习； ④进阶，循环巩固。",correct_rate:"",knowledge_name:"中学",page_location_list:[],code_type:0,difficulty_level:"1",question_index:"",correct_single_index:0,question_type:"4",media_resources:[],analysis:'[{"<>":"p","html":[{"<>":"br"}]}]',question_id:"2433",difficulty_level_str:"简单",update_date:"2019-12-18 19:18:05",exam_options_data:[],exam_link_answer_data:[],reference_file_full_url:"",correct_multiple_index_set:[],hint:"Read and write.（填空题）",knowledge_id:"193"},{question_type_str:"简答题",data_mode:1,correct_judge:"",is_auto_check:"",content:'[{"<>":"p","html":[{"<>":"img","src":"https://dev-resource.thedeer.cn/pre/resource-testing/image/189cf50d746bb69d3337f5b0787a3febcmizk0vlpx5fdfh6.jpg","base_src":"resource-testing/image/189cf50d746bb69d3337f5b0787a3febcmizk0vlpx5fdfh6.jpg","width":"1800"}]},{"<>":"p","text":"Hello, I\'m_________"},{"<>":"p","text":"I_________on Mondays, I________on Tuesdays,"},{"<>":"p","text":"I_________on Wednesdays, I_____ on Thursdays,"},{"<>":"p","html":[{"<>":"span","text":"I_________"},{"<>":"span","style":"","text":"on Fridays, I ____on Saturdays,"}]},{"<>":"p","text":"I____ on Sundays."},{"<>":"p","html":[{"<>":"br"}]}]',correct_subjective_answer:"",auto_check:!1,options_data:[],score:"5.00",sub_questions:[],style_type:"BRIEF",template_file_full_url:"",question_name:"Hello, I'm_________I_________on Mondays, I________on Tuesdays,I_________on Wednesdays, I_____ on Thursdays,I_________on Fridays, I ____on Saturdays,I____ on Sundays.",correct_rate:"",knowledge_name:"",page_location_list:[],code_type:0,difficulty_level:"1",question_index:"",correct_single_index:0,question_type:"7",media_resources:[],analysis:"",question_id:"3104",difficulty_level_str:"简单",update_date:"2020-06-17 16:20:30",exam_options_data:[],exam_link_answer_data:[],reference_file_full_url:"",correct_multiple_index_set:[],hint:"主观题",knowledge_id:""},{question_type_str:"阅读理解题",data_mode:1,correct_judge:"",is_auto_check:"",content:'[{"<>":"p","text":"      There is no denying that students should learn something about how computers work, just as we expect them at least to understand that the internal-combustion engine (内燃机) has something to do with burning fuel, expanding gases and pistons  (活塞) being driven. For people should have some basic idea of how the things that they use do what they do. Further, students might be helped by a course that considers the computer’s impact on society. But that is not what is meant by computer literacy. For computer literacy is not a form of literacy (读写能力); it is a trade skill that should not be taught as a liberal art."},{"<>":"p","text":"     Learning how to use a computer and learning how to program one are two distinct activities. A case might be made that the competent citizens of tomorrow should free themselves from their fear of computers. But this is quite different from saying that all ought to know how to program one. Leave that to people who have chosen programming as a career. While programming can be lots of fun, and while our society needs some people who are experts at it, the same is true of auto repair and violin-making."},{"<>":"p","text":"      Learning how to use a computer is not that difficu1t, and it gets easier all the time as programs become more “user-friendly”. Let us assume that in the future everyone is going to have to know how to use a computer to be a competent citizen. What does the phrase “learning to use a computer” mean? It sounds like “learning to drive a car”, that is, it sounds as if there is some set of definite skills that, once acquired, enable one to use a computer."},{"<>":"p","text":"In fact, “learning to use a computer” is much more like “learning to play a game”, but learning the rules of one game may not he1p you play a second game, whose rules may not be the same. There is no such a thing as teaching someone how to use a computer. One can only teach people to use this or that program and generally that is easily accomplished."},{"<>":"p","html":[{"<>":"br"}]}]',correct_subjective_answer:"",auto_check:!0,options_data:[],score:"5.00",sub_questions:[{question_type_str:"单选题",data_mode:2,correct_judge:"",is_auto_check:"",content:"To be the competent citizens of tomorrow, people should _____________.",correct_subjective_answer:"",auto_check:!0,options_data:[{file_url:"",content_type:1,file_type:0,name:"",id:0,thumbnail_url:"",option_content:" try to lay a solid foundation in computer science"},{file_url:"",content_type:1,file_type:0,name:"",id:0,thumbnail_url:"",option_content:" be aware of how the things that they use do what they do"},{file_url:"",content_type:1,file_type:0,name:"",id:0,thumbnail_url:"",option_content:" learn to use a computer by acquiring a certain set of skills"},{file_url:"",content_type:1,file_type:0,name:"",id:0,thumbnail_url:"",option_content:"understand that programming a computer is more essential than repairing a car"}],score:"100",sub_questions:[],style_type:"",template_file_full_url:"",question_name:"To be the competent citizens of tomorrow, people should _____________.",correct_rate:"",knowledge_name:"",page_location_list:[],code_type:0,difficulty_level:"0",question_index:"",correct_single_index:0,question_type:"1",media_resources:[],analysis:"",question_id:"13118",difficulty_level_str:"未知",update_date:"",exam_options_data:[{data:{file_url:"",content_type:1,file_type:0,name:"",id:0,thumbnail_url:"",option_content:" try to lay a solid foundation in computer science"},index:1},{data:{file_url:"",content_type:1,file_type:0,name:"",id:0,thumbnail_url:"",option_content:" be aware of how the things that they use do what they do"},index:2},{data:{file_url:"",content_type:1,file_type:0,name:"",id:0,thumbnail_url:"",option_content:" learn to use a computer by acquiring a certain set of skills"},index:3},{data:{file_url:"",content_type:1,file_type:0,name:"",id:0,thumbnail_url:"",option_content:"understand that programming a computer is more essential than repairing a car"},index:4}],exam_link_answer_data:[],reference_file_full_url:"",correct_multiple_index_set:[],hint:"",knowledge_id:""},{question_type_str:"单选题",data_mode:2,correct_judge:"",is_auto_check:"",content:"In the second paragraph “violin-making” is mentioned to show that_____________.",correct_subjective_answer:"",auto_check:!0,options_data:[{file_url:"",content_type:1,file_type:0,name:"",id:0,thumbnail_url:"",option_content:"programming a computer is as interesting as making a violin"},{file_url:"",content_type:1,file_type:0,name:"",id:0,thumbnail_url:"",option_content:"our society needs experts in different fields"},{file_url:"",content_type:1,file_type:0,name:"",id:0,thumbnail_url:"",option_content:"violin-making requires as much skill as computer programming"},{file_url:"",content_type:1,file_type:0,name:"",id:0,thumbnail_url:"",option_content:"people who can use a computer don't necessarily have to know computer programming"}],score:"100",sub_questions:[],style_type:"",template_file_full_url:"",question_name:"In the second paragraph “violin-making” is mentioned to show that_____________.",correct_rate:"",knowledge_name:"",page_location_list:[],code_type:0,difficulty_level:"0",question_index:"",correct_single_index:0,question_type:"1",media_resources:[],analysis:"",question_id:"13119",difficulty_level_str:"未知",update_date:"",exam_options_data:[{data:{file_url:"",content_type:1,file_type:0,name:"",id:0,thumbnail_url:"",option_content:"programming a computer is as interesting as making a violin"},index:1},{data:{file_url:"",content_type:1,file_type:0,name:"",id:0,thumbnail_url:"",option_content:"our society needs experts in different fields"},index:2},{data:{file_url:"",content_type:1,file_type:0,name:"",id:0,thumbnail_url:"",option_content:"violin-making requires as much skill as computer programming"},index:3},{data:{file_url:"",content_type:1,file_type:0,name:"",id:0,thumbnail_url:"",option_content:"people who can use a computer don't necessarily have to know computer programming"},index:4}],exam_link_answer_data:[],reference_file_full_url:"",correct_multiple_index_set:[],hint:"",knowledge_id:""}],style_type:"READ_R",template_file_full_url:"",question_name:"      There is no denying that students should learn something about how computers work, just as we expect them at least to understand that the internal-combustion engine (内燃机) has something to do with burning fuel, expanding gases and pistons  (活塞) being driven. For people should have some basic idea of how the things that they use do what they do. Further, students might be helped by a course that considers the computer’s impact on society. But that is not what is meant by computer literacy. For computer literacy is not a form of literacy (读写能力); it is a trade skill that should not be taught as a liberal art.     Learning how to use a computer and learning how to program one are two distinct activities. A case might be made that the competent citizens of tomorrow should free themselves from their fear of computers. But this is quite different from saying that all ought to know how to program one. Leave that to people who have chosen programming as a career. While programming can be lots of fun, and while our society needs some people who are experts at it, the same is true of auto repair and violin-making.      Learning how to use a computer is not that difficu1t, and it gets easier all the time as programs become more “user-friendly”. Let us assume that in the future everyone is going to have to know how to use a computer to be a competent citizen. What does the phrase “learning to use a computer” mean? It sounds like “learning to drive a car”, that is, it sounds as if there is some set of definite skills that, once acquired, enable one to use a computer.In fact, “learning to use a computer” is much more like “learning to play a game”, but learning the rules of one game may not he1p you play a second game, whose rules may not be the same. There is no such a thing as teaching someone how to use a computer. One can only teach people to use this or that program and generally that is easily accomplished.",correct_rate:"",knowledge_name:"",page_location_list:[],code_type:0,difficulty_level:"2",question_index:"",correct_single_index:0,question_type:"11",media_resources:[],analysis:"",question_id:"13123",difficulty_level_str:"困难",update_date:"",exam_options_data:[],exam_link_answer_data:[],reference_file_full_url:"",correct_multiple_index_set:[],hint:"Reading.B",knowledge_id:""},{question_type_str:"多选题",data_mode:1,correct_judge:"",is_auto_check:"",content:'[{"<>":"p","text":"如果角色想在舞台上呈现多种时尚穿戴，应该使用以下哪种积 木？"}]',correct_subjective_answer:"",auto_check:!0,options_data:[{file_url:"https://dev-resource.thedeer.cn/pre/resource-media/image/4aa9ef2cc18fbaa10bd7260598c47a03x9x34xv4b0rg2zjv.png-quality_80",content_type:2,file_type:1,name:"01",id:3450,thumbnail_url:"",option_content:"3450"},{file_url:"https://dev-resource.thedeer.cn/pre/resource-media/image/683cfb2ce022c4fc1b7c12d8ecf045e8bn5n4y03uobvtg7d.png-quality_80",content_type:2,file_type:1,name:"02",id:3451,thumbnail_url:"",option_content:"3451"},{file_url:"https://dev-resource.thedeer.cn/pre/resource-media/image/7413e421584f4c14eafb3d9ffed29fdbz0ovou38mhw6oeww.png-quality_80",content_type:2,file_type:1,name:"03",id:3452,thumbnail_url:"",option_content:"3452"},{file_url:"https://dev-resource.thedeer.cn/pre/resource-media/image/a8d3af78518632174fb853544d36672cn4g1bnsuzrsuke1d.png-quality_80",content_type:2,file_type:1,name:"04",id:3453,thumbnail_url:"",option_content:"3453"}],score:"8.00",sub_questions:[],style_type:"SELECT_R-P",template_file_full_url:"",question_name:"如果角色想在舞台上呈现多种时尚穿戴，应该使用以下哪种积 木？",correct_rate:"",knowledge_name:"",page_location_list:[],code_type:0,difficulty_level:"1",question_index:"",correct_single_index:0,question_type:"2",media_resources:[],analysis:"",question_id:"12919",difficulty_level_str:"简单",update_date:"2022-05-19 11:37:23",exam_options_data:[{data:{file_url:"https://dev-resource.thedeer.cn/pre/resource-media/image/4aa9ef2cc18fbaa10bd7260598c47a03x9x34xv4b0rg2zjv.png-quality_80",content_type:2,file_type:1,name:"01",id:3450,thumbnail_url:"",option_content:"3450"},index:1},{data:{file_url:"https://dev-resource.thedeer.cn/pre/resource-media/image/683cfb2ce022c4fc1b7c12d8ecf045e8bn5n4y03uobvtg7d.png-quality_80",content_type:2,file_type:1,name:"02",id:3451,thumbnail_url:"",option_content:"3451"},index:2},{data:{file_url:"https://dev-resource.thedeer.cn/pre/resource-media/image/7413e421584f4c14eafb3d9ffed29fdbz0ovou38mhw6oeww.png-quality_80",content_type:2,file_type:1,name:"03",id:3452,thumbnail_url:"",option_content:"3452"},index:3},{data:{file_url:"https://dev-resource.thedeer.cn/pre/resource-media/image/a8d3af78518632174fb853544d36672cn4g1bnsuzrsuke1d.png-quality_80",content_type:2,file_type:1,name:"04",id:3453,thumbnail_url:"",option_content:"3453"},index:4}],exam_link_answer_data:[],reference_file_full_url:"",correct_multiple_index_set:[],hint:"根据题目要求作答",knowledge_id:""},{question_type_str:"单选题",data_mode:1,correct_judge:"",is_auto_check:"",content:'[{"<>":"p","text":"He arrived here ________. The teacher felt ________."}]',correct_subjective_answer:"",auto_check:!0,options_data:[{file_url:"",content_type:1,file_type:0,name:"",id:0,thumbnail_url:"",option_content:"late, angry"},{file_url:"",content_type:1,file_type:0,name:"",id:0,thumbnail_url:"",option_content:"lately, angrily"},{file_url:"",content_type:1,file_type:0,name:"",id:0,thumbnail_url:"",option_content:" late, angrily"},{file_url:"",content_type:1,file_type:0,name:"",id:0,thumbnail_url:"",option_content:"lately, angry"}],score:"1.00",sub_questions:[],style_type:"SELECT_R-T",template_file_full_url:"",question_name:"He arrived here ________. The teacher felt ________.",correct_rate:"",knowledge_name:"词汇",page_location_list:[],code_type:0,difficulty_level:"1",question_index:"",correct_single_index:0,question_type:"1",media_resources:[],analysis:"",question_id:"13091",difficulty_level_str:"简单",update_date:"",exam_options_data:[{data:{file_url:"",content_type:1,file_type:0,name:"",id:0,thumbnail_url:"",option_content:"late, angry"},index:1},{data:{file_url:"",content_type:1,file_type:0,name:"",id:0,thumbnail_url:"",option_content:"lately, angrily"},index:2},{data:{file_url:"",content_type:1,file_type:0,name:"",id:0,thumbnail_url:"",option_content:" late, angrily"},index:3},{data:{file_url:"",content_type:1,file_type:0,name:"",id:0,thumbnail_url:"",option_content:"lately, angry"},index:4}],exam_link_answer_data:[],reference_file_full_url:"",correct_multiple_index_set:[],hint:"Multiple choice.1",knowledge_id:"2"},{question_type_str:"单选题",data_mode:1,correct_judge:"",is_auto_check:"",content:'[{"<>":"p","text":"Your brother is very noisy. Please tell him _________ in the library."}]',correct_subjective_answer:"",auto_check:!0,options_data:[{file_url:"",content_type:1,file_type:0,name:"",id:0,thumbnail_url:"",option_content:"not talk loudly"},{file_url:"",content_type:1,file_type:0,name:"",id:0,thumbnail_url:"",option_content:" talk loudly"},{file_url:"",content_type:1,file_type:0,name:"",id:0,thumbnail_url:"",option_content:" to talk loudly"},{file_url:"",content_type:1,file_type:0,name:"",id:0,thumbnail_url:"",option_content:"not to talk loudly"}],score:"1.00",sub_questions:[],style_type:"SELECT_R-T",template_file_full_url:"",question_name:"Your brother is very noisy. Please tell him _________ in the library.",correct_rate:"",knowledge_name:"",page_location_list:[],code_type:0,difficulty_level:"2",question_index:"",correct_single_index:0,question_type:"1",media_resources:[],analysis:"",question_id:"13092",difficulty_level_str:"困难",update_date:"",exam_options_data:[{data:{file_url:"",content_type:1,file_type:0,name:"",id:0,thumbnail_url:"",option_content:"not talk loudly"},index:1},{data:{file_url:"",content_type:1,file_type:0,name:"",id:0,thumbnail_url:"",option_content:" talk loudly"},index:2},{data:{file_url:"",content_type:1,file_type:0,name:"",id:0,thumbnail_url:"",option_content:" to talk loudly"},index:3},{data:{file_url:"",content_type:1,file_type:0,name:"",id:0,thumbnail_url:"",option_content:"not to talk loudly"},index:4}],exam_link_answer_data:[],reference_file_full_url:"",correct_multiple_index_set:[],hint:"Multiple choice.2",knowledge_id:""},{question_type_str:"编程题",data_mode:1,correct_judge:"",is_auto_check:"",content:'[{"<>":"p","text":"1、准备工作"},{"<>":"p","text":" (1) 选择背景 Desert,Galaxy；"},{"<>":"p","text":" (2) 选择角色 Rocketship。"},{"<>":"p","text":" 2、功能实现"},{"<>":"p","text":" (1)火箭初始造型为 rocketship-a,初始位置为舞台下端，初始背景为 Dessert；"},{"<>":"p","text":" (2)点击绿旗，火箭垂直向上移动，一直移动到舞台顶端，并在移动过 程中切换造型；"},{"<>":"p","text":" (3)当火箭达到舞台顶端时，背景切换为 Galaxy；"},{"<>":"p","html":[{"<>":"span","style":"","text":" (4)火箭最后移到舞台下端的位置（初始位置），造型不限。"}]},{"<>":"p","html":[{"<>":"span","style":"","html":[{"<>":"img","src":"https://dev-resource.thedeer.cn/pre/resource-testing/image/3ae47ad6586554f0cd57b4858b800034qve9a1g4zs6twrc5.jpg","width":"89","height":"89","base_src":"resource-testing/image/3ae47ad6586554f0cd57b4858b800034qve9a1g4zs6twrc5.jpg"}]}]}]',correct_subjective_answer:"",auto_check:!1,options_data:[],score:"30.00",sub_questions:[],style_type:"CODING",template_file_full_url:"https://dev-resource.thedeer.cn/pre/resource-testing/coding/d489ef8637c0198c9905b9628536ef875jsskgofnaulimvh.sb3",question_name:"1、准备工作 (1) 选择背景 Desert,Galaxy； (2) 选择角色 Rocketship。 2、功能实现 (1)火箭初始造型为 rocketship-a,初始位置为舞台下端，初始背景为 Dessert； (2)点击绿旗，火箭垂直向上移动，一直移动到舞台顶端，并在移动过 程中切换造型； (3)当火箭达到舞台顶端时，背景切换为 Galaxy； (4)火箭最后移到舞台下端的位置（初始位置），造型不限。",correct_rate:"",knowledge_name:"",page_location_list:[],code_type:1,difficulty_level:"2",question_index:"",correct_single_index:0,question_type:"16",media_resources:[],analysis:"",question_id:"12918",difficulty_level_str:"困难",update_date:"2023-05-13 10:09:59",exam_options_data:[],exam_link_answer_data:[],reference_file_full_url:"",correct_multiple_index_set:[],hint:"飞向太空",knowledge_id:""},{question_type_str:"判断题",data_mode:1,correct_judge:"",is_auto_check:"",content:'[{"<>":"p","html":[{"<>":"img","src":"https://dev-resource.thedeer.cn/pre/resource-testing/image/7677e1e508a1e20a64e43e70dc2bbca24fp612otogstv5zx.png","alt":"image.png","title":"","base_src":"resource-testing/image/7677e1e508a1e20a64e43e70dc2bbca24fp612otogstv5zx.png"}]},{"<>":"p","text":"运行以下代码后，可以观察到角色在舞台上右转 4 次正好一圈。"}]',correct_subjective_answer:"",auto_check:!0,options_data:[],score:"6.00",sub_questions:[],style_type:"JUDGE_R",template_file_full_url:"",question_name:"运行以下代码后，可以观察到角色在舞台上右转 4 次正好一圈。",correct_rate:"",knowledge_name:"",page_location_list:[],code_type:0,difficulty_level:"2",question_index:"",correct_single_index:0,question_type:"3",media_resources:[],analysis:"",question_id:"12917",difficulty_level_str:"困难",update_date:"2022-05-19 11:34:35",exam_options_data:[],exam_link_answer_data:[],reference_file_full_url:"",correct_multiple_index_set:[],hint:"判断以下说法是否正确",knowledge_id:""}],_={12918:{answer_use_time:0,scratch_answer_json:"",question_type:0,code_file_oss_temp_path:"coding_temp/20230726/983f527ba282f8dd4f475bd8930a71d8av48t9vp2nifa492.sb3",multiple_index_set:[],single_index:0,judge:!1,question_id:12918,is_correct:"",gap_data:[],subjective_answer:"",oss_temp_url:"https://zykj-resource-repository-dev.oss-cn-hangzhou.aliyuncs.com/coding_temp/20230726/983f527ba282f8dd4f475bd8930a71d8av48t9vp2nifa492.sb3"},2433:{answer_use_time:0,scratch_answer_json:"",question_type:0,code_file_oss_temp_path:"",multiple_index_set:[],single_index:0,judge:!1,question_id:2433,is_correct:"",gap_data:["","","121212121212121121212121212",""],subjective_answer:"",oss_temp_url:""},3104:{answer_use_time:0,scratch_answer_json:"",question_type:0,code_file_oss_temp_path:"",multiple_index_set:[],single_index:0,judge:!1,question_id:3104,is_correct:"",gap_data:[],subjective_answer:"66666666666",oss_temp_url:""},12919:{answer_use_time:0,scratch_answer_json:"",question_type:0,code_file_oss_temp_path:"",multiple_index_set:[1,2,3],single_index:0,judge:!1,question_id:12919,is_correct:"",gap_data:[],subjective_answer:"",oss_temp_url:""},13091:{answer_use_time:0,scratch_answer_json:"",question_type:0,code_file_oss_temp_path:"",multiple_index_set:[],single_index:1,judge:!1,question_id:13091,is_correct:"",gap_data:[],subjective_answer:"",oss_temp_url:""},13092:{answer_use_time:0,scratch_answer_json:"",question_type:0,code_file_oss_temp_path:"",multiple_index_set:[],single_index:4,judge:!1,question_id:13092,is_correct:"",gap_data:[],subjective_answer:"",oss_temp_url:""},12917:{answer_use_time:0,scratch_answer_json:"",question_type:0,code_file_oss_temp_path:"",multiple_index_set:[],single_index:0,judge:!1,question_id:12917,is_correct:"",gap_data:[],subjective_answer:"",oss_temp_url:""},13118:{answer_use_time:0,scratch_answer_json:"",question_type:0,code_file_oss_temp_path:"",multiple_index_set:[],single_index:3,judge:!1,question_id:13118,is_correct:"",gap_data:[],subjective_answer:"",oss_temp_url:""},13119:{answer_use_time:0,scratch_answer_json:"",question_type:0,code_file_oss_temp_path:"",multiple_index_set:[],single_index:1,judge:!1,question_id:13119,is_correct:"",gap_data:[],subjective_answer:"",oss_temp_url:""}},t.parseQuestionListItem("exam",u,_),t.question_list=u,t.hasNoExistQuestionType=t.getIfHasNoExistQuestionType(u),console.log(t.hasNoExistQuestionType,"是否有未配置的题型"),t.currentQuestionIndex=l["a"].cookieUtils.getItem(t.currentQuestionIndexKey,!0)||0,t.currentQuestionIndex&&c&&(l["a"].cookieUtils.removeItem(t.currentQuestionIndexKey),t.currentQuestionIndex=0),t.getCurrentQuestionItem()}})},getHomeData:function(){var e=this,t=this.$route.query.arrangement_id,i=this.$route.query.class_id,n={course_arrangement_id:t,class_id:i};this.homeDataActions(n).then(function(t){var i=t.error_code,n=t.data;i||(e.homeData=n,e.currentQuestionIndexKey="currentQuestionIndex-".concat(e.homeData.student_id,"-").concat(e.homeData.inclass_task_id),e.getEnterInclassTask())})},setRootFontSize:function(){_(),document.body.style.fontSize="14px"},getCurrentQuestionItem:function(){this.currentQuestionItem=this.question_list[this.currentQuestionIndex],this.begin_time_long_sec=Math.ceil((new Date).getTime()/1e3)},saveCodeOnly:function(){var e=this,t=this,i=this.$refs.questionItem,n=i.getAnswer(),o=Object(s["a"])({question_id:t.currentQuestionItem.question_id,question_type:t.currentQuestionItem.question_type},n),a={inclass_task_record_id:t.inclass_task_record_id,question_answer:o};console.log(a,"autoSaveActions"),this.autoSaveActions(a).then(function(t){e.loading=!1;t.error_code,t.data})},submit:function(){var e=this;if(!e.loading&&!e.waiting)if(this.isExistQuestionComponent){var t=this.$refs.questionItem,i=t.isAnswered();if(i){var n=t.getAnswer(),o=Object(s["a"])({question_id:e.currentQuestionItem.question_id,question_type:e.currentQuestionItem.question_type},n);console.log(o,33333333),this.submitQuestion(o)}}else this.submitNotExist()},submitNotExist:function(){this.currentQuestionIndex===this.question_list.length-1?this.$message.warning("存在未适配的题型，无法提交"):(this.loading=!0,this.waiting=!0,this.nextQuestionDo())},getIsAnswered:function(e){this.isAnswered=e},checkAnswer:function(e,t){var i=this;return new Promise(function(t,n){var o={inclass_task_record_id:i.inclass_task_record_id,begin_time_long_sec:i.begin_time_long_sec,end_time_long_sec:i.end_time_long_sec,question_answer:e};console.log(o),i.loading=!0,i.waiting=!0,16==e.question_type&&(i.checkingCodeDialog.visible=!0),i.checkAnswerActions(o).then(function(e){i.loading=!1,i.checkingCodeDialog.visible=!1;var o=e.error_code,s=e.data;if(o)n();else{var a=s.check_answer_result,_=s.gold_reward,r=s.gold_total,l=i.isCorrect(a);if(l)16==i.currentQuestionItem.question_type?i.homeData.gold_of_lesson=r:i.tempGoldOfLesson=r,i.dialogData={visible:!0,msg:"恭喜，答对啦！",gold:_,icoType:"right",showGoldAnimation:16!=i.currentQuestionItem.question_type};else{var c=16==i.currentQuestionItem.question_type?"发现问题！":"很遗憾，答错了~",u=16==i.currentQuestionItem.question_type?"请检查修正后再提交~！":"";i.dialogData={visible:!0,msg:c,subMsg:u,icoType:"wrong"}}t(l)}},function(){i.loading=!1,i.waiting=!1,i.checkingCodeDialog.visible=!1,n()})})},submitQuestion:function(e){var t=this,i=this;this.end_time_long_sec=Math.ceil((new Date).getTime()/1e3),console.log(this.begin_time_long_sec,this.end_time_long_sec,"耗时:".concat(this.end_time_long_sec-this.begin_time_long_sec)),this.checkAnswer(e).then(function(e){16!=i.currentQuestionItem.question_type||e||(i.begin_time_long_sec=Math.ceil((new Date).getTime()/1e3));var n=16==t.currentQuestionItem.question_type;i.currentQuestionIndex===t.question_list.length-1?n?e&&i.submitTask():i.submitTask():n?e&&i.nextQuestionDo():i.nextQuestionDo()},function(){i.begin_time_long_sec=Math.ceil((new Date).getTime()/1e3)})},nextQuestionDo:function(){var e=this,t=function(){e.loading=!1,e.currentQuestionIndex++;var t=r["a"].getTomorrowTime();!e.hasNoExistQuestionType&&l["a"].cookieUtils.setItem(e.currentQuestionIndexKey,e.currentQuestionIndex,t),e.componentShow=!1,e.$nextTick(function(){e.waiting=!1,e.isAnswered=!1,e.begin_time_long_sec=0,e.end_time_long_sec=0,e.getCurrentQuestionItem(),e.componentShow=!0})};this.isExistQuestionComponent?this.nextQuestionDoInterval=setInterval(function(){e.dialogData.visible||(e.$nextTick(function(){setTimeout(function(){t()},500)}),e.nextQuestionDoInterval&&(clearInterval(e.nextQuestionDoInterval),e.nextQuestionDoInterval=null))},1e3):setTimeout(function(){t()},2500)},submitTask:function(){var e=this,t=this;if(this.hasNoExistQuestionType)this.$message.warning("存在未适配的题型，无法提交");else{var i={inclass_task_record_id:t.inclass_task_record_id,submit_by_system:!1};this.loading=!0,this.waiting=!0,this.submitTaskActions(i).then(function(t){e.loading=!1;var i=t.error_code;t.data;i||(e.submitTaskInterval=setInterval(function(){e.dialogData.visible||(e.waiting=!1,setTimeout(function(){e.lockScreenAndInit()},500),e.submitTaskInterval&&(clearInterval(e.submitTaskInterval),e.submitTaskInterval=null))},1e3))},function(){e.loading=!1,e.waiting=!1})}},lockScreenAndInit:function(){this.lockDialog.visible=!0,this.examination_paper={},this.currentQuestionItem={},this.question_list=[],l["a"].cookieUtils.removeItem(this.currentQuestionIndexKey),this.currentQuestionIndex=0,this.componentShow=!1,this.isAnswered=!1,this.begin_time_long_sec=0,this.end_time_long_sec=0,this.homeData.inclass_task_id=0},renewOnline:function(e){var t=this;this.not_done_flag=e.data.not_done_flag,this.homeData.gold_of_lesson=e.data.gold_of_lesson_student,this.not_done_flag?!this.homeData.inclass_task_id&&e.data.inclass_task_id&&(this.homeData.inclass_task_id=e.data.inclass_task_id,this.currentQuestionIndexKey="currentQuestionIndex-".concat(this.homeData.student_id,"-").concat(this.homeData.inclass_task_id),this.getEnterInclassTask(function(){t.lockDialog.visible=!1,t.componentShow=!0})):(this.lockDialog.visible=!0,this.componentShow=!1,this.homeData.inclass_task_id=0)},setWebWorker:function(){var e=this,t=window.location.protocol+"//"+window.location.host;this.worker=new Worker("".concat(t,"/static/worker/renewOnline.js")),this.worker.addEventListener("message",this.renewOnline);var i=this.$route.query.arrangement_id,n=this.$route.query.class_id;this.worker.postMessage({token:e.info.token,pathApi:"https://pre-api.thedeer.cn",course_arrangement_id:i,class_id:n})}}),mounted:function(){console.log(Object({NODE_ENV:"production",VUE_APP_ENV:"pre",VUE_APP_EXAM:"https://pre-jsl-exam.thedeer.cn",VUE_APP_QUESTIONS_SERVER:"https://pre-api.thedeer.cn/student-web/",VUE_APP_SERVER:"https://pre-api.thedeer.cn/studentweb/",VUE_APP_SERVER2:"https://pre-api.thedeer.cn",VUE_APP_TITLE:"九色鹿学生端",VUE_APP_VERSION:"0.0.1",BASE_URL:"/"}),11);var e=this;window.addEventListener("resize",e.setRootFontSize),this.getHomeData(),this.setWebWorker()},computed:Object(s["a"])({},Object(a["c"])("account",["info"]),{isExistQuestionComponent:function(){var e=Object.keys(c),t=this.currentQuestionItem;return!(!t||!t.question_type)&&e.indexOf(t.question_type)>-1}}),components:{virDialog:f,codeChecking:k,lockDialog:j},created:function(){},beforeRouteEnter:function(e,t,i){document.title="虚拟教室",i(function(e){e.setRootFontSize()})},destroyed:function(){var e=this;document.title="九色鹿学生端";var t=document.getElementsByTagName("html")[0];t.style.fontSize="",document.body.style.fontSize="",window.removeEventListener("resize",e.setRootFontSize),this.worker&&this.worker.removeEventListener("message",this.renewOnline),this.worker&&this.worker.terminate()},watch:{}},T=C,A=(i("647b"),Object(h["a"])(T,n,o,!1,null,"35467f40",null));t["default"]=A.exports}}]);
//# sourceMappingURL=virtualClassroom.3af65c21.js.map