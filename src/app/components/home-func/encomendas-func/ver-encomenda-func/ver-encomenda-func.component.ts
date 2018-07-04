import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from "rxjs/Observable";
import { Subscription } from 'rxjs/Subscription';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

import { Encomenda, EncomendaVer, EncomendaAlterar } from '../../../../interfaces/encomenda';

import { EncomendaService } from '../../../../services/encomenda/encomenda.service';

@Component({
	selector: 'app-ver-encomenda-func',
	templateUrl: './ver-encomenda-func.component.html',
	styleUrls: ['./ver-encomenda-func.component.css']
})
export class VerEncomendaFuncComponent implements OnInit, OnDestroy {
	DadosEncomendaForm: FormGroup;
	// Encomenda selecionada
	id: number;
	private sub: any;
	// Encomenda selecionada
	encomenda: Encomenda;
	// Lista auxiliar
	encomendasSelecionadas: EncomendaVer[] = [];
	// Lista de encomendas
	encomendas: Encomenda[] = [];
	// Lista de encomendas a ler da BD
	encomendaVinhoCaixaGarrafaQntGarrafaETipoCaixa: EncomendaVer[] = [];
	// Lista de caixas normais
	encomendaTipoCaixaNormais: EncomendaVer[] = [];
	// Lista de caixas especiais
	encomendaTipoCaixaEspeciais: EncomendaVer[] = [];
	entregarE: boolean = false;
	
	private subEncomenda: Subscription;	
	private subEncomendaVinhoCaixaGarrafaQntGarrafaETipoCaixa: Subscription;	

	constructor( 
		private fb: FormBuilder,
		private route: ActivatedRoute, 
		private router: Router, 
		private encomendaService: EncomendaService
	) { 
		this.DadosEncomendaForm = fb.group({
			'nFatura': ['', Validators.min(1)],
			'comentario': ['', Validators.maxLength(200)]
		});
	}

	ngOnInit() {
		// Subscrição dos parametros do modelo da caixa escolhido para editar
		this.sub = this.route.params.subscribe(
			params => { this.id = +params['id']; }
		)
		this.getEncomenda();
		this.getEncomendaVinhoCaixaGarrafaQntGarrafaETipoCaixa();
	}

	ngOnDestroy(){
		this.subEncomenda.unsubscribe();
		this.subEncomendaVinhoCaixaGarrafaQntGarrafaETipoCaixa.unsubscribe();;
	}

	// Subcrição do service EncomendaService e obtenção dos dados de todos as encomendas provenientes da BD
	getEncomenda(){
		this.subEncomenda = this.encomendaService.getEncomendas().subscribe(
			data => { 
				this.encomendas = data;
			},
			err => console.error(err),
			() => {
				this.encomenda = this.encomendas.find(x => x.Id == this.id);
				this.resetForm(this.encomenda);
			}
		);
	}

	// Subcrição do service EncomendaService e obtenção dos dados de todas as encomendas provenientes da BD
	getEncomendaVinhoCaixaGarrafaQntGarrafaETipoCaixa(){
		this.subEncomendaVinhoCaixaGarrafaQntGarrafaETipoCaixa = this.encomendaService.getEncomendaVinhoCaixaGarrafaQntGarrafaETipoCaixa().subscribe(
			data => { 
				this.encomendaVinhoCaixaGarrafaQntGarrafaETipoCaixa = data 
			},
			err => console.error(err),
			() => {				
				this.encomendasSelecionadas = this.encomendaVinhoCaixaGarrafaQntGarrafaETipoCaixa.filter(x => x.Id == this.id);
				this.encomendaTipoCaixaNormais = this.encomendasSelecionadas.filter(x => x.TipoCaixa === "N");
				this.encomendaTipoCaixaEspeciais = this.encomendasSelecionadas.filter(x => x.TipoCaixa === "E");
			}
		);
	}

	// Eliminar encomenda por Id e recarregamento dos dados de todas as encomendas provenientes da BD
	deleteEncomendaById(id: number){
		const deleteEncomenda = this.encomendaService.deleteEncomendaById(id).subscribe(
			data => data,
			err => console.error(err),
			() => {
				setTimeout(() => {
					alert("A encomenda foi eliminada com sucesso!");
					this.router.navigate(['/func/encomendas']);			
				}, 500);
			}
		);		
	}

	// Editar uma encomenda selecionado
	editarEncomenda(editEncomenda){
		const editRegistoGarrafas = this.encomendaService.editEncomenda(editEncomenda).subscribe(
			data => data,
			err => console.error(err),
			() => {
				setTimeout(() => {
					alert("A encomenda foi finalizada com sucesso!");
					this.router.navigate(['/func/encomendas']);			
				}, 500);
			}
		);
	}

	// Entregar Encomenda
	entregarEncomenda(){
		if (this.entregarE == true){
			var editEncomenda: EncomendaAlterar = {
				Id: this.id,
				Estado: 1,
				NFatura: this.DadosEncomendaForm.get('nFatura').value,
				Comentario: this.DadosEncomendaForm.get('comentario').value,
				DataEntrega: new Date().toISOString().slice(0, 19).replace('T', ' ')
			}
			this.editarEncomenda(editEncomenda);
		}
		else this.entregarE = true;
	}

	// Eliminar Encomenda
	eliminarEncomenda(){
		if (confirm("Quer mesmo eliminar esta encomenda?")) this.deleteEncomendaById(this.id);
	}

	// Coloca a form com os dados pre-selecionados
	resetForm(enc: Encomenda){
		this.DadosEncomendaForm.controls['nFatura'].setValue(enc.NFatura);
		this.DadosEncomendaForm.controls['comentario'].setValue(enc.Comentario);
	}

}