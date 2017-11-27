<template>
    <section>
        <Row class="header-option">
            <Col span="5">
                新闻标题:
                <Input v-model="newTitle" placeholder="请输入新闻标题" style="width: 200px"></Input>
            </Col>
            <Col span="3" offse="1">
                一级目录：
                 <Select v-model="oneCatalog" style="width:100px">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </Col>
            <Col span="3" offse="1">
                二级目录：
                 <Select v-model="TwoCatalog" style="width:100px">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </Col>
            <Col span="3" offse="1">
                发布状态：
                 <Select v-model="stateValue" style="width:100px">
                    <Option v-for="item in state" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </Col>
            <Col span="3" offse="1">
                发布状态：
                 <Select v-model="stateValue" style="width:100px">
                    <Option v-for="item in state" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </Col>
            <Col span="3" offse="1">
                <Button type="info" @click="query">查询</Button>
                <Button type="success" @click="goNew">新增</Button>
            </Col>
        </Row>
        <Table :loading="loading" :columns="columns" :data="list"></Table>
        <Page :total="100" :current="1"   show-elevator @on-change="changePage" class="pageNumber"></Page>
    </section>
</template>
<script>
export default {   
  data () {
    return {
        loading: true,
        newTitle:'',
        cityList: [
            {
                value: 'all',
                label: '全部'
            },
            {
                value: 'product',
                label: '私募产品'
            },
            {
                value: 'company',
                label: '私募公司'
            },
            {
                value: 'manager',
                label: '私募经理'
            }
        ],
        oneCatalog: '',
        TwoCatalog:'',
        stateValue:'',
        state:[
            {
                value: '1',
                label: '全部'
            },
            {
                value: '2',
                label: '已发布'
            },
            {
                value: '3',
                label: '未发布'
            }
        ],
        columns: [],
        list: [
            {
                name: '评论1',
                age: 18,
                address: '北京市朝阳区芍药居'                
            },
            {
                name: '评论2',
                name: '张小刚',
                age: 25,
                address: '北京市海淀区西二旗'
            },
            {
                name: '评论3',
                age: 30,
                address: '上海市浦东新区世纪大道'
            },
            {
                name: '评论4',
                age: 26,
                address: '深圳市南山区深南大道'
            }
        ],
        columnsTest:[]
    }
  },
  methods: {
        query () {
            this.$Message.info('这是查询按钮');
        },
        goNew () {
            this.$router.push( {path: '/commentDetail'} )
        },
        show (index) {
            this.$Modal.info({
                title: '用户信息',
                content: `姓名：${this.list[index].name}<br>年龄：${this.list[index].age}<br>地址：${this.list[index].address}`
            })
        },
        remove (index) {
            console.log(index)
            this.list.splice(index, 1);
        },
        changePage (page){
           console.log(page)
        }
  },
  mounted () {
    let that = this; 
  }
}
</script>
<style lang="less" scoped>
    .header-option{
        margin-bottom: 15px;
        font-size: 14px;
    }

    .pageNumber{
        float: right;
        margin-top: 10px;
        font-size: 12px;
    }
</style>
