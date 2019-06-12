Vue.prototype.$http = axios
new Vue({
    el:"#app",
    data:function () {
        return {
            listLoading:false,
            search:{
                s_id:'',
                name:''
            },
            listData:[],
            editData:{},
            isEdit:false,
            currentTimer: "",
            currentDepart: "所属部门",
            currentSex: "性别",
            currentDuty: "职务",
            departList: [{index: 1, value: "财务处"}, {index: 2, value: "行政机关"}],
            sexList: [{index: 1, value: "男"}, {index: 2, value: "女"}],
            dutyList: [{index: 1, value: "处长"}, {index: 2, value: "科长"}],
            dateObject: [{index: 1, value: "2017-2018学年（第1学期）"}, {index: 2, value: "2017-2018学年（第2学期）"}]
        }
    },
    methods:{
        showDialog: function() {
            $('.modal-box').modal();
        },
        showDetail: function(myindex) {

            var uid = myindex;
            window.location.href = "./userinfor.html?uid=" + uid;
        },
        handleCommand(command) {
            var sid = command.id;
            //console.log(sid);
            this.currentTimer = command.semester;
            this.$message('已切换到 ' + command.semester);
            this.getData(sid)

        },
        handleDepart(command) {
            this.currentDepart = command.value;
            this.$message('已切换到' + command.value);
        },
        handleSex(command) {
            this.currentSex = command.value;
            this.$message('已切换到' + command.value);
        },
        handleDuty(command) {
            this.currentDuty = command.value;
            this.$message('已切换到' + command.value);
        },
        searchSid: function() {
            /*考生号搜索*/
            this.fetchData() ;
        },
        searchName: function () {
            /*考生名搜索*/
            this.fetchData() ;
        },
        reset:function () {
            this.search.s_id = '' ;
            this.search.name = '' ;
            this.fetchData() ;
        },
        addStudent:function() {
            this.editData = {
                examcode:'',
                username:'',
                sex:'',
                birth:'',
                national:'',
                type:'',
                postcode:'',
                mobile:'',
                address:'',
                moblieaddress:'',
                sendaddress:''
            };
            this.isEdit = false ;
            $('.modal-box').modal();
        },
        fetchData () {
            var vm = this ;
            var actionEvents = {
                'click .edit': function (e, value, row, index) {
                    console.log('编辑',row);
                    vm.editData = {};
                    vm.editData = row ;
                    vm.isEdit = true ;
                    $('.modal-box').modal();
                    
                },
                'click .del':function(e, value, row, index) {
                    console.log('删除',row);
                    vm.delStudent(row);
                },
                'click .detail': function(e, value, row, index) {
                    console.log(row);
                    var uid = row.uid;
                    vm.showDetail(uid);
                }
            };
            $(".myheader tbody").css("display", "none");
            $('#table').bootstrapTable({
                // clickToSelect: true,
                // search:true,
                // showColumns:true,
                pagination:true,
                pageSize:5,  //每页条数
                pageList:[5,15,20],  //可选每页显示条数
                columns: [
                    {
                        field:'uid',
                        // title:'序号',
                        // formatter:function(value,row,index) {
                        //     return index + 1;
                        // },
                        align:'center',
                        // width: "16%",
                        visible: false 
                    },
                    {
                        field:'username',
                        // title:'序号',
                        // formatter:function(value,row,index) {
                        //     return index + 1;
                        // },
                        align:'center',
                        width: "16%"
                    },{
                        field:'department',
                        // title:'考生号',
                        // formatter: function(value, row, index) {

                        // },
                        align:'center',
                        width: "16%"
                    },{
                        field:'sex',
                        // title:'姓名',
                        align:'center',
                        width: "16%"
                    },{
                        field:'duty',
                        // title:'性别',
                        align:'center',
                        width: "16%"
                    },{
                        field:'totalcount',
                        // title:'出生日期',
                        align:'center',
                        width: "16%"
                    },{
                        field: 'operate',
                        // title: '操作',
                        formatter: vm.operateFormatter,
                        events: actionEvents,
                        align: 'center',
                        width: "20%"
                    }
                ],
                data: vm.listData
            });
        },
        operateFormatter:function() {
            // <button type=button' class='btn btn-primary edit'>修改<button>\
            //         <button type=button' class='btn btn-danger del'>删除<button>\
            return "<button type=button' class='btn btn-danger detail'>查看详情</button>"
        },
        vailForm : function () {
            /*需要的各种验证,例如*/
            if($.trim(this.editData.username) == '' || $.trim(this.editData.examcode) == '' || $.trim(this.editData.mobile) == '' || $.trim(this.editData.sendaddress) == '') {
                this.$message('填写信息不完整') ;
                return false;
            }

            return true ;
        },
        save: function () {
            if(!this.vailForm()) {
                return false ;
            }
            console.log(this.editData);
            $('.modal-box').modal('hide');

            var url = null ;
            if(this.isEdit == false) {
            //     /*新建*/
            //     var saveData = {
            //     examcode:$("#examcode").val(),
            //     username:$("#username").val(),
            //     sex:$("#sex").val(),
            //     birth:$("#birth").val(),
            //     national:$("#national").val(),
            //     type:$("#type").val(),
            //     postcode:$("#postcode").val(),
            //     mobile:$("#mobile").val(),
            //     address:$("#address").val(),
            //     moblieaddress:$("#moblieaddress").val(),
            //     sendaddress:$("#sendaddress").val()
            // };
                var vm = this ;
                $.ajax({
                    url:"addinfor.php",
                    type:"post",
                    data: this.editData,
                    success:function(data){
                        // var userArray = JSON.parse(data);
                        // console.log(userArray["student"]);
                        // vm.listData = userArray["student"] ;
                        // vm.fetchData() ;
                    }
                })
            }else{
                var vm = this ;
                $.ajax({
                    url:"updateinfor.php",
                    type:"post",
                    data: this.editData,
                    success:function(data){
                        console.log(data);
                        // var userArray = JSON.parse(data);
                        // console.log(userArray["student"]);
                        // vm.listData = userArray["student"] ;
                        // vm.fetchData() ;
                    }
                })
            }

            
            /*$.ajax({
                url:url,
                method: 'POST',
                dataType: "JSON",
                data:this.editData
            }).done(reply => {
                console.log(reply)
                if (reply.code == 200) {
                    $('#table').bootstrapTable('refresh');
                    //表格数据为从后台拿的方式则会自动刷新表格
                }else{
                    
                }
            }).fail(() => {
                this.$message({
                    type: 'warning',
                    message: '似乎网络有些问题,请稍后重试!',
                    duration:1000
                });
            }).always(() => {
                
            });*/
        },
        delStudent: function (row) {
            vm = this;
            if(confirm("确认删除该记录吗？")){
                $.ajax({
                    url:"deletestudent.php",
                    type:"POST",
                    data:{
                         id:row.id,
                         examcode:row.examcode
                    },
                    success:function(data){
                        window.history.go(0);
                    }
                })
            }
        //     this.$confirm('确认删除此考生信息?', '提示', {
        //         confirmButtonText: '确定',
        //         cancelButtonText: '取消',
        //         type: 'warning'
        //     }).then(() => {
        //         this.listLoading = true;
        //         $.ajax({
        //             url:'deletestudent.php',
        //             method: 'POST',
        //             dataType: "JSON",
        //             data:{
        //                 id:row.id,
        //                 examcode:row.examcode
        //             }
        //             }).done(reply => {
        //                 if (reply.code == 200) {
        //                     this.$message({
        //                         type: 'success',
        //                         message: '删除成功',
        //                         duration:1000
        //                     });
        //                     this.listLoading = false;
        //                 }else{
        //                     if(!!reply.msg){
        //                         this.$message({
        //                             type: 'warning',
        //                             message: reply.msg,
        //                             duration:1000
        //                         });
        //                     }else{
        //                         this.$message({
        //                             type: 'warning',
        //                             message: '似乎网络有些问题,请稍后重试~',
        //                             duration:1000
        //                         });
        //                     }
        //                     this.listLoading = false;
        //                 }
        //             }).fail(() => {
        //                 this.$message({
        //                     type: 'warning',
        //                     message: '似乎网络有些问题,请稍后重试!',
        //                     duration:1000
        //                 });
        //                 this.listLoading = false;
        //             }).always(() => {
        //                 this.listLoading = false;
        //         });
        //     }).catch(() => {
        //         this.$message({
        //             type: 'info',
        //             message: '已取消删除',
        //             duration:1000
        //         });          
        //     });
        },
        setUnit: function(userList, totalHours) {
            var dataList = [];
            for(var i = 0; i < userList.length; i++){
                var unit = {};
                unit = userList[i];
                for(var j = 0; j < totalHours.length; j++) {
                    if(unit.uid == totalHours[j].uid) {
                        unit.totalcount = totalHours[j].total_working_hours;
                    }
                }
                dataList.push(unit);
            }
            return dataList;
        },
        getData: function(sid) {
            var role = localStorage["role"];
            var token = localStorage["token"];
            var uid = localStorage["uid"];
            //console.log(role, token, uid);
            if(token == undefined || token == "") {
                window.location.href = "./login.html";
            }
            var that = this;
            this.$http.get("https://jiaowu.d5h5.com/api/semester/active-list", {params: {api_token: token}}).then((res) => {
                that.dateObject = res.data.list;
                //console.log(res.data.list);
                that.currentTimer = this.dateObject[0]["semester"]
                //console.log(this.dateObject);
            }).then(function() {
                if(sid == undefined) {
                    var semesterId = that.dateObject[0].id;
                }
                else {
                    var semesterId = sid;
                }
        
                //console.log(sid);
                that.$http.get("https://jiaowu.d5h5.com/api/user-list-all", {params: {api_token: token, depart_id: ""}}).then((res) => {
                    //console.log(res.data.list);
                    var dataList = [];
                    
                    var uidList = "";

                    var totalHours = "";

                    for(var i = 0; i < res.data.list.length; i++) {
                        uidList += res.data.list[i]["uid"] + ",";
                        // var obj = {"uid": res.data.list[i]["uid"] ,"username": res.data.list[i]["realname"], "sex": res.data.list[i]["sex"] == 1? "男": "女", "department": res.data.list[i]["depart_name"], "duty": "处长", "totalcount": "100"};
                        // dataList.push(obj);
                    }
                    that.$http.post("https://jiaowu.d5h5.com/api/total-working-hours?api_token=" + token + "&semester_id=" + semesterId,  {uidlist: uidList}, {headers: {"content-type": "text/plain"}}).then(function(hourRes){
                        totalHours = hourRes.data.list;
                        userList = res.data.list;
                        
                        var unitList = that.setUnit(userList, totalHours);
                        
                        for(var i = 0; i < unitList.length; i++) {

                            var obj = {"uid": unitList[i]["uid"] ,"username": unitList[i]["realname"], "sex": unitList["sex"] == 1? "男": "女", "department": unitList[i]["depart_name"], "duty": unitList[i]["job_position"], "totalcount": unitList[i].totalcount};
                            dataList.push(obj);
                        }
                        that.listData = dataList;
                        that.fetchData();
                    })


                    
                })
        

                that.$http.get("https://jiaowu.d5h5.com/api/working-stats",{
                    params: {
                        api_token: token,
                        uid: uid,
                        semester_id: "2019-1"
                    }
                }).then((res) => {
                    console.log(res.data.data.teaching_content);
                    var arr1 = [res.data.data, res.data.data, res.data.data];
                    // console.log(arr1);
                    // console.log(res.data.data);
                    // console.log(arr1.length);
                    // var dataList = [];
                    // for(var i = 0; i < arr1.length; i++) {

                    //     var obj = {"username": arr1[i]["uid"], "sex": "男", "department": arr1[i]["depart_id"], "duty": "处长", totalcount: JSON.parse(arr1[i]["teaching_content"]).hours};
                    //     dataList.push(obj);
                    // }
                    // that.listData = dataList;
                    // that.fetchData();
                    
                }).catch(function (error) {
                    that.$message.error("网络异常");
                });
        })
        // fetch("https://jiaowu.d5h5.com/api/working-stats?api_token=b52d6860f14024c33587650d8ad3205457e27d4a15ddac72b91bbe96e8ae1656&uid=t1006&semester_id=2019-1",{
        //     method :'GET',
        //     mode : 'cors'
        // })
        // .then(res => {return res.json()}, (err) => {throw err;})
        // .then(r => {
        //     console.log(r)
        // })
        // .catch(err => {
        //     console.log(err);
        // });
 
        }
    },
    
    mounted:function () {
        this.getData();


    }
})