(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["childCenter"],{"0535":function(t,e,i){},"11f5":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"main-center"},[t.childInfo.name?a("div",[a("div",{staticClass:"survey"},[a("img",{attrs:{src:t.childInfo.head_portrait_url,alt:""}}),a("div",{staticClass:"student-edit"},[a("el-tooltip",{attrs:{placement:"left","popper-class":"stuedit-tooltip"}},[a("div",{staticClass:"con",attrs:{slot:"content"},slot:"content"},[t._v("\n            "+t._s(t.childInfo.name||"-")+"\n          ")]),a("div",{staticClass:"stu-name"},[t._v(t._s(t.childInfo.name||"-"))])]),a("p",{staticClass:"age"},[t._v("学号:"+t._s(t.childInfo.code))])],1),a("ul",{staticClass:"survey-list"},[a("li",[a("div",{staticClass:"top"},[a("span",{staticClass:"count"},[t._v(t._s(t.navCard.arrive_count||"-"))]),t._v("次\n          ")]),a("div",{staticClass:"bottom"},[t._v("到课次数")])]),a("li",[a("div",{staticClass:"top"},[a("span",{staticClass:"count"},[t._v(t._s(t.navCard.submit_task_count||"-"))]),t._v("个\n          ")]),a("div",{staticClass:"bottom"},[t._v("已参与学习")])]),a("li",[a("div",{staticClass:"top"},[a("span",{staticClass:"count"},[t._v(t._s(t.navCard.pay_transaction_record_count||"-"))]),t._v("次\n          ")]),a("div",{staticClass:"bottom"},[t._v("已学课次")])]),a("li",[a("div",{staticClass:"top"},[a("span",{staticClass:"count"},[t._v(t._s(t.navCard.time_total||"-"))]),t._v(t._s(t.navCard.time_name)+"\n          ")]),a("div",{staticClass:"bottom"},[t._v("累计听读")])])])]),a("div",[a("ul",{staticClass:"user-list"},[a("li",[a("span",{staticClass:"user-label"},[t._v("姓名：")]),a("div",{staticClass:"label-info"},[a("span",[t._v(t._s(t.childInfoModel.name))])])]),a("li",[a("span",{staticClass:"user-label"},[t._v("英文名：")]),a("div",{staticClass:"label-info"},[a("span",[t._v(t._s(t.childInfoModel.english_name))])])]),a("li",[a("span",{staticClass:"user-label"},[t._v("性别：")]),a("div",{staticClass:"label-info"},[a("span",[t._v(t._s(t.childInfoModel.sex_name))])])]),a("li",[a("span",{staticClass:"user-label"},[t._v("在读年级：")]),a("div",{staticClass:"label-info"},[a("span",[t._v(t._s(t.childInfoModel.grade_type_name))])])]),a("li",[a("span",{staticClass:"user-label"},[t._v("绑定手机：")]),a("div",{staticClass:"label-info"},[a("span",[t._v(t._s(t.childInfoModel.phone))])])]),a("li",[a("span",{staticClass:"user-label"},[t._v("在读学校：")]),a("div",{staticClass:"label-info"},[a("span",[t._v(t._s(t.childInfoModel.attending_school_name))])])]),a("li",[a("span",{staticClass:"user-label"},[t._v("家庭住址：")]),a("div",{staticClass:"label-info"},[a("span",[t._v(t._s(t.childInfoModel.address))])])])])])]):t._e(),t.childInfo.name?t._e():a("div",{staticClass:"has-not-child-box"},[a("img",{attrs:{src:i("4183"),alt:""}}),a("p",{staticClass:"login-tit"},[t._v("暂无孩子")])])])},s=[],n=(i("c5f6"),i("cebc")),l=i("2f62"),d={data:function(){return{childInfoModel:{name:"",sex:"1",englishName:"",birthday:"",gradeTypeId:"7",trainingTime:"2"},countModel:{}}},methods:Object(n["a"])({},Object(l["b"])("child",["getStudentInfoActions"]),{goAddChild:function(){this.$router.push({name:"addChild"})},initParams:function(t){t.sex=Number(t.sex),t.gradeTypeId=t.grade,t.englishName=t.english_name,t.trainingTime=t.training_time,t.sex=t.sex+""},getStudentInfo:function(t){var e=this;if(t){var i={student_id:t};this.getStudentInfoActions(i).then(function(t){var i=t.error_code,a=t.data;i||(e.initParams(a),e.childInfoModel=a)})}}}),mounted:function(){var t=this;setTimeout(function(){t.getStudentInfo(t.childInfo.student_id)})},computed:Object(n["a"])({},Object(l["c"])("child",["childInfo"]),Object(l["c"])(["navCard"])),components:{},created:function(){},watch:{}},r=d,c=(i("fce4"),i("2877")),o=Object(c["a"])(r,a,s,!1,null,"1c5d6522",null);e["default"]=o.exports},"2d1e":function(t,e,i){t.exports=i.p+"static/img/boy-img.f760efef.jpg"},4183:function(t,e,i){t.exports=i.p+"static/img/empty-img.f9c4384a.png"},"497a":function(t,e,i){"use strict";var a=i("0535"),s=i.n(a);s.a},"5a2f":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"main-center main-center-2"},[t._m(0),i("div",{staticClass:"add-child-box"},[i("form",{attrs:{name:"addChildForm"}},[i("ul",{staticClass:"user-list"},[i("li",{staticClass:"flex-center"},[i("div",{staticClass:"list-item-left"}),i("div",{staticClass:"student-img-box"},[i("img",{attrs:{src:t.babyImg,alt:""}})])]),i("li",[t._m(1),i("div",{staticClass:"list-item-right"},[i("input",{directives:[{name:"required",rawName:"v-required",value:!0,expression:"true"},{name:"pattern",rawName:"v-pattern",value:/^[\u4e00-\u9fa5A-Za-z\s]+$/,expression:"/^[\\u4e00-\\u9fa5A-Za-z\\s]+$/"},{name:"model",rawName:"v-model",value:t.addChildModel.name,expression:"addChildModel.name"}],staticClass:"ipt",attrs:{type:"text",maxlength:"20",name:"childName",placeholder:"请输入孩子姓名"},domProps:{value:t.addChildModel.name},on:{input:function(e){e.target.composing||t.$set(t.addChildModel,"name",e.target.value)}}}),t.addChildForm.childName.$dirty&&t.addChildForm.childName.$error.required&&!t.addChildForm.childName.$error.pattern?i("div",{staticClass:"wrong-tips"},[t._v("请输入孩子姓名")]):t._e(),t.addChildForm.childName.$dirty&&t.addChildForm.childName.$error.pattern&&!t.addChildForm.childName.$error.required?i("div",{staticClass:"wrong-tips"},[t._v("姓名只能由中文、字母或者空格组成")]):t._e()])]),i("li",[t._m(2),i("div",{staticClass:"list-item-right",staticStyle:{"margin-top":"0.7rem"}},[i("el-radio",{attrs:{label:"1"},model:{value:t.addChildModel.sex,callback:function(e){t.$set(t.addChildModel,"sex",e)},expression:"addChildModel.sex"}},[t._v("男宝")]),i("el-radio",{attrs:{label:"2"},model:{value:t.addChildModel.sex,callback:function(e){t.$set(t.addChildModel,"sex",e)},expression:"addChildModel.sex"}},[t._v("女宝")])],1)]),i("li",[t._m(3),i("div",{staticClass:"list-item-right"},[i("input",{directives:[{name:"pattern",rawName:"v-pattern",value:/^[a-zA-Z\s]+$/,expression:"/^[a-zA-Z\\s]+$/"},{name:"model",rawName:"v-model",value:t.addChildModel.englishName,expression:"addChildModel.englishName"}],staticClass:"ipt",attrs:{type:"text",name:"englishName",maxlength:"20",placeholder:"请输入孩子英文名"},domProps:{value:t.addChildModel.englishName},on:{input:function(e){e.target.composing||t.$set(t.addChildModel,"englishName",e.target.value)}}}),t.addChildForm.englishName.$dirty&&t.addChildForm.englishName.$invalid?i("div",{staticClass:"wrong-tips"},[t._v("请输入英文")]):t._e()])]),i("li",[t._m(4),i("div",{staticClass:"list-item-right"},[i("el-date-picker",{directives:[{name:"required",rawName:"v-required",value:!0,expression:"true"}],attrs:{"default-value":t.aaa,name:"birthday",type:"date",placeholder:"请选择孩子出生年月"},model:{value:t.addChildModel.birthday,callback:function(e){t.$set(t.addChildModel,"birthday",e)},expression:"addChildModel.birthday"}}),t.addChildForm.birthday.$dirty&&t.addChildForm.birthday.$invalid?i("div",{staticClass:"wrong-tips"},[t._v("请选择孩子出生年月")]):t._e()],1)]),i("li",[t._m(5),i("div",{staticClass:"list-item-right"},[i("grade-list",{directives:[{name:"required",rawName:"v-required",value:!0,expression:"true"}],attrs:{name:"gradeTypeId"},model:{value:t.addChildModel.gradeTypeId,callback:function(e){t.$set(t.addChildModel,"gradeTypeId",e)},expression:"addChildModel.gradeTypeId"}}),t.addChildForm.gradeTypeId.$dirty&&t.addChildForm.gradeTypeId.$invalid?i("div",{staticClass:"wrong-tips"},[t._v("请选择孩子的年级")]):t._e()],1)]),i("li",[t._m(6),i("div",{staticClass:"list-item-right"},[i("training-time-list",{attrs:{name:"trainingTime"},model:{value:t.addChildModel.trainingTime,callback:function(e){t.$set(t.addChildModel,"trainingTime",e)},expression:"addChildModel.trainingTime"}})],1)]),i("li",[t._m(7),i("button",{directives:[{name:"loading",rawName:"v-loading.fullscreen",value:t.submitAble,expression:"submitAble",modifiers:{fullscreen:!0}}],staticClass:"submit",style:t.addChildForm.$invalid?{background:"#ddd",cursor:"not-allowed"}:{},attrs:{"element-loading-text":"操作中请稍后。。","element-loading-background":"rgba(0, 0, 0, 0.7)"},on:{click:function(e){return t.addChild(e,t.addChildForm.$invalid)}}},[t._v("确定")])])])])])])},s=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("p",{staticClass:"mod-tit mt25"},[i("span",{staticClass:"left-bor"}),i("span",{staticClass:"mod-txt"},[t._v("创建孩子信息")])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"list-item-left"},[i("span",{staticClass:"xing"},[t._v("*")]),i("span",{staticClass:"list-item-tit"},[t._v("姓名：")])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"list-item-left"},[i("span",{staticClass:"xing"},[t._v("*")]),i("span",{staticClass:"list-item-tit"},[t._v("性别：")])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"list-item-left"},[i("span",{staticClass:"list-item-tit"},[t._v("英文名：")])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"list-item-left"},[i("span",{staticClass:"xing"},[t._v("*")]),i("span",{staticClass:"list-item-tit"},[t._v("出生年月：")])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"list-item-left"},[i("span",{staticClass:"xing"},[t._v("*")]),i("span",{staticClass:"list-item-tit"},[t._v("年级：")])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"list-item-left"},[i("span",{staticClass:"list-item-tit"},[t._v("培训时长：")])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"list-item-left"},[i("span",{staticClass:"list-item-tit"})])}],n=i("cebc"),l=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-select",{attrs:{placeholder:"请选择孩子的年级"},model:{value:t.val,callback:function(e){t.val=e},expression:"val"}},t._l(t.gradeList,function(t){return i("el-option",{key:t.grade_id,attrs:{label:t.grade_name,value:t.grade_id}})}),1)},d=[],r=i("2f62"),c={props:{value:{type:String}},mounted:function(){this.getGradeList()},data:function(){return{val:"",gradeList:[]}},watch:{val:{handler:function(t){t?this.$emit("input",t):this.$emit("input","")},immediate:!0},value:{handler:function(t){this.val=t},immediate:!0}},methods:Object(n["a"])({},Object(r["b"])("child",["getGradeListActions"]),{getGradeList:function(){var t=this;this.getGradeListActions().then(function(e){var i=e.error_code,a=e.data;i||(t.gradeList=a)},function(t){})}})},o=c,u=i("2877"),m=Object(u["a"])(o,l,d,!1,null,null,null),v=m.exports,h=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-select",{attrs:{placeholder:"请选择培训时长"},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}},t._l(t.trainingTimeList,function(t){return i("el-option",{key:t.type,attrs:{label:t.name,value:t.type}})}),1)},f=[],p=(i("ac6a"),{props:{value:{type:String}},mounted:function(){this.getTrainingTimeList()},data:function(){return{val:"",trainingTimeList:[]}},watch:{value:{handler:function(t){this.val=t},immediate:!0},val:{handler:function(t){t?this.$emit("input",t):this.$emit("input","0")},immediate:!0}},methods:Object(n["a"])({},Object(r["b"])("child",["getTrainingTimeListActions"]),{getTrainingTimeList:function(){var t=this;this.getTrainingTimeListActions().then(function(e){var i=e.error_code,a=e.data;i||(t.trainingTimeList=a,t.trainingTimeList.forEach(function(t){t.type=t.type+""}))},function(t){})}})}),_=p,C=Object(u["a"])(_,h,f,!1,null,null,null),g=C.exports,b=i("4411"),x={data:function(){return Object(n["a"])({aaa:new Date("2012-06-30")},Object(b["c"])("addChildForm",["childName","birthday","gradeTypeId","englishName"]),{submitAble:!1,addChildModel:{name:"",sex:"1",englishName:"",birthday:"",gradeTypeId:"7",trainingTime:"2"},addChildFormRules:{name:[{required:!0,message:"请输入孩子姓名"}],birthday:[{required:!0,message:"请选择孩子出生年月"}],gradeTypeId:[{required:!0,message:"请选择孩子的年级"}]}})},methods:Object(n["a"])({},Object(r["b"])("child",["studentLoginActions","addChildActions"]),Object(r["b"])(["getHomeCardActions"]),{addChild:function(t,e){t.preventDefault(),this.submitAble||e||(this.submitAble=!0,this.addChildRequest())},addChildRequest:function(){var t=this;this.addChildActions(this.addChildModel).then(function(e){t.submitAble=!1;var i=e.error_code,a=e.data;if(!i){if(a.length<=1){var s=a[a.length-1].student_id;t.loginByStudentId(s)}else t.$router.push({name:"sign_in_success"});t.$message.success("添加孩子成功")}},function(e){t.submitAble=!1})},loginByStudentId:function(t){var e=this,i={student_id:t};this.studentLoginActions(i).then(function(i){var a=i.error_code;i.data;a||(e.$store.dispatch("account/setStudentIdCookie",t),e.$bus.$emit("getHomeCard",!0),e.$router.push({name:"sign_in_success"}))},function(t){})}}),mounted:function(){},computed:{babyImg:function(){var t="";return t=1==this.addChildModel.sex?i("2d1e"):i("85ff"),t}},components:{gradeList:v,trainingTimeList:g},created:function(){}},y=x,$=(i("497a"),Object(u["a"])(y,a,s,!1,null,"367a4808",null));e["default"]=$.exports},"85ff":function(t,e,i){t.exports=i.p+"static/img/girl-img.89070f62.jpg"},fce4:function(t,e,i){"use strict";var a=i("fd74"),s=i.n(a);s.a},fd74:function(t,e,i){}}]);
//# sourceMappingURL=childCenter.132557d2.js.map