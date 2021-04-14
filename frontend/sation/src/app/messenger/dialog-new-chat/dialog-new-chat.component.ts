import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Chat } from 'src/app/shared/models/chat.model';

@Component({
  selector: 'app-dialog-new-chat',
  templateUrl: './dialog-new-chat.component.html',
  styleUrls: ['./dialog-new-chat.component.scss']
})
export class DialogNewChatComponent implements OnInit {

  newChatFormGroup: FormGroup;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<DialogNewChatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Chat) {
    this.initializeLoginForm();
  }

  ngOnInit(): void {

  }

  onSubmit() {
  }

  initializeLoginForm() {
    this.newChatFormGroup = this.fb.group({
      "chatName": ["", [Validators.required]],
    });
  }

  createChat() {
    if (this.newChatFormGroup.valid) {
      console.log(this.newChatFormGroup.value);
      this.dialogRef.close();
    }
  }

}
