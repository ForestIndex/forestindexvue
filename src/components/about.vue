<style lang="scss">
@import '../styles/common.scss';
.clickableTitle {
  font-size: 1.4rem;
  color: $green;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}
</style>

<template>
<section class="outerSection">
  <banner></banner>
  <navigation></navigation>

  <div class="box">
    <h3>About Forest Index</h3>
            &nbsp;&nbsp;&nbsp;&nbsp;Forest Index was created in 2017 to help forest landowners connect with professionals who can help landowners manage their lands.
            Due to the nature of forest land services industry and the relative lack of internet presence of forestry land professionals, landowners
            rely primarily on word of mouth to reach professionals.  Thus, the less a landowner knows and the more help he needs, the more difficult it is to connect with the right professional.
            Coming from the perspective of a forest landowner, Forest Index seeks to bridge the gap between private landowners and the forest service professionals that can help
            landowners meet their goals in regards to their land, both financial and recreational.
          <br />
          <br />
            &nbsp;&nbsp;&nbsp;&nbsp;Each business or professional on this site pays a yearly listing fee, with an additional
            premium paid by those featured in their respective service categories.  All reviews, recommendations, and ratings are independent of any financial interest and strictly those of
            third-party landowners. Forest Index is committed to helping landowners have a wide a range of service options as possible, while helping professionals effectively
            reach a wider range of landowners. 
            <br />
            <h3 class="clickableTitle" v-on:click="goContact">Contact us to be listed on Forest Index</h3>
  </div>
</section>
</template>

<script>
import banner from './child.banner.vue';
import navigation from './child.navigation.vue'

export default {
  components: {
    banner,
    navigation
  },
  methods: {
    goContact: function() {
      this.$router.push({ name: 'contact' });
    }
  }
}
</script>
