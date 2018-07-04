import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

// Módulo com todos os caminhos da aplicação
import { AppRoutingModule } from "./app-routing.module";

// Services
import { FiltrosService } from "./services/funcoes-service/filtros.service";
import { OrdenarTablesService } from "./services/funcoes-service/ordenar-tables.service";

// Services - API
import { UserServiceService } from "./services/user/user-service.service";
import { VinhoServiceService } from "./services/vinho/vinho-service.service";
import { CaixaServiceService } from "./services/caixa/caixa-service.service";
import { GarrafaServiceService } from "./services/garrafa/garrafa-service.service";
import { AuthService } from "./services/auth/auth.service";
import { RecuperarService } from "./services/mail/recuperar.service";
import { RegistoGarrafaService } from "./services/registo-garrafa/registo-garrafa.service";
import { RegistoCaixaService } from "./services/registo-caixa/registo-caixa.service";
import { EncomendaService } from "./services/encomenda/encomenda.service";

// Guards - Routing
import { AuthGuardsAdminService } from "./guards/auth-guards-admin.service";
import { AuthGuardsFuncService } from "./guards/auth-guards-func.service";
import { AuthGuardsHomeService } from "./guards/auth-guards-home.service";

import { AppComponent } from './app.component';

// Componentes - Home Page
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/home-page/login/login.component';
import { RecuperarComponent } from './components/home-page/recuperar/recuperar.component';

// Componentes - Home Administrador
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { CaixasAdminComponent } from './components/home-admin/caixas-admin/caixas-admin.component';
import { InserirCaixaAdminComponent } from './components/home-admin/caixas-admin/inserir-caixa-admin/inserir-caixa-admin.component';
import { EditarCaixaAdminComponent } from './components/home-admin/caixas-admin/editar-caixa-admin/editar-caixa-admin.component';
import { ContasAdminComponent } from './components/home-admin/contas-admin/contas-admin.component';
import { InserirContaAdminComponent } from './components/home-admin/contas-admin/inserir-conta-admin/inserir-conta-admin.component';
import { EditarContaAdminComponent } from './components/home-admin/contas-admin/editar-conta-admin/editar-conta-admin.component';
import { GarrafasAdminComponent } from './components/home-admin/garrafas-admin/garrafas-admin.component';
import { InserirGarrafaAdminComponent } from './components/home-admin/garrafas-admin/inserir-garrafa-admin/inserir-garrafa-admin.component';
import { EditarGarrafaAdminComponent } from './components/home-admin/garrafas-admin/editar-garrafa-admin/editar-garrafa-admin.component';
import { VinhosAdminComponent } from './components/home-admin/vinhos-admin/vinhos-admin.component';
import { InserirVinhoAdminComponent } from './components/home-admin/vinhos-admin/inserir-vinho-admin/inserir-vinho-admin.component';
import { EditarVinhoAdminComponent } from './components/home-admin/vinhos-admin/editar-vinho-admin/editar-vinho-admin.component';

// Componentes - Home Funcionário
import { HomeFuncComponent } from './components/home-func/home-func.component';
import { CaixasFuncComponent } from './components/home-func/caixas-func/caixas-func.component';
import { InserirRemoverCaixaFuncComponent } from './components/home-func/caixas-func/inserir-remover-caixa-func/inserir-remover-caixa-func.component';
import { EditarCaixaFuncComponent } from './components/home-func/caixas-func/editar-caixa-func/editar-caixa-func.component';
import { GarrafasFuncComponent } from './components/home-func/garrafas-func/garrafas-func.component';
import { InserirRemoverGarrafasFuncComponent } from './components/home-func/garrafas-func/inserir-remover-garrafas-func/inserir-remover-garrafas-func.component';
import { EditarGarrafasFuncComponent } from './components/home-func/garrafas-func/editar-garrafas-func/editar-garrafas-func.component';
import { AlterarPassFuncComponent } from './components/home-func/alterar-pass-func/alterar-pass-func.component';
import { EncomendasFuncComponent } from './components/home-func/encomendas-func/encomendas-func.component';
import { InserirEncomendaFuncComponent } from './components/home-func/encomendas-func/inserir-encomenda-func/inserir-encomenda-func.component';
import { StockFuncComponent } from './components/home-func/stock-func/stock-func.component';
import { GarrafasStockFuncComponent } from './components/home-func/stock-func/garrafas-stock-func/garrafas-stock-func.component';
import { CaixasStockFuncComponent } from './components/home-func/stock-func/caixas-stock-func/caixas-stock-func.component';
import { VerEncomendaFuncComponent } from './components/home-func/encomendas-func/ver-encomenda-func/ver-encomenda-func.component';

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        LoginComponent,
        HomeAdminComponent,
        CaixasAdminComponent,
        InserirCaixaAdminComponent,
        EditarCaixaAdminComponent,
        ContasAdminComponent,
        InserirContaAdminComponent,
        EditarContaAdminComponent,
        GarrafasAdminComponent,
        InserirGarrafaAdminComponent,
        EditarGarrafaAdminComponent,
        VinhosAdminComponent,
        InserirVinhoAdminComponent,
        EditarVinhoAdminComponent,
        HomeFuncComponent,
        CaixasFuncComponent,
        InserirRemoverCaixaFuncComponent,
        EditarCaixaFuncComponent,
        GarrafasFuncComponent,
        InserirRemoverGarrafasFuncComponent,
        EditarGarrafasFuncComponent,
        AlterarPassFuncComponent,
        RecuperarComponent,
        EncomendasFuncComponent,
        InserirEncomendaFuncComponent,
        StockFuncComponent,
        GarrafasStockFuncComponent,
        CaixasStockFuncComponent,
        VerEncomendaFuncComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        NgxPaginationModule,
        HttpClientModule,
        HttpModule
    ],
    providers: [
        FiltrosService,
        OrdenarTablesService,
        UserServiceService,
        VinhoServiceService,
        CaixaServiceService,
        GarrafaServiceService,
        AuthService,
        AuthGuardsAdminService,
        AuthGuardsFuncService,
        AuthGuardsHomeService,
        RecuperarService,
        RegistoGarrafaService,
        RegistoCaixaService,
        EncomendaService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
