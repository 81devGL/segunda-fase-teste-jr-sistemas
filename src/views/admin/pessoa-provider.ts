import IPersonData from '@/interfaces/IPersonData';
import axios from 'axios'
export class PessoaProvider {
  httpClient

  constructor(
    private readonly url: string,
    private readonly token: string,
  ) {

    this.httpClient = axios.create({
      baseURL: url,
      headers: {
        authorization: `Bearer ${token}`
      }
    })

  }

  async findAll(): Promise<any[]> {
    let items = [] as any[]
    try {
      const response = await this.httpClient({
        method: 'get',
        url: '/gbl/pessoas',
      });
      items = response.data


    } catch (error) {
      console.log('error', error)
    }

    return items
  }

  async findBySearch(search: string): Promise<any[]> {
    let items = [] as any[]
    try {
      const response = await this.httpClient({
        method: 'get',
        url: '/gbl/pessoas',
        params: {
          'filter': `contains(nome,"${search}")`
        }
      });
      items = response.data


    } catch (error) {
      console.log('error', error)
    }

    return items
  }

  async save(data: any) {
    // Const utilizando destructuring do JS, pegando cada propriedade vinda do objeto data
    const { personType, documentNumber, socialName, name, gender, nacionality, civilState, dtBirth, email } = data;

    // Atribuicao dos valores recebidos via parametros para a tipagem
    // Aceita pelo banco de dados
    const personObject: IPersonData = {
      "tipo_pessoa": personType,
      "cpf_cnpj": documentNumber,
      "razao_social": socialName,
      "nome": name,
      "sexo": gender,
      "nacionalidade": nacionality,
      "estado_civil": civilState,
      "dt_nascimento": dtBirth,
      "email": email
    }

    let person;

    // Bloco responsável por executar a requisição
    try {
      const response = await this.httpClient({
        method: 'post',
        url: '/gbl/pessoas',
        data: personObject
      })
      person = response.data;
    }

    // Em caso de erro, o mesmo é printado no console
    catch (error) {
      console.log('error', error)
    }

    // A variável people é retornada com os dados da requisição
    return person;
  }

  async delete(codPessoa: string) {
    console.log('teste' + codPessoa)
    let person;
    try {
      const response = await this.httpClient({
        method: 'delete',
        url: '/gbl/pessoas',
        data: codPessoa
      });
      console.log('pessoa cadastrada com sucesso');
      person = response.data;
    }
    catch (error) {
      console.log('error', error)
    }

    return person;

  }

}
