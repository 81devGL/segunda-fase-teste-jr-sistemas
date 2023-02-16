<template>
  <div>
    <template v-if="isToastyVisible">
      <div
        class="toasty"
        v-bind:class="{
          'red-color': toastyBorderColor == 'red',
          'green-color': toastyBorderColor == 'green',
        }"
      >
        {{ requestResultValue }}
      </div></template
    >
    <div v-if="isModalOpen" class="confirm-modal">
      <div class="modal-content">
        <h2 class="mb-3">Deseja deletar este usuário?</h2>
        <div class="btn-sustainer">
          <button
            @click="
              deletePerson(currentSelectedUser);
              closeConfirmModal();
            "
            class="btn btn-info mx-1"
          >
            Sim
          </button>
          <button @click="closeConfirmModal()" class="btn btn-danger mx-1">
            Não
          </button>
        </div>
      </div>
    </div>
    <table class="table table-boreded">
      <tr>
        <th>Nome</th>
        <th>CPF</th>
        <th>Dt. Nascimento</th>
        <th>Email</th>
        <th>Telefone</th>
        <th>Ações</th>
      </tr>
      <tr v-for="(item, index) in items" :key="`item-${index}`">
        <td>{{ item.nome }}</td>
        <td>{{ item.cpf_cnpj }}</td>
        <td>{{ item.dt_nascimento }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.telefone_1 }}</td>
        <td>
          <button class="btn btn-info mx-1" @click="redirectToEditPage()">
            Editar
          </button>
          <button class="btn btn-danger mx-1" @click="openConfirmModal(item)">
            Excluir
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { AppKeys } from "@/app_keys";
import Vue from "vue";

import { PessoaProvider } from "../pessoa-provider";
export default Vue.extend({
  data() {
    return {
      pessoaProvider: {} as PessoaProvider,
      isModalOpen: false,
      currentSelectedUser: "",
      requestResultValue: "texto a ser exibido",
      isToastyVisible: false,
      toastyBorderColor: "green",
    };
  },
  created() {
    const token = localStorage.getItem(AppKeys.tokenLogin);

    if (token) {
      this.pessoaProvider = new PessoaProvider(AppKeys.baseUrl, token);
    } else {
      this.$router.replace({ name: "LoginPage" });
    }
  },
  props: {
    items: {
      type: Array,
      default() {
        return [] as any[];
      },
    },
    requestResult: {
      type: String,
    },
  },
  methods: {
    // Verificar rota de deleção, pois a mesma retorna bad request
    openConfirmModal(data: any) {
      this.currentSelectedUser = data;
      this.isModalOpen = true;
    },
    closeConfirmModal() {
      this.currentSelectedUser = "";
      this.isModalOpen = false;
    },
    closeToasty() {
      this.isToastyVisible = false;
    },
    showToasty(toastyMessage: string, borderColor: string) {
      // Toasty apos fim da requisicao, informando
      // Se o usuario foi ou não excluído com sucesso
      this.isToastyVisible = true;
      this.requestResultValue = toastyMessage;
      this.toastyBorderColor = borderColor;

      // Após 5 segundos, o toasty desaparece
      setTimeout(() => {
        this.closeToasty();
      }, 5000);
    },
    deletePerson(currentPerson: any) {
      console.log(currentPerson);
      this.pessoaProvider
        .delete(currentPerson.cod_pessoa)
        .then(() => {
          this.showToasty(
            "O usuário selecionado foi deletado com sucesso",
            "green"
          );
          //this.$router.replace({ name: "AdminPage" });
        })
        .catch(() => {
          this.showToasty("Ocorreu um erro ao deletar o usuário", "red");
        });
    },
    redirectToEditPage() {
      // Não consegui a tempo pesquisar uma forma de passar
      // Os dados do usuario selecionado para a rota de edição
      // Consegui apenas criar a pagina
      this.$router.replace({ name: "EditPeoplePage" });
    },
  },
});
</script>

<style scoped>
.confirm-modal {
  padding: 3em;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex !important;
  flex-direction: column;
  align-items: center;
}

.btn-sustainer {
  display: flex;
  justify-content: center;
}

.modal-content {
  max-width: max-content;
  padding: 2em 3em 2em 3em;
}

.toasty {
  padding: 10px 1em;
  z-index: 10000;
  position: fixed;
  bottom: 0;
  right: 0;
  background: #fff;
  margin: 0px 10px 10px 0;
  border-radius: 5px;
}

.green-color {
  color: green;
  border: 1px solid green !important;
}
.red-color {
  color: red;
  border: 1px solid red !important;
}

button {
  position: static;
}

.table {
  margin-top: 20px;
}
</style>