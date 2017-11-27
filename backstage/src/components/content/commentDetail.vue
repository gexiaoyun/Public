<template>
    <section>
        <Form ref="listData" :model="listData" :rules="listValidate" :label-width="100">
                <Card style="float:left">
                <p slot="title">数据填写</p>
            <FormItem label="文章标题：" prop="title">
                <Input v-model="listData.title" placeholder="请输入文章标题"></Input>
            </FormItem>
            <FormItem label="文章作者：" prop="author">
                <Input v-model="listData.author" placeholder="请输入文章作者"></Input>
            </FormItem>
            <FormItem label="一级栏目：" prop="oneColumn">
                <Select v-model="listData.oneColumn">
                    <Option v-for="item in oneColumnList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem label="二级栏目：" prop="twoColumn">
                <Select v-model="listData.twoColumn">
                    <Option v-for="item in twoColumnList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem label="创建时间：" prop="establishTime">
                <DatePicker v-model="listData.establishTime" value="yyyy-M-d" @on-change="establishTimeChange" type="date" placeholder="选择日期" style="width:100%;"></DatePicker>
            </FormItem>
            <FormItem label="文章来源：" prop="source">
                <Input v-model="listData.source" placeholder="请输入来源"></Input>
            </FormItem>
            <FormItem label="发布时间：" prop="releaseTime">
                <DatePicker v-model="listData.releaseTime" @on-change="releaseTimeChange" type="date" placeholder="选择日期" style="width:100%;"></DatePicker>
            </FormItem>
            <FormItem label="发布状态：" prop="state">
                <Select v-model="listData.state">
                    <Option v-for="item in stateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem label="关联产品ID：" prop="productId">
                <Row>
                    <Col span="8">
                        <Select v-model="listData.oneColumn">
                            <Option v-for="item in oneColumnList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </Col>
                    <Col span="15" offset="1">
                        <Input v-model="listData.productId" placeholder="产品ID"></Input>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="关键字：" prop="keyWord">
                <Row>
                <Col span="13">
                        <Input v-model="listData.keyWord" placeholder="请输入关键字(多个用“|”隔开)"></Input>
                    </Col>
                    <Col span="10" offset="1">
                        <Button type="info">查找</Button>
                        <Button type="success">检测关键字</Button>
                    
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="生成URL：" prop="url">
                <Row>
                <Col span="18">
                        <Input v-model="listData.url" placeholder="生成的网址"></Input>
                    </Col>
                    <Col span="5" offset="1">
                        <Button type="info" @click="seeUrl">查看</Button>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="是否预约：" prop="appointment">
                <Select v-model="listData.appointment">
                    <Option v-for="item in appointmentList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem label="图片上传:" prop="img" style="width: 100%;">  
                <section class="imglist" v-for="(item,index) in defaultList" :key="index">
                    <img :src="item.url" alt="">
                    <section class="cover">
                        <Icon type="eye" size="18" @click.native="handleView"></Icon>
                        <Icon type="trash-a" size="18" @click.native="handleRemove"></Icon>
                    </section>
                </section>  
                <Upload
                    ref="upload"
                    :show-upload-list="false"
                    :on-success="imgSuccess"
                    :format="['jpg','jpeg','png']"
                    :max-size="200"
                    :on-format-error="imgError"
                    :on-exceeded-size="imgMaxSize"
                    :before-upload="imgBeforeUpload"
                    type="drag"
                    action="/api/file/ajax/singleupload"
                    style="display: inline-block;width:58px;">
                    <div style="width: 58px;height:58px;line-height: 58px;">
                        <Icon type="camera" size="20"></Icon>
                    </div>
                </Upload>    
                <Modal title="查看图片" v-model="visible">
                    <img :src="imgName" v-if="visible" style="width: 100%">
                </Modal>
            </FormItem>
            <FormItem label="文本域:"  prop="buy" style="width:96%;">
                <Input v-model="listData.buy" type="textarea" :autosize="{minRows: 5,maxRows: 7}" placeholder="请输入购买说明"></Input>
            </FormItem>
            <FormItem style="width: 100%; text-align:center;">
                <Button type="primary" @click="formSubmit('listData')" >提交</Button>
                <Button type="ghost" style="margin-left: 8px" @click="formReset('listData')">重置</Button>
            </FormItem>
                </Card>        
        </Form>   
        
    </section>
