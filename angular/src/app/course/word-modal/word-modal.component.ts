import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from '@abp/ng.core';
import { HttpClient,HttpHeaders, HttpClientModule } from "@angular/common/http";

@Component({
  selector: 'app-word-modal',
  templateUrl: './word-modal.component.html',
  styleUrls: ['./word-modal.component.scss']
})


export class WordModalComponent implements OnInit {
  @Input() name;
  @Input() en;
  @Input() vn;
  dictionaryHTML;

  
  constructor(public activeModal: NgbActiveModal,
    private http: HttpClient,
    private restService: RestService) {}

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
