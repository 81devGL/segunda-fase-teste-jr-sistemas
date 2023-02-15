<template>
  <div>
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
          <button class="btn btn-info">Editar</button>
          <button class="btn btn-danger" @click="deletePerson(item)">
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
  },
  methods: {
    // Verificar rota de deleção, pois a mesma retorna bad request
    deletePerson(currentPerson: any) {
      console.log(currentPerson);
      this.pessoaProvider.delete(currentPerson.cod_pessoa).then(() => {
        this.$router.replace({ name: "AdminPage" });
      });
    },
  },
});
</script>

<style scoped>
.table {
  margin-top: 20px;
}
</style>