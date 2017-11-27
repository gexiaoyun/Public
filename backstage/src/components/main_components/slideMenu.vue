<template>
   <Menu ref="leftMenu" theme="dark"  :open-names="openName" :active-name="activeName" width="auto"  @on-select="routerName" @on-open-change="grouping" accordion>
        <Submenu name="1">
        <template slot="title">
            <Icon type="ios-paper"></Icon>
            内容管理
        </template>
        <MenuItem name="ArticleList"> 文章管理</MenuItem>
        <MenuItem name="CommentList">评论管理</MenuItem>
        
        </Submenu>
    </Menu>
</template>
<script>
export default {
    data () {
        return {
            msg: '',
            openName: this.$store.state.menuOpen,
            activeName: this.$route.name
        }
    },
    methods: {        
        routerName (name) {
           this.$router.push('/' + name)
         
        },
        activeSelect (name) {
            console.log(name)
        },
        grouping (val) {
            //console.log(val)
        }
    },
    watch: {
        '$route' (to) {          
           this.activeName = to.name;
        },
        activeName () {
           this.openName = this.$store.state.menuOpen;           
        }
    },  
    mounted () {
      
    }
   
}
</script>
<style lang="less" scoped>

</style>