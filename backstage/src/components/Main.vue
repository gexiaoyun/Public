<template>
  <section id="app" class="layout" :class="{'layout-hide-text': hideMenuText }" >
    <Row type="flex" class="main">
      <Col :span="spanleft" class="leftMenu">      
        <Row>
          <Col span="24" class="header-logo">logo</Col>
        </Row>
        <slideMenu />
      </Col>
      <Col :span="spanright" class="rightMain">
        <div class="layout-header">
            <Button type="text" @click="toggleClick" class="navicon-con">
                <Icon type="navicon" size="32"></Icon>
            </Button>
            <Breadcrumb class="crumbs">
                <BreadcrumbItem :href="item.path != '' ? item.path : ''"  v-for="(item,index) in crumb" :key="item.title">{{item.title}}</BreadcrumbItem>               
            </Breadcrumb>
            <div class="user-dropdown-menu-con">
                <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                    <Dropdown trigger="click" @on-click="handleClickUserDropdown">
                        <a href="javascript:void(0)">
                            <span class="main-user-name">{{ userName }}</span>
                            <Icon type="arrow-down-b"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem name="ownSpace">个人中心</DropdownItem>
                            <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Avatar src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg" style="background: #619fe7;margin-left: 10px;"></Avatar>
                </Row>
            </div>
        </div>        
        <Row class="main-con">
          <Col span="24" class="page">
          <!-- 内容区域 -->
            <router-view/>
          </Col>
        </Row>
      </Col>
    </Row>
  </section>
</template>

<script>
import slideMenu from "./main_components/slideMenu";
export default {
  name: 'app',
  components: {
    slideMenu
  },
  data () {
    return {
      spanleft:3,
      spanright:21,
      hideMenuText:false,
      userName:'mouse0913',
      crumb:this.$store.state.currentPath
    }
  },
  computed: {
   
  },
  methods: {
    toggleClick () {
      if(this.hideMenuText == false){
        this.spanleft = 1;
        this.spanright = 23;
        this.hideMenuText = true;
      } else {
        this.spanleft = 3;
        this.spanright = 21;
        this.hideMenuText = false;
      }
    },
    handleClickUserDropdown (name) {
     if(name == 'ownSpace'){
       this.$Message.info({
         content:'点击个人中心'
       })
     }else{
        this.$Message.info({
         content:'点击退出登录'         
       })
       this.$router.push('/login')
     }
    }
  },
  watch: {
    
  },
  mounted () {   
    
  }
}
</script>


<style lang="less" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 18px;
  border: 1px solid #d7dde4;
  border-radius:4px;
  overflow: hidden;
  height: 100%;
}
.main{
  height: 100%;
  .header-logo{
    height: 120px;
    color: #fff;
    background: #80848f;
  }
   .layout-hide-text .layout-text{
        display: none;
    }
  .leftMenu{
    height: 100%;
    background: #495060;
    overflow: auto;
  }
  .rightMain{
    background: #f0f0f0;
    .layout-header{
      height: 60px;
      background: #fff;
      box-shadow: 0 1px 1px rgba(0,0,0,.1);
      position: relative;
      .navicon-con{
        margin: 6px;
        display: inline-block;
      }
      .crumbs{
        height: 50px;
        position: absolute;
        top: 0;
        left: 60px;
        bottom: 0;
        right: 145px;
        overflow: hidden;
        height: 60px;
        line-height: 60px;
        padding-left: 20px;
      }
    }
    .user-dropdown-menu-con{
      float: right;
      height: 100%;
      .user-dropdown-innercon{
        height: 100%;
        padding-right: 15px;
        font-size: 14px;
      }
    }
    .main-con{
      margin: 10px;
      padding: 10px;
      background: #fff;
      box-shadow: 0 1px 1px rgba(0,0,0,.1);
      position:absolute;
      top: 60px;
      left: 0;
      right: 0;
      bottom: 0;
      overflow-y: auto;
    }    
  }
}
</style>

