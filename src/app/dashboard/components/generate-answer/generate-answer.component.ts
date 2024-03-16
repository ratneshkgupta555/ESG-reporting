import { Component, OnInit } from '@angular/core';
import { Message } from '../../shared/message';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-generate-answer',
  templateUrl: './generate-answer.component.html',
  styleUrls: ['./generate-answer.component.scss']
})
export class GenerateAnswerComponent implements OnInit {

  messages: Message[] = [];
  value: any = null;

  constructor(public chatService: ChatService) { }

  ngOnInit() {
      this.chatService.conversation.subscribe((val: any) => {
      this.messages = this.messages.concat(val);
    });
  }

  sendMessage() {
    this.chatService.getBotAnswer(this.value);
    this.value = '';
  }

}
