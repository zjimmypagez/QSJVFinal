import { ValidatorFn, AbstractControl } from '@angular/forms';

import { Garrafa, GarrafaEVinho } from '../interfaces/garrafa';
import { RegistoGarrafa } from '../interfaces/registoGarrafa';

// Validator que garante que foi inserido pelo menos um dos campos, c/rotulo e s/rotulo
export function ValidatorGarrafa (control: AbstractControl) {
    const cRotulo = control.get('cRotulo').value;
    const sRotulo = control.get('sRotulo').value;
    if (cRotulo == null && sRotulo == null) return { ValidGarrafa: true }
    if (cRotulo + sRotulo == 0) return { ValidInserir: true }
    return null;
}

// Validator que verifica se a quantidade c/rotulo a remover, tem correspondencia em stock
export function ValidatorCRotulo(garrafas: GarrafaEVinho[], op: AbstractControl): ValidatorFn{
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        const idGarrafa = op.get('idGarrafa').value;
        var garrafa: GarrafaEVinho = garrafas.find(x => x.Id == idGarrafa);
        if (garrafa == undefined) return { 'WaitingModelo': true }
        if (idGarrafa == "") return { 'WaitingModelo': true }
        if (garrafa.CRotulo < control.value) return { 'ValidRemoverCRotulo': true };     
        return null;
    };
}

// Validator que verifica se a quantidade s/rotulo a remover, tem correspondencia em stock
export function ValidatorSRotulo(garrafas: GarrafaEVinho[], op: AbstractControl): ValidatorFn{
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        const idGarrafa = op.get('idGarrafa').value;
        var garrafa: GarrafaEVinho = garrafas.find(x => x.Id == idGarrafa);
        if (garrafa == undefined) return { 'WaitingModelo': true }
        if (idGarrafa == "") return { 'WaitingModelo': true }
        if (garrafa.SRotulo < control.value) return { 'ValidRemoverSRotulo': true };        
        return null;
    };
}

// Validator que verifica se existe quantidade de garrafas s/rotulo para rotular
export function ValidatorRotular(garrafas: GarrafaEVinho[], op: AbstractControl): ValidatorFn{
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        const idGarrafa = op.get('idGarrafa').value;
        var garrafa: GarrafaEVinho = garrafas.find(x => x.Id == idGarrafa);
        if (garrafa == undefined) return { 'WaitingModelo': true }
        if (idGarrafa == "") return { 'WaitingModelo': true }
        if (control.value == null) return { 'WaitingCRotulo': true }
        if (garrafa.SRotulo < control.value) return { 'ValidRemoverSRotulo': true };        
        return null;
    };
}

// Validator que verifica se o comentário não foi alterado
export function ValidatorComentario(registo: RegistoGarrafa): ValidatorFn{
    return (control: AbstractControl) : { [key: string]: boolean } | null => {
        if (registo == undefined) return { 'WaitingModelo': true }
        if (control.value == registo.Comentario) return { 'ComentarioInalterado': true }
        return null;
    };
}

// Validator que verifica se o modelo de garrafa inserido já existe
export function ValidatorModelo(garrafas: Garrafa[]): ValidatorFn{
    return (control: AbstractControl) : { [key: string]: boolean } | null => {
        const cuba = control.get('cuba').value;
        const ano = control.get('ano').value;
        const tipoVinho = control.get('tipoVinho').value;
        const capacidade = control.get('capacidade').value;
        var existe: boolean = false;
        for (let i = 0; i < garrafas.length; i++){
            if (cuba == garrafas[i].Pipa && ano == garrafas[i].Ano && tipoVinho == garrafas[i].TipoDeVinho_ID && capacidade == garrafas[i].Capacidade) existe = true ;
        }        
        if (existe) return { 'ValidatorModelo': true }
        return null;
    };
}