import { Subject } from "rxjs";
import { Message } from "../dashboard/shared/message";
import { Injectable } from "@angular/core";

@Injectable()
export class ChatService {
    audioFile = new Audio(
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/success.mp3"
        // "src/app/dashboard/shared/resources/notifications-sound.mp3"
    );
    constructor() { }

    conversation = new Subject<Message[]>();

    messageMap: any = {
        "Hi": "Hello",
        "Who are you": "My name is Agular Bot",
        "What is Angular": "Angular is the best framework ever",
        "default": "I can't understand. Can you please repeat"
    };

    getBotAnswer(msg: string) {
        // Here write API code
        const userMessage = new Message("user", msg);
        this.conversation.next([userMessage]);
        const botMessage = new Message("bot", this.getBotMessage(msg));

        setTimeout(() => {
            this.playFile();
            this.conversation.next([botMessage]);
        }, 1500);
    }

    playFile() {
        this.audioFile.play();
    }

    getBotMessage(question: string) {
        let answer = this.messageMap[question];
        return answer || this.messageMap["default"];

    }
}