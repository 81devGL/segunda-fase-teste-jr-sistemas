import axios from 'axios'

export class LoginProvider {  
  httpClient

  constructor(
    private readonly url: string,    
  ) {

    this.httpClient = axios.create({
      baseURL: url,      
    })

  }
  async login(login: string, password: string): Promise<string> {
    try {
      const hash = btoa(login + ':' + password);

      const response = await this.httpClient({
        method: 'post',
        headers: { "Authorization": `Basic ${hash}` },
        url: '/login',
      });              

      return response.data.token as string
    } catch (error: any) {
      console.log(error.response);
      return ''
    }

  }
}
