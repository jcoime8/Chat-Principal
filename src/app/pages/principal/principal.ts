import { CommonModule } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from "@angular/router";

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  time: string;
}

@Component({
  selector: 'app-principal',
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './principal.html',
  styleUrl: './principal.css'
})
export class Principal implements AfterViewChecked {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  messages: Message[] = [];
  messageInput = '';
  nextId = 1;

  predefinedQuestions = [
    '¿Cuál es el horario de atención?',
    '¿Qué planes ofrecen?',
    '¿Integran con WhatsApp?',
    '¿Cómo solicito soporte?'
  ];

  constructor(private cdRef: ChangeDetectorRef) {
    // Mensaje inicial del bot
    this.pushBot('Hola 👋, soy ChatBotPro. Prueba seleccionando una pregunta rápida o escribe un mensaje de ejemplo.');
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private nowTime(): string {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  private pushBot(text: string) {
    this.messages.push({ id: this.nextId++, text, sender: 'bot', time: this.nowTime() });
  }

  private pushUser(text: string) {
    this.messages.push({ id: this.nextId++, text, sender: 'user', time: this.nowTime() });
  }

  sendMessage() {
    const text = (this.messageInput || '').trim();
    if (!text) return;
    this.pushUser(text);
    this.messageInput = '';
    this.mockBotResponse(text);
  }

  sendPredefined(q: string) {
    this.pushUser(q);
    this.cdRef.detectChanges(); // Forzar detección de cambios
    this.mockBotResponse(q);
  }

  private mockBotResponse(userText: string) {
    // Respuestas simples y mapeadas según la pregunta
    const lower = userText.toLowerCase();
    let reply = 'Lo siento, no entendí eso. Pero puedo mostrarte los planes y ejemplos.';

    if (lower.includes('horario')) {
      reply = 'Nuestro horario: Lunes a Viernes 08:00 - 18:00. Soporte 24/7 (solo chat automatizado).';
    } else if (lower.includes('plan') || lower.includes('planes')) {
      reply = 'Planes: Básico (chat simple), Pro (analytics + integraciones), Empresarial (SLA y atención dedicada).';
    } else if (lower.includes('whatsapp') || lower.includes('whats')) {
      reply = 'Sí, ofrecemos integración con WhatsApp Business API y respuestas automáticas con plantillas.';
    } else if (lower.includes('soporte')) {
      reply = 'Para soporte: soporte@tudominio.com o solicita un ticket desde el panel.';
    } else if (lower.includes('demo') || lower.includes('probar')) {
      reply = 'Puedes probar la demo gratis por 14 días. ¿Quieres que te contacte un asesor?';
    }

    // Simular "pensando" y luego respuesta
    setTimeout(() => {
      this.pushBot(reply);
    }, 100 + Math.random() * 100);
  }

  private scrollToBottom(): void {
    try {
      const el = this.scrollContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    } catch (err) { /* silencioso */ }
  }
}