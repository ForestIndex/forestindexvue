<style lang="scss">
@import '../styles/common.scss';
@import '../styles/variables.scss';

.dropDown {
  width: 68%;
  margin: 1% 15%;
  padding: 1%;
  border: .05rem solid $gray;
  font-size: 1.2rem;
}

.serviceList {
  width: 30%;
  margin: 0;
  padding: 0;
  left: 0;
  li {
    list-style: none;
    font-size: 1.3rem;
    text-align: left;
    &:hover {
      cursor: pointer;
      background-color: $gray;
      color: white;
    }
  }
  .active {
    background-color: $green;
    color: white;
  }
}
</style>


<template>
  <section class="outerSection">
    <banner></banner>
    <navigation></navigation>

    <div class="box">
      <!-- Mobile Controls -->
      <select class="dropDown mobile">
        <option :key="service.id" v-for="service in services">{{ service.name }}</option>
      </select>

      <!-- Desktop Controls -->
      <ul class="serviceList desktop">
        <li :key="service.id" v-for="service in services">{{ service.name }}</li>
      </ul>
    </div>

  </section>
</template>


<script>
import navigation from './child.navigation.vue';
import banner from './child.banner.vue';

export default {
  data: function() {
    return {
      api: process.env.API_HOST,
      services: []
    };
  },
  components: {
    banner,
    navigation
  },
  methods: {
    getServices: function() {
      const url = `${this.api}/api/services`;
      this.$http.get(url)
      .then((res) => {
        this.services = res.body;
        return Promise.resolve();
      }, (err) => {
         return Promise.reject(err);
      });
    }
  },
  created: function() {
    return Promise.resolve()
    .then(this.getServices)
    .catch((err) => {
      console.log(err);
    });
  }
}
</script>
