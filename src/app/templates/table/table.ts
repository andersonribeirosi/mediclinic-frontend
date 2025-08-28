import { CommonModule } from '@angular/common';
import { Component, Input, ContentChild, TemplateRef } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Interface que define a estrutura das colunas da tabela
export interface TableColumn {
  key: string;   // chave do objeto de dados que será exibida na coluna
  label: string; // texto do cabeçalho da coluna
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './table.html',
  styleUrls: ['./table.scss'],
})
export class TableComponent {
  // ---------------- INPUTS ----------------
  @Input() columns: TableColumn[] = [];     // colunas da tabela
  @Input() data: any[] = [];               // dados que serão exibidos
  @Input() loading = false;                // estado de carregamento
  @Input() errorMessage = '';              // mensagem de erro
  @Input() emptyMessage = 'Nenhum registro encontrado.'; // mensagem caso não haja dados


  // Template passado pelo pai para renderizar colunas de forma customizada
  @ContentChild('customTemplates') customTemplates?: TemplateRef<any>;
  
  // ---------------- CONTENT CHILD ----------------
  // Template passado pelo pai para renderizar ações customizadas
  @ContentChild('actionsTemplate') actionsTemplate?: TemplateRef<any>;

  // ---------------- FUNÇÃO AUXILIAR ----------------
  // Retorna as chaves das colunas, adicionando 'acoes' se existir template de ações
  get displayedColumns(): string[] {
    const keys = this.columns.map(c => c.key);
    return this.actionsTemplate ? [...keys, 'acoes'] : keys;
  }
}
