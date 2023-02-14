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

  // save(data) {}

  // delete(codPessoa) {}

}
