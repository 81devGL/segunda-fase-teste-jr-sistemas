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
      <h2 class="title mb-4">Cadastrar nova pessoa</h2>
      <form action="">
        <form-input-component
          label="Tipo de Pessoa: "
          v-model="personType"
        ></form-input-component>
        <form-input-component
          label="CPF/CNPJ: "
          v-model="documentNumber"
          :mask="documentMask"
        ></form-input-component>
        <form-input-component
          label="Razão Social: "
          v-model="socialName"
        ></form-input-component>
        <form-input-component
          label="Nome: "
          v-model="name"
        ></form-input-component>
        <form-input-component
          label="Sexo: "
          v-model="gender"
        ></form-input-component>
        <form-input-component
          label="Nacionalidade: "
          v-model="nacionality"
        ></form-input-component>
        <form-input-component
          label="Estado Civil: "
          v-model="civilState"
        ></form-input-component>
        <form-input-component
          label="Data de Nascimento: "
          v-model="dtBirth"
          :mask="dtBirthMask"
        ></form-input-component>
        <form-input-component
          label="Email: "
          v-model="email"
        ></form-input-component>
        <button type="button" @click="registerNewPerson()" class="btn btn-info">
          Cadastrar
        </button>
      </form>
    </div>
  </div>
</template>
  
  <script lang="ts">
import Vue from "vue";

import { PessoaProvider } from "./pessoa-provider";
import { AppKeys } from "@/app_keys";
import { FormInputComponent } from "@/components";

export default Vue.extend({
  components: {
    FormInputComponent,
  },
  data() {
    return {
      personType: "",
      documentNumber: "",
      socialName: "",
      name: "",
      gender: "",
      nacionality: "",
      civilState: "",
      dtBirth: "",
      email: "",
      documentMask: "###.###.###-##",
      dtBirthMask: "####/##/##",
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
    registerNewPerson() {
      const newPersonObj = {
        personType: this.personType,
        documentNumber: this.documentNumber,
        socialName: this.socialName,
        name: this.name,
        gender: this.gender,
        nacionality: this.nacionality,
        civilState: this.civilState,
        dtBirth: this.dtBirth,
        email: this.email,
      };

      // Faz a requisicao para cadastrar uma nova pessoa
      // Se bem sucedida, retorna para a pagina inicial
      this.pessoaProvider.save(newPersonObj).then(() => {
        this.$router.replace({ name: "AdminPage" });
      });
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