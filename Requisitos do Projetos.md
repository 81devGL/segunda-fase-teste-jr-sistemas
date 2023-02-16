# Requisitos do Projetos

1. [* Feito] - Criar uma página de formulário para cadastro e edição de pessoa (Utilizar rotas do vue para acesso da página)

   Exemplo de json para adicionar um novo cadastro

   ```
   {
      "tipo_pessoa": "F", pode ser J ou H
      "cpf_cnpj": "11111111111",
      "razao_social": "Usuário teste",
      "nome": "MIlene Naianny",
      "sexo": "M",
      "nacionalidade": "",
      "estado_civil": "N",
      "dt_nascimento": "1993-02-13",
      "email": "email@email.com"
   }
   ```

2. [* Feito] - Utilitar o componete FormInputComponent

   Ex.:

   ```
    <form-input-component label="CPF" v-model="pessoaDataForm.cpf" :error="pessoaDataError.cpf" :mask="###.###.###-##"></form-input-component>
   ```

3. [* Parcialmente feito] - Ao adicionar/editar um cadastro de pessoa voltar para tela inicial
4. [* Feito] - Antes de excluir registro, mostra uma mensagem de confirmação
5. [* Feito] - Ao clicar no link de "SAIR", apagar dados de token e voltar para tela de login
6. [* Feito] - Busca os dados do usuário logado para mostrar o nome na barra de navegação (Utilizar a classe PessoaAuthProvider)
