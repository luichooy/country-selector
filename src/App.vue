<template>
  <div id="app">
    <div class="block">
      <div class="demo1">
        <p class="label">默认宽度为100%；默认语言为浏览器语言1</p>
        <country-selector v-model="select1"></country-selector>
      </div>
    </div>
  
    <div class="block">
      <p class="label">可以通过width prop来设置宽度，如：width=220px</p>
      <p class="label">通过language设置语言，可选参数有“zh/en\auto”,默认为auto,即读取浏览器语言作为默认语言</p>
      <div class="demo2">
        <country-selector
          v-model="select2"
          style="margin-right: 100px;"
          width="220"
          lang="zh"
          placeholder="language='zh'"
        >
        </country-selector>
        <!--<country-selector-->
          <!--v-model="select3"-->
          <!--width="220"-->
          <!--lang="en"-->
          <!--placeholder="language='zh'"-->
        <!--&gt;-->
        <!--</country-selector>-->
      </div>
    </div>
  </div>
</template>

<script>
  import CountrySelector from './components/countryselector';
  
  export default {
    name: 'app',
    components: {
      CountrySelector
    },
    watch: {
      select1: (val) => {
        console.log(val);
      }
    },
    data() {
      return {
        select1: 'CN',
        select2: '',
        select3: ''
      };
    }
  };
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2C3E50;
    margin-top: 60px;
    padding: 0 50px;
    
    .block {
      margin-bottom: 50px;
    }
    
    .demo2 {
    }
  }
</style>
