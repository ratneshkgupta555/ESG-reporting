import { Subject } from "rxjs";
import { Message } from "../dashboard/shared/message";
import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { API_URL } from "./serviceconstant";

@Injectable()
export class ChatService {

    yearOfReport: any = null;
    isQuestionAsked: any = false;
    askedQuestion: string = ""
    audioFile = new Audio(
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/success.mp3"
        // "src/app/dashboard/shared/resources/notifications-sound.mp3"
    );
    constructor(
        private snackBar: MatSnackBar,
        private apiService: ApiService
    ) { }

    conversation = new Subject<Message[]>();

    messageMap: any = {
        "hi": "Please enter report year",
        "hello": "Please enter report year",
        "who are you": "I am your bot, How can I assist you ",
        "what is angular": "Angular is the best framework ever",
        "default": "I can't understand. Can you please repeat"
    };

    getBotAnswer(msg: string) {
        // Here write API code
        if (this.isQuestionAsked) {
            this.askedQuestion = msg;
            const payload = {
                reportYear: this.yearOfReport,
                inputQuestion: this.askedQuestion
            }
            this.apiService.postAPI(API_URL.GENERATE_ANSWER, payload).subscribe({
                next: (response: any) => {
                    if(response) {
                        this.snackBar.open('Reports upload successfully !', 'success', {
                            duration: 3000
                        });
                        this.calculatingBotAnswer(response.questionnireSummary.response);
                    } else {
                        this.calculatingBotAnswer(msg);
                    }
                   
                }, error: (err: any) => {
                    this.snackBar.open('Something went wrong !', 'error', {
                        duration: 3000
                    });
                    this.calculatingBotAnswer(msg);
                }
            })
            this.isQuestionAsked = false;
        } else {
            this.askedQuestion = "";
            this.calculatingBotAnswer(msg);
        }

        
    }

    private calculatingBotAnswer(msg: string) {
        const userMessage = new Message("user", msg.toLowerCase());
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
        if (this.isQuestionAsked) {
            this.askedQuestion = question;
            this.isQuestionAsked = false;
        }
        if (question.length === 4 && +question >= 1900 && +question <= 2024) {
            this.yearOfReport = +question;
            this.isQuestionAsked = true;
            return "Please enter your question";
        }
        let answer = this.messageMap[question.toLowerCase().trim()];
        return answer || this.messageMap["default"];

    }

}