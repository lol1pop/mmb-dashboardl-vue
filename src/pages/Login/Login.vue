<template>
  <v-app>
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="4" class="d-none d-md-none d-lg-flex"/>
        <v-col cols="12" lg="4" class="login-part d-flex align-center justify-center">
          <v-row no-gutters>
            <v-col cols="12" class="login-part d-flex align-center justify-center flex-column">
              <div class="login-wrapper">
                <v-tabs grow>
                  <v-tabs-slider></v-tabs-slider>
                  <v-tab :href="`#tab-login`">
                    LOGIN
                  </v-tab>
                  <v-tab-item :value="'tab-login'" >
                    <v-form>
                      <v-container>
                        <v-row class="flex-column">
                          <v-col>
                            <v-img src="@/assets/img-logo-black.svg" max-width="250" height="100" block color="white" elevation="0" class="ml-10"></v-img>
                            <p class="login-slogan display-2 text-center font-weight-medium my-10">Admin panel</p>
                          </v-col>
                          <v-form >
                            <v-col>
                              <v-text-field
                                  color="light-blue accent-2"
                                  v-model="email"
                                  :rules="emailRules"
                                  value="admin@flatlogic.com"
                                  label="Адрес электронной почты"
                                  required
                              ></v-text-field>
                              <v-text-field
                                  color="light-blue accent-2"
                                  v-model="password"
                                  :rules="passRules"
                                  type="password"
                                  label="Пароль"
                                  hint="At least 6 characters"
                                  required
                              ></v-text-field>
                            </v-col>
                            <v-col class="d-flex justify-center">
                              <v-btn
                                  class="text-capitalize white--text"
                                  large
                                  :disabled="password.length === 0 || email.length === 0"
                                  color="#25bfec"
                                  @click="login"
                              >Войти</v-btn>
                            </v-col>
                          </v-form>
                        </v-row>
                      </v-container>
                    </v-form>
                  </v-tab-item>
                </v-tabs>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>

  export default {
    name: 'Login',
    data() {
      return {
        email: 'admin@mmb.ru',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
        password: '123456',
        passRules: [
          v => !!v || 'Password is required',
          v => v.length >= 6 || 'Min 6 characters'
        ]
      }
    },
    methods: {
      login(){
        window.localStorage.setItem('authenticated', true);
        this.$router.push('/dashboard');
      }
    }
  }




</script>

<style src="./Login.scss" lang="scss"/>
