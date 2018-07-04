import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { Observable } from "rxjs/Observable";
import { Subscription } from 'rxjs/Subscription';

import { User, UserSId } from '../../../../interfaces/user';

import { ValidatorPassword, ValidatorUsername, ValidatorEmail } from '../../../../validators/validator-login';

import { UserServiceService } from '../../../../services/user/user-service.service';
import { RecuperarService } from '../../../../services/mail/recuperar.service';

@Component({
	selector: 'app-inserir-conta-admin',
	templateUrl: './inserir-conta-admin.component.html',
	styleUrls: ['./inserir-conta-admin.component.css']
})
export class InserirContaAdminComponent implements OnInit, OnDestroy {
	UserForm: FormGroup;
	// Lista de utilizadores a ler da BD
	users: User[] = [];

	private subUser: Subscription;

	constructor( 
		private router: Router, 
		private fb: FormBuilder, 
		private userService: UserServiceService,
		private recuperarService: RecuperarService
	) { }

	ngOnInit() {
		this.getUsers();
		this.iniUserForm();
	}

	ngOnDestroy(){
		this.subUser.unsubscribe();
	}

	// Subcrição do service UserService e obtenção dos dados de todos os utilizadores provenientes da BD
	getUsers(){
		this.subUser = this.userService.getUsers().subscribe(
			data => { 
				this.users = data 
			},
			err => console.error(err),
			() => {
				this.iniUserForm();
			}
		);
	}

	// Inserir novo utilizador
	createUser(newUser: UserSId){
		const createUsers = this.userService.createUser(newUser).subscribe(
			data => data,
			err => console.error(err),
			() => {
				setTimeout(() => {
					this.sendMail(newUser);
					alert("O Utilizador foi criado com sucesso!");
					this.router.navigate(['/admin/contas']);					
				}, 500);
			}
		);
	}

	// Subscrição do service RecuperarService para enviar email com novas credenciais
	sendMail(user: UserSId){
		const senMails = this.recuperarService.registoUtilizador(user).subscribe(
			data => data,
			err => console.error(err)
		);
	}

	// Inicializa o objeto form UserForm
	iniUserForm(){
		this.UserForm = this.fb.group({
			'email': ['', [Validators.required, Validators.email, ValidatorEmail(this.users)]],
			'username': ['', [Validators.required, Validators.minLength(5), ValidatorUsername(this.users)]]
			}
		);
	}

	// Novo utilizador após verificações
	novaConta(form){
		var novaPass: string =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
		var newUser: UserSId = {
			Email: form.email,
			Username: form.username,
			_Password: novaPass,
			TipoUtilizador: 1
		}
		this.createUser(newUser);
	}

	// Limpa os dados do Formulário
	clearDados(){
		this.clearForm();
	}

	// Função que limpa os dados do form UserForm
	clearForm(){
		this.UserForm.controls['email'].reset('');
		this.UserForm.controls['username'].reset('');
		this.UserForm.markAsUntouched();
	}
}