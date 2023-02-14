import axios from 'axios'
export class PessoaAuthProvider {
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

  async find(): Promise<any> {
    try {
      const response = await this.httpClient({
        method: 'get',       
        url: '/usuarios/dados',
      });
      return response.data


    } catch (error) {
      console.log('error', error)
    }

    return {}
  }
}
