<template>
  <div>
    <section class="navbar bg-jr-blue">
      <div class="navbar-container">
        <a href="javascript:void(0)" class="p-20 di">
          <img
            src="../../assets/images/logos/logo-icon.png"
            style="width: 45px"
          />
          JR Sistemas
        </a>
      </div>
      <div class="text-right">
        <div class="text-white">Nome do usuário logado</div>
        <a @click="logout()" href="javascript:void(0)" class="p-20 di">
          <i class="fas fa-sign-out-alt"></i>
          Sair
        </a>
      </div>
    </section>

    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <button class="btn btn-info" @click="openForm">Novo</button>
        </div>
        <div class="col-md-9">
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              v-model="search"
              placeholder="Procurar pessoas..."
            />
            <div class="input-group-append">
              <button class="btn btn-info" @click="searchPessoa">
                Pesquisar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="isPessoasList">
        <PessoasList :items="pessoas" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { PessoaProvider } from "./pessoa-provider";
import { AppKeys } from "@/app_keys";

import PessoasList from "./components/list-items.vue";

export default Vue.extend({
  components: {
    PessoasList,
  },
  data() {
    return {
      title: "Cadastro de pessoa",
      pessoas: [] as any[],
      pessoaDataForm: {
        nome: "",
        dtNascimento: "",
      },
      pessoaDataError: {
        cpf: "",
        nome: "",
        dtNascimento: "",
      },
      isPessoasList: false,
      pessoaProvider: {} as PessoaProvider,
      masks: {
        cpf: "###.###.###-##",
        dtNascimento: "",
        telefone: "",
      },
      search: "",
    };
  },

  created() {
    const token = localStorage.getItem(AppKeys.tokenLogin);

    if (token) {
      this.pessoaProvider = new PessoaProvider(AppKeys.baseUrl, token);
      this.findAll();
    } else {
      this.$router.replace({ name: "LoginPage" });
    }
  },
  methods: {
    openForm() {
      // abrir formulario para cadastro
    },
    async searchPessoa() {
      this.pessoas = await this.pessoaProvider.findBySearch(this.search);
    },
    async findAll() {
      this.pessoas = await this.pessoaProvider.findAll();
      this.isPessoasList = true;
    },
    editItem(pessoa: any) {
      console.log(pessoa);
    },
    deleteItem(pessoa: any) {
      console.log(pessoa);
    },
    logout() {
      // Remove o token de login e, em seguida
      // Redireciona o usuário para a tela de login novamente

      localStorage.removeItem("TOKEN_LOGIN");
      this.$router.replace({ name: "LoginPage" });
    },
  },
});
</script>

<style scoped>
.navbar {
  position: relative;
  min-height: 70px;
  margin-bottom: 20px;
  border: 1px solid transparent;
  border-radius: 0px !important;
  justify-content: space-between;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  padding: 0px 5%;
}

.bg-jr-blue {
  background-color: #375f9c;
}

@media (max-width: 767px) {
  .container {
    padding-right: 3px;
    padding-left: 3px;
  }
}

.btn-relod {
  background: #f7fafc;
  color: #8898aa;
}

.roload-page {
  cursor: pointer;
}

.container {
  min-height: calc(100vh - 145px);
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #375f9c;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.help-block {
  color: #a94442;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.table {
  margin-top: 20px;
}

.container-header {
  display: flex;
}
</style>