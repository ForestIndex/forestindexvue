<style lang="scss">
@import '../styles/common.scss';
@import '../styles/component.search.scss';
@import '../styles/buttons.scss';
</style>


<template>
  <section class="outerSection">
    <banner></banner>
    <navigation></navigation>

    <div class="box">
      <!-- Mobile Controls -->
      <h2 class="mainTitle green titles mobile">Forestry Services:</h2>
      <select v-model="active.service.name" class="mobileDropDown mobile">
        <option disabled value="">Select a Forestry Service</option>
        <option :key="service._id" v-for="service in services">
          {{ service.name }}
        </option>
      </select>

      <h5 class="secondaryTitle green mobile">Categories to Include in Search:</h5>
      <select v-model="categoryChange" class="mobileDropDown mobile titles">
        <option disabled value=null>Select categories</option>
        <option :key="category._id" :class="{green: active.categories.indexOf(category._id) > -1}" v-for="category in categories">
          {{ category.name || 'None' }}
        </option>
      </select>
      <button class="mobile red" v-if="display.selectedCategories.length > 0" v-on:click="clearCategories">Clear Category Filters</button>
      <ul class="zero fullWidth">
        <greenbox :key="category._id" class="mobile" v-for="category in display.selectedCategories" :obj="category"></greenbox>
      </ul>

      <h5 class="secondaryTitle green mobile">State to Search:</h5>
      <select v-model="active.state" class="mobileDropDown mobile">
        <option disabled value=null>Select a State</option>
        <option v-for="state in states" :key="state._id" :value="state._id">{{ state.name }}</option>
      </select>

      <h5 class="secondaryTitle green mobile">Counties to Search:</h5>
      <select v-model="countyChange" class="mobileDropDown mobile">
        <option value=null disabled>Select Counties</option>
        <option v-for="county in counties" :key="county._id" :value="county._id">{{ county.name }}</option>
      </select>
      <button class="mobile red" v-if=" display.selectedCounties.length > 0" v-on:click="clearCounties">Clear Counties Filter</button>
      <ul class="zero fullWidth">
        <greenbox class="mobile" :key="county._id" v-for="county in display.selectedCounties" :obj="county"></greenbox>
      </ul>

      <!-- Desktop Controls -->
      <ul class="columns desktop">
        <li class="col">
          <div class="softWrapper">
            <h3 class="green desktop">Forestry Services:</h3>
            <ul class="serviceList">
              <li :class="{selected: active.service.name === service.name}" v-on:click="active.service = service" :key="service._id" v-for="service in services">{{ service.name }}</li>
            </ul>
          </div>
        </li>

        <li class="col alignLeft">
          <div class="softWrapper" v-if="categories.length > 0">
            <div class="checkField">
              <h3 v-if="categories.length > 0" class="green">Filter Categories:</h3>
              <h5 v-if="categories.length > 0">Selecting no checkboxes will include all categories.</h5>
              <span class="checkBox" :key="category._id" v-for="category in categories">
                <input :value="category._id" type="checkbox" v-model="active.categories" v-if="!(categories.length === 1 && !category.name)"><span :class="{green: active.categories.indexOf(category._id) > -1}">{{ category.name || 'none' }}</span>
              </span>
            </div>
          </div>

          <div class="softWrapper">
            <h3 class="green">State:</h3>
            <select v-model="active.state">
              <option disabled value=null>Select a State</option>
              <option v-for="state in states" :key="state._id" :value="state._id">{{ state.name }}</option>
            </select>
          </div>

          <div class="softWrapper">
            <h3 class="green">Counties:</h3>
            <select v-model="countyChange">
              <option value=null disabled>Select Counties</option>
              <option v-for="county in counties" :key="county._id" :value="county._id">{{ county.name }}</option>
            </select>
            <button class="red" v-if=" display.selectedCounties.length > 0" v-on:click="clearCounties">Clear Counties Filter</button>
            <ul>
              <greenbox class="desktop" :key="county._id" v-for="county in display.selectedCounties" :obj="county"></greenbox>
            </ul>
          </div>
        </li>
      </ul>

      <h3 v-if="!active.service._id">Select a Service to begin searching for businesses</h3>
      <button id="search" :disabled="display.serviceName === null" v-on:click="search">Search {{ display.serviceName }}</button>
      <h3>Showing {{ searchResults.length }} result{{ searchResults.length > 1 ? 's' : '' }}</h3>
    </div>

    <h3 class="zero fullWidth searchNotification desktop" v-if="searchResults.length === 0 && notificationText.length > 0">{{ notificationText }}</h3>

    <ul class="zero fullWidth">
      <search-result v-for="user in searchResults" :key="user._id" :user="user"></search-result>
    </ul>
  </section>
