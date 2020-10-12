<!--<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
-->

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

-->

<template>
  <div class="page page-with-padding">
    <div style="width: 100%; height: 300px">拍照</div>
    <!-- <wv-button @click.native="photo" type="primary">拍照</wv-button> -->
  </div>
</template>

<script>
import wx from "weixin-js-sdk";
export default {
  name: "index",
  data() {
    return {
      title: "xxxx",
    };
  },
  created() {
    this.$http
      .get("/forwx")
      .then(function (response) {

console.log(response.data.appId,'bg')

        wx.config({
          debug: false,
          appId: response.data.appId,
          timestamp: parseInt(response.data.timestamp),
          nonceStr: response.data.nonceStr,
          signature: response.data.signature,
          jsApiList: ["chooseImage", "uploadImage"],
        });
        wx.ready(function () {
          console.log("ready");
        });

        wx.error(function (res) {
          console.log(res);
          // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  mounted() {},
  methods: {
    // photo(){
    //     wx.chooseImage({
    //         success: function (res) {
    //         },fail(res){
    //         }
    //     })
    // }
  },
};
</script>
<style>
</style>
