<template>
  <el-dropdown @command="changeLang" class="nav_text" trigger="click">
    <span>
      <i class="el-icon-3d-language"></i>
      <span class="dp_title">{{langName}}</span>
      <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="item in langs" :key="item.value" :command="item.value">{{item.label}}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import Cookies from "js-cookie";
// import ELUlocale from 'element-ui/lib/locale';
export default {
  name: "lang",
  data() {
    return {
      langs: [
        { value: "cn", label: "简体中文" },
        { value: "en", label: "English" }
      ],
      lang: ""
    };
  },
  computed:{
    langName(){
      switch(this.lang) {
        case "cn":
        return "简体中文";
        case "en":
        return "English";
      }
    }
  },
  methods: {
    changeLang(v) {
      //   console.log(v);
      Cookies.set("lang", v);
      this.$i18n.locale = v;
      // ELUlocale.use(v);
    }
  },
  mounted() {
    this.lang = Cookies.get("lang") || "cn";
  }
};
</script>
<style scoped>
.nav_text {
  color: #ecf5ff;
  margin-left: 15px;
}
@media screen and (max-width: 1020px) {
  .lang_select {
    width: 120px;
  }
  .dp_title {
    display: none;
  }
}
@media screen and (max-width: 368px) {
  .lang_select {
    width: 100px;
  }
  .dp_title {
    display: none;
  }
}
</style>
