<style lang="scss">
@import '../styles/common.scss';

.profileCols {
  li {
    list-style: none;
    list-style-type: none;
    img {
      width: 80%;
      margin: .5% auto;
    }
  }
}

.noMargTop {
  margin-top: .1%;
}
.largeText {
  font-size: 1.3rem;
}
</style>


<template lang="html">

<section class="outerSection">
  <!-- <banner></banner> -->
  <navigation></navigation>
  <div class="box">

    <ul class="profileCols">
      <li>
        <h4 class="mainTitle">{{ user.info.businessName }}</h4>
        <h5 class="secondaryTitle noMargTop">{{ user.info.address.street }} {{ user.info.address.city }}, {{ user.info.address.state.name }}</h5>
        <h5 v-if="!!user.info.phone" class="largeText">Call: <a :href="'tel:+' + user.info.phone">{{ user.info.phone }}</a></h5>
        <h5 v-if="!!user.info.email" class="largeText">Email: <a :href="'mailto:' + user.info.email">{{ user.info.email }}</a></h5>
        <h5 v-if="!!user.info.websiteUrl" class="largeText"> Website: <a :href="user.info.websiteUrl" target="_blank">{{ user.info.websiteUrl }}</a></h5>
        <h6 class="secondaryTitle">Operational Counties:</h6>
        <span v-if="user.info.operationalCounties.length === 0">None</span>
        <span v-for="county in user.info.operationalCounties">{{ county.name }}<span v-if="renderComma(county)">, </span> </span>
      </li>

      <li>
        <h4 class="secondaryTitle">Description:</h4>
        <p>{{ user.info.description }}</p>
        <h4 class="secondaryTitle">Photos:</h4>
        <img v-if="user.info.images.length === 0" :src="defaultImg" alt="no picture" />
        <img v-for="img in user.info.images" :src="baseUrl + img" :alt="user.info.businessName" />
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
    return {
      user: {
        info: {
          address: {
            street: '',
            city: '',
            state: ''
          },
          email: null,
          phone: null,
          description: '',
          operationalCounties: [],
          images: []
        }
      },
      defaultImg: `${process.env.API_HOST}/api/images/no-picture.png`,
      baseUrl: `${process.env.API_HOST}/api/images/`
    };
  },
  methods: {
    renderComma: function(county) {
      const id = county._id;
      const lastIdx = this.user.info.operationalCounties.length - 1;
      const lastCounty = this.user.info.operationalCounties[lastIdx];
      return lastCounty._id !== county._id;
    }
  },
  components: {
    banner,
    navigation
  },
  created: function() {
    const id = this.$route.params.id;
    const url = `${process.env.API_HOST}/api/users/${id}`;

this.$http.get(url)
    .then((res) => {
      if (!!res.ok && res.body && res.body) {
        this.user = res.body;
      } else {
        this.$router.push('search');
      }
    }, (err) => {
      console.log(err);
    });
  }
}
</script>