</template>


<script>
import navigation from './child.navigation.vue';
import banner from './child.banner.vue';
import greenbox from './child.greenbox.vue';
import searchResult from './child.searchResult.vue';

export default {
  data: function() {
    return {
      api: process.env.API_HOST,
      categories: [],
      services: [],
      states: [],
      counties: [],
      active: {
        service: {
          name: '',
          _id: null,
          order: null
        },
        categories: [],
        state: process.env.DEFAULT_STATE_ID || 90,
        counties: []
      },
      display: {
        selectedCategories: [],
        serviceName: null,
        selectedCounties: []
      },
      categoryChange: null, // a little hacky way of doing multi select
      countyChange: null, // multi select
      searchResults: [],
      notificationText: ""
    };
  },
  watch: {
    'active.service.name': function(newVal, oldVal) {
      this.active.service = this.services.filter((s) => s.name === newVal).pop();
      this.active.categories = [];
      this.categoryChange = null;
      this.display.selectedCategories = [];
      this.display.serviceName = newVal;
      this.searchResults = [];
      this.notificationText = "";
      return Promise.resolve(this.active.service._id)
      .then(this.getCategories)
      .catch((e) => console.log(e));
    },
    'categoryChange': function(newVal, oldVal) {
      if (this.categoryChange !== null) {
        const searchName = newVal === 'None' ? '' : newVal;
        const selectedCatArr = this.categories.filter((c) => c.name === searchName);
        if (selectedCatArr.length > 0) {
          this.active.categories.push(selectedCatArr[0]._id);
          this.categoryChange = null;
          this.categories.forEach((cat) => {
            const alreadyIncluded = () => {
              const filtered = this.display.selectedCategories.filter((c) => c.name === cat.name);
              return filtered.length > 0;
            };
            if (cat.name === newVal.trim() && !alreadyIncluded()) this.display.selectedCategories.push(cat);
          });
        }
      }
    },
    'countyChange': function(newVal, oldVal) {
      if (newVal !== null) {
        if (this.active.counties.indexOf(newVal) < 0) this.active.counties.push(newVal);
        const filtered = this.counties.filter((c) => c._id === newVal);
        if (filtered.length > 0) {
          const alreadExistsArr = this.display.selectedCounties.filter((c) => c._id === newVal);
          if (alreadExistsArr.length === 0) this.display.selectedCounties.push(filtered[0]);
        }
        this.countyChange = null;
      }
    },
    'active.state': async function(newVal, oldVal) {
      this.clearCounties();
    }
  },
  components: {
    banner,
    navigation,
    greenbox,
    searchResult
  },
  methods: {
    clearCategories: function() {
      this.display.selectedCategories = [];
      this.active.categories = [];
    },
    clearCounties: async function() {
      this.active.counties = [];
      this.display.selectedCounties = [];
      if (!!this.active.state) await this.getCounties();
    },
    getServices: function() {
      const url = `${this.api}/api/services`;
      this.$http.get(url)
      .then((res) => {
        this.services = res.body;
        const ids = this.services.map((s) => s._id);
        return Promise.resolve(ids);
      }, (err) => {
         return Promise.reject(err);
      });
    },
    getCategories: function(id) {
      const url = `${this.api}/api/categories`;
      this.$http.get(url)
      .then((res) => {
        this.categories = res.body.filter((c) => c._service === id);
        return Promise.resolve();
      }, (err) => {
        return Promise.reject(err);
      });
    },
    getCounties: function() {
      const url = `${this.api}/api/states/${this.active.state}/counties`;
      this.$http.get(url)
      .then((res) => {
        this.counties = res.body;
        return Promise.resolve();
      }, (err) => {
        return Promise.reject(err);
      });
    },
    getStates: function() {
      const url = `${this.api}/api/states`;
      this.$http.get(url)
      .then((res) => {
        this.states = res.body;
        return Promise.resolve();
      }, (err) => {
        return Promise.reject(err);
      });
    },
    search: function() {
      this.notificationText = "";
      const searchUser = {
        _service: this.active.service._id,
        categories: this.active.categories,
        info: {
          operationalCounties: this.active.counties
        }
      };
      const url = `${this.api}/api/users/search`;
      this.$http.post(url, searchUser)
      .then((res) => {
        this.searchResults = res.body;
        if (this.searchResults.length === 0) this.notificationText = "No Results. Please try changing your search criteria.";
      }, (err) => {
        console.log(err);
      });
    }
  },
  mounted: async function() {
    await this.getStates();
    await this.getCounties();
  },
  created: function() {
    return Promise.resolve()
    .then(async () => {
      await this.getServices();
      return Promise.resolve();
    })
    .catch((err) => {
      console.log(err);
    });
  }
}
</script>
