<template>
  <div class="main">
    <UsersComponent />
  </div>
</template>

<script>
import UsersComponent from "@/components/user/UsersComponent.vue";
import axios from "axios";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

import { useMainStore } from "@/stores/main";
import { mapWritableState } from "pinia";

export default {
  components: { UsersComponent },
  mounted() {
    axios
      .get("http://127.0.0.1:8000/users")
      .then((response) => {
        this.users = response?.data;
        this.user =  response?.data;
      })
      .catch((e) => {
        this.response = e?.message;
        setTimeout(() => {
          this.response = "";
        }, 2000);
      });
  },
  computed: {
    ...mapWritableState(useMainStore, ["users", 'user', "response"]),
  },
};
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
}
</style>
