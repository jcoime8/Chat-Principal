import { NgFor } from '@angular/common';
import { Component, signal } from '@angular/core';
import { NgForm } from '@angular/forms';

interface CardInfo {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-acerca-nosotros',
  imports: [NgFor],
  templateUrl: './acerca-nosotros.html',
  styleUrl: './acerca-nosotros.css'
})
export class AcercaNosotros {
  intro = signal({
    title: '🤖 Acerca de ChatBotPro',
    description: 'En ChatBotPro desarrollamos chatbots inteligentes que transforman la forma en que las empresas interactúan con sus clientes. Desde pequeñas startups hasta grandes corporaciones, ayudamos a automatizar procesos, aumentar ventas y mejorar la experiencia del usuario.'
  });

  cards = signal<CardInfo[]>([
    {
      title: 'Nuestra Visión',
      description: 'Ser la empresa líder en soluciones de automatización de atención al cliente en Latinoamérica.',
      icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
    },
    {
      title: 'Nuestra Misión',
      description: 'Desarrollar chatbots inteligentes que mejoren la comunicación entre empresas y clientes.',
      icon: 'https://cdn-icons-png.flaticon.com/512/744/744465.png'
    },
    {
      title: 'Nuestros Valores',
      description: 'Innovación, Transparencia, Excelencia y Trabajo en equipo.',
      icon: 'https://cdn-icons-png.flaticon.com/512/1828/1828817.png'
    }
  ]);
}
