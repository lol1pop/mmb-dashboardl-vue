<template>
  <v-container fluid>
    <div class="request-info">
      <h1 class="page-title mt-10 mb-6">Информация о заявке</h1>
      <v-spacer></v-spacer>
      <v-row>
        <div class="mr-7" style="width: 250px;">
          <v-text-field
              color="light-blue accent-2"
              v-model.number="userId"
              label="Введите ID Пользователя"
              filled
          ></v-text-field>
        </div>
        <div class="mr-7" style="width: 450px;">
          <v-text-field
              color="light-blue accent-2"
              v-model="requestId"
              label="Введите ID Заявки"
              filled
          ></v-text-field>
        </div>
        <v-btn
            class="text-capitalize white--text"
            large
            :disabled="!Number.isInteger(userId) || typeof requestId == 'undefined' || typeof requestId == null || requestId.replace(/\s/g,'').length === 0"
            color="#25bfec"
            @click="getRequest"
            style="margin-top: 7px"
        >Найти</v-btn>
      </v-row>
      <v-row>
        <v-col cols="5">
          <v-card v-if="loading" class="pa-7">
              <v-text-field
                  color="light-blue accent-2"
                  v-model="request.id"
                  label="ID"
                  disabled
              ></v-text-field>
            <v-row>
              <v-text-field
                  color="light-blue accent-2"
                  v-model="request.fullName"
                  label="Имя Фамилия"
                  disabled
              ></v-text-field>
              <v-text-field
                  color="light-blue accent-2"
                  v-model="request.birth_date"
                  label="Дата рождения"
                  disabled
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                  color="light-blue accent-2"
                  v-model="request.email"
                  label="Почта"
                  disabled
              ></v-text-field>
              <v-text-field
                  color="light-blue accent-2"
                  v-model="request.phone"
                  label="Телефон"
                  disabled
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                  color="light-blue accent-2"
                  v-model="request.amount"
                  label="Сумма займа"
                  disabled
              ></v-text-field>
              <v-text-field
                  color="light-blue accent-2"
                  v-model="request.term_in_month"
                  label="Переод займа"
                  disabled
              ></v-text-field>
            </v-row>
            <v-btn
                class="text-capitalize white--text"
                large
                color="#25bfec"
                @click="reSend"
            >Переотправка заявки в firano</v-btn>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: "request",
  props: ['uId', 'rId'],
  data() {
    return {
      loading: false,
      userId: undefined,
      requestId: undefined,
      request: {
        id: undefined,
        amount: undefined,
        term_in_month: undefined,
        email: undefined,
        phone: undefined,
        name: undefined,
        surname: undefined,
        is_agree_personal: false,
        birth_date: undefined,
        fullName: undefined
      },
      history: undefined
    }
  },
  methods: {
    getRequest() {
      this.loading = false
      axios.get(`/api/admin/users/${this.userId}/requests/${this.requestId}`).then( rest => {
            this.request = rest.data
            this.request.fullName = this.mergname(this.request)
            this.loading = true
      })
      axios.get(`/api/admin/users/${this.userId}/requests/${this.requestId}/history`).then( rest => {
            this.history = rest.data
      })
    },
    mergname(el) {
      return `${el.name} ${el.surname}`
    },
    async reSend() {
      await axios.post(`/api/admin/users/${this.userId}/requests/${this.requestId}/firano`)
    }
  },
  created() {
    console.log(this.uId , this.rId)
    if(this.uId && this.rId) {
      this.requestId = this.rId
      this.userId = this.uId
      this.getRequest()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/app';

</style>