</template>
<script>
export default {
    data () {
        return {
            id: this.$route.query.id,
            listData:{
                title: '',
                author: '',
                oneColumn:'',                
                twoColumn: '',
                establishTime: '',
                source: '',
                releaseTime: '',
                state: '',
                productId: '',
                keyWord: '',
                url: '',
                appointment: '',
                img: '',
                buy:''
            },
            listValidate:{
                title: [
                    { required: true, message: '文章标题不能为空' , trigger: 'blur'}
                ],
                author: [
                    { required: true, message: '文章作者不能为空' , trigger: 'blur'}
                ],
                oneColumn: [
                    { required: true, message: '请选择一级栏目' , trigger: 'change'}
                ],
                twoColumn: [
                    { required: true, message: '请选择二级栏目' , trigger: 'change'}
                ],
                establishTime: [
                    { required: true, type: 'date',  message: '请选择创建时间' , trigger: 'change'}
                ],
                source: [
                    { required: true, message: '文章来源不能为空' , trigger: 'blur'}
                ]
                
            },
            oneColumnList: [
                {
                    value: '0',
                    label:'私募学院' 
                },
                {
                    value: '1',
                    label:'股权学院' 
                },
                {
                    value: '2',
                    label:'固收学院' 
                },
                {
                    value: '3',
                    label:'量图解' 
                }
            ],
            twoColumnList: [
                {
                    value: '0',
                    label: '全部'
                },{
                    value: '1',
                    label: '入门'
                },{
                    value: '2',
                    label: '进阶'
                },{
                    value: '3',
                    label: '高端'
                }
            ],
            stateList:[
                {
                    value: '0',
                    label: '已发布'
                },{
                    value: '1',
                    label: '未发布'
                }
            ],
            appointmentList:[
                {
                    value: '0',
                    label: '是'
                },{
                    value: '1',
                    label: '否'
                }
            ],          
            imgName: '',
            visible: false,
            defaultList:[{
                    'url': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508923607364&di=46e610ad13826a63f2ced744ad3d82f1&imgtype=0&src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201508%2F23%2F20150823125138_aBtv5.jpeg',
                    'name': '7eb99afb9d5f317c912f08b5212fd69a',
                    'status': 'finished',
                }
            ],
            uploadList: []
        }
    },
    methods: {
        establishTimeChange (data) {
            this.listData.establishTime = data;
        },
        releaseTimeChange (data) {
            this.listData.releaseTime = data;
        },
        seeUrl () {
            //this.$Message.info(this.listData.url);
            this.$Notice.open({
                title: '生成的url',
                desc: this.listData.url
            });
        },
        imgSuccess (res,file) {
            // 因为上传过程为实例，这里模拟添加 url
                file.url = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508923607364&di=46e610ad13826a63f2ced744ad3d82f1&imgtype=0&src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201508%2F23%2F20150823125138_aBtv5.jpeg';
                file.name = '7eb99afb9d5f317c912f08b5212fd69a';
                file.status = 'finished';
                this.uploadList = [{
                    'url':file.url,
                    'name':file.name,
                    'status':file.status,
                }]           
        },
        imgError (file) {
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
            });
        },
        imgMaxSize (file) {
            this.$Notice.warning({
                title: '超出文件大小限制',
                desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
            });
        },
        imgBeforeUpload (file) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            const that = this;
            reader.onloadend = (e) =>{
                file.url = reader.result;
                console.log(file)
            }

            const check = this.uploadList.length < 2;
            if (!check) {
                this.$Notice.warning({
                    title: '最多只能上传 1 张图片。'
                });
            }
            return check;
           
        },
        handleView (name) {
            this.imgName = this.defaultList[0].url;
            this.visible = true;
        },
        handleRemove (file) {
            console.log(file)
            // 从 upload 实例删除数据
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        },
        formSubmit (name) {
            console.log(this.listData)
           this.$refs[name].validate((valid) => {
                if (valid) {
                   
                    this.$Message.success('提交成功!');
                } else {
                    this.$Message.error('表单验证失败!');
                }
            })
        },
        formReset (name) {
            this.$refs[name].resetFields();
        }
    },
    mounted () {       
        if(this.id){
           this.$Notice.open({
                title: '修改',
                desc: '这是修改功能，进行数据请求',                
                duration: 2
            });
        }else{
            this.$Notice.open({
                title: '新增',
                desc: '这是新增功能，所以不进行数据请求',
                duration: 2
            });
        }
        this.uploadList = this.$refs.upload.fileList;
    }
}
</script>
<style lang="less" scoped>   
    .ivu-form{
        width: 100%;
        .ivu-form-item{
            width: 30%;
            margin-right: 3%;
            float: left;
        }
    }
    .imglist{
        width: 60px;
        height: 60px;
        float: left;
        text-align: center;
        line-height: 60px;
        overflow: hidden;
        position: relative;
        margin-right: 4px;
        border-radius: 3px;
        box-shadow: 0px 1px 1px rgba(0,0,0,.2);
        img{
            width: 100%;
            height: 100%;
        }
        .cover{
            position: absolute;
            background: rgba(0,0,0,.6);
            display: none;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            i{
                cursor: pointer;
                color: #fff;
            }
        }
        &:hover{
            .cover{
                display: block;
            }
        }
    }
</style>

