import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-word-modal',
  templateUrl: './word-modal.component.html',
  styleUrls: ['./word-modal.component.scss']
})
export class WordModalComponent implements OnInit {
  @Input() name;
  @Input() en;
  @Input() vn;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
  }
  sayItOutLoud() {
    const message = this.name;
    var speech = new SpeechSynthesisUtterance();
    speech.lang = "en-GB";
    speech.text = message;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
  
    window.speechSynthesis.speak(speech);
  }
  

}
