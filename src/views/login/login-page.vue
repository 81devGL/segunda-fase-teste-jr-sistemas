<template>
  <div class="main-wrapper">
    <div
      class="
        auth-wrapper
        d-flex
        no-block
        justify-content-center
        align-items-center
      "
    >
      <div class="auth-box">
        <div id="loginform">
          <div class="logo">
            <span class="db"
              ><img src="/assets/images/logo-icon.png" alt="logo"
            /></span>
            <h5 class="font-medium mb-3">Sign In to Admin</h5>
          </div>
          <!-- Form -->
          <div class="row">
            <div class="col-12">
              <form
                class="form-horizontal mt-3"
                id="loginform"
                action="index.html"
              >
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"
                      ><i class="ti-user"></i
                    ></span>
                  </div>
                  <input
                    type="text"
                    v-model="loginDataForm.cpf"
                    class="form-control form-control-lg"
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon2"
                      ><i class="ti-pencil"></i
                    ></span>
                  </div>
                  <input
                    type="password"
                    v-model="loginDataForm.senha"
                    class="form-control form-control-lg"
                    placeholder="Password"
                    aria-label="Password"
                    aria-describedby="basic-addon1"
                  />
                </div>

                <div class="form-group text-center">
                  <div class="col-xs-12 pb-3">
                    <button
                      class="btn btn-block btn-lg btn-info"
                      @click="login"
                      type="button"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { LoginProvider } from "./login-provider";
import { AppKeys } from '@/app_keys'

export default Vue.extend({
  data() {
    return {
      title: "Login",
      loginDataForm: {
        cpf: "",
        senha: "",
      },
      loginDataError: {
        cpf: "",
        senha: "",
      },
      loginProvider: {} as LoginProvider,
      masks: {
        cpf: "###.###.###-##",
      },
    };
  },
  created() {
    this.loginProvider = new LoginProvider(AppKeys.baseUrl);
  },
  methods: {
    async login() {
      const result = await this.loginProvider.login(
        this.loginDataForm.cpf,
        this.loginDataForm.senha
      );

      if(result) {        
        localStorage.setItem(AppKeys.tokenLogin, result)
        this.$router.replace({ name: 'AdminPage' })
      } else {
        alert('Falha ao efetuar login')
      }
    },
  },
});
</script>
