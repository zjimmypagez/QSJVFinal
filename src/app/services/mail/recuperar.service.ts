import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { User, UserSId } from '../../interfaces/user';

const httpOptions = {
	headers: new Headers({
		'Content-Type': 'application/json'
	})
};

@Injectable()
export class RecuperarService {
	private apiName: string = "http://localhost:3003/";

	constructor( private http: Http ) { }

	registoUtilizador(user: UserSId){
		let body = JSON.stringify({
			to: user.Email,
			username: user.Username,
			password: user._Password
		});
		return this.http.post(this.apiName + 'registoUtilizador', body, httpOptions);
	}
	
	recuperarPassword(user: User){
		let body = JSON.stringify({
			to: user.Email,
			username: user.Username,
			userID: user.Id
		});
		return this.http.post(this.apiName + 'recuperarPassword', body, httpOptions);
	}

	avisoEncomenda(email: string[]){
		let body = JSON.stringify({
			to: email
		});
		return this.http.post(this.apiName + 'avisoEncomenda', body, httpOptions);
	}

}
