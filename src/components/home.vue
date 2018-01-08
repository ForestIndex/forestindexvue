<style lang="scss">
@import '../styles/common.scss';

.home {
  background-color: transparent;
  box-shadow: 0 0 transparent;
  text-align: center;
  width: 80%;
  margin: 0 auto;
  padding: 0;
  img {
    width: 50%;
  }
  ul {
    li {
      &:hover {
        font-size: 2rem;
        cursor: pointer;
      }
      list-style-type: none;
      list-style: none;
      font-size: 1.6rem;
      transition-duration: 1s;
      text-shadow: 0 0 .5rem black;
    }
  }
}

.welcome {
  margin: .5% auto;
  color: white;
  font-size: 1.3rem;
  text-shadow: 0 0 .5rem black;
}

@media(max-width: 1080px) {
  .home {
    width: 100%;
    margin: 0;
  }
}
</style>


<template lang="html">

<section class="outerSection">
  <banner></banner>
  <navigation></navigation>
  <div class="home">
    <h3 class="secondaryTitle welcome">Welcome to</h3>
    <img src="media/forestindex3_transparent_white.png" alt="Forest Index" />
    <ul>
      <li class="white" v-on:click="navigate('contact')">
        Contact us
      </li>
      <li class="white" v-on:click="navigate('about')">
        About us
      </li>
      <li class="white" v-on:click="navigate('search')">
        Search businesses
      </li>
    </ul>
  </div>
</section>

</template>


<script>
import navigation from './child.navigation.vue';
import banner from './child.banner.vue';

export default {
  data: function() {
    return {};
  },
  components: {
    banner,
    navigation
  },
  methods: {
    navigate: function(page) {
      this.$router.push(page);
    }
  }
}
</script>
