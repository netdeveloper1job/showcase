import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
@Injectable()
export class Configuration {
 public Server = 'http://securetruckparking.info/securetruckparking_api';
 public imagespath = 'http://securetruckparking.info/securetruckparking_api';
    public ApiUrl = '/';
    public ServerWithApiUrl = this.Server + this.ApiUrl;
    public imagepathurl = this.imagespath + this.ApiUrl;

	public headersfor = {
          headers: new Headers({
            'Client-Service': 'abc',
            'Auth-Key': 'abc'
          })
        }
}