<template>
  <div class="jumbotron">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 offset-lg-2">
          <div>
            <div
              class="alert alert-danger"
              v-if="errors.length">
              <b>{{ $t('routes.please_correct_errors') }}</b>
              <ul>
                <li
                  v-for="error in errors"
                  :key="error">{{ error }}</li>
              </ul>
            </div>
            <h2>{{ $t('common.new_route') }}</h2>
            <form @submit.prevent="handleSubmit">
              <div class="form-group">
                <label>{{ $t('routes.date') }}</label>
                <input
                  type="date"
                  v-model="route.date"
                  name="date"
                  class="form-control"
                  :class="{ 'is-invalid': isSubmitted && !route.date }"
                >
              </div>
              <div class="form-group">
                <label>{{ $t('routes.description') }}</label>
                <input
                  type="text"
                  v-model="route.description"
                  name="description"
                  class="form-control"
                  :class="{ 'is-invalid': isSubmitted && !route.description }"
                >
              </div>
              <div class="form-group">
                <label>{{ $t('routes.from') }}</label>
                <input
                  type="text"
                  v-model="route.from"
                  name="from"
                  class="form-control"
                  :class="{ 'is-invalid': isSubmitted && !route.from }"
                >
              </div>
              <div class="form-group">
                <label>{{ $t('routes.destination') }}</label>
                <input
                  type="text"
                  v-model="route.destination"
                  name="destination"
                  class="form-control"
                  :class="{ 'is-invalid': isSubmitted && !route.destination }"
                >
              </div>
              <div class="row">
                <div class="form-group col-sm-6">
                  <label>{{ $t('routes.starting_mileage') }}</label>
                  <input
                    type="number"
                    v-model="route.startMileage"
                    name="startMileage"
                    class="form-control"
                    :class="{ 'is-invalid': isSubmitted && !route.startMileage }"
                  >
                </div>
                <div class="form-group col-sm-6">
                  <label>{{ $t('routes.ending_mileage') }}</label>
                  <input
                    type="number"
                    v-model="route.endMileage"
                    name="endMileage"
                    class="form-control"
                    :class="{ 'is-invalid': isSubmitted && !route.endMileage }"
                  >
                </div>
              </div>
              <div class="form-group">
                <button
                  class="btn btn-primary"
                >{{ $t('routes.submit') }}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import uuidv4 from 'uuid/v4';
import * as actions from '../store/actions';
import { isErroring, makeErrorMessage } from './services';

const defaultFormState = {
  id: uuidv4(),
  date: '',
  description: '',
  from: '',
  destination: '',
  startMileage: '',
  endMileage: '',
  isSynced: false,
};


export default {
  name: 'RouteFormView',
  data() {
    return {
      route: { ...defaultFormState },
      errors: [],
      isSubmitted: false,
    };
  },
  methods: {
    ...mapActions([actions.SUBMIT]),

    handleSubmit() {
      this.validateForm();
      this.isSubmitted = true;

      if (!this.errors.length) {
        this[actions.SUBMIT]({ form: this.route });
        this.route = { ...defaultFormState };
        this.isSubmitted = false;
      }
    },

    validateForm() {
      const { route } = this;
      this.errors = Object.keys(route)
        .filter(isErroring(route))
        .map(makeErrorMessage(this.$t.bind(this)));
    },
  },
};
</script>

<style scoped lang="scss">
  @import "../scss/base";

  .jumbotron {
    @include my(4);
  }
</style>

