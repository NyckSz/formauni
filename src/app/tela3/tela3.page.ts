import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tela3',
  standalone: true,
  templateUrl: './tela3.page.html',
  styleUrls: ['./tela3.page.scss'],
  imports: [CommonModule, IonicModule, RouterModule, FormsModule],
})
export class Tela3Page implements OnInit {
  cidade: string = 'São Paulo';
  favorita: string | null = null;
  clima: any;
  carregando = true;

  cidades = [
    'São Paulo',
    'Rio de Janeiro',
    'Brasília',
    'Salvador',
    'Belo Horizonte',
    'Curitiba',
    'Recife',
    'Porto Alegre',
    'Fortaleza',
    'Manaus',
  ];

  constructor(private http: HttpClient, private alertCtrl: AlertController) {}

  ngOnInit() {
    const salva = localStorage.getItem('cidadeFavorita');
    if (salva) {
      this.cidade = salva;
      this.favorita = salva;
    }
    this.buscarCidade();
  }

  buscarCidade() {
    this.carregando = true;
    const chave =' 524dba05065b4f2ba5e22933250405';
    this.http
      .get(`https://api.weatherapi.com/v1/current.json?key=${chave}&q=${this.cidade}&lang=pt`)
      .subscribe({
        next: (res) => {
          this.clima = res;
          this.carregando = false;
        },
        error: async (err) => {
          this.carregando = false;
          const alert = await this.alertCtrl.create({
            header: 'Erro',
            message: err.error?.error?.message || 'Erro ao buscar clima',
            buttons: ['OK'],
          });
          await alert.present();
        },
      });
  }

  async favoritarCidade() {
    localStorage.setItem('cidadeFavorita', this.cidade);
    this.favorita = this.cidade;

    const alert = await this.alertCtrl.create({
      header: 'Favorito',
      message: `"${this.cidade}" foi salva como cidade favorita!`,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
