import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-new-chat',
  templateUrl: './dialog-new-chat.component.html',
  styleUrls: ['./dialog-new-chat.component.scss'],
})
export class DialogNewChatComponent implements OnInit {
  newChatFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogNewChatComponent>
  ) {
    this.initializeNewChatForm();
  }

  ngOnInit(): void {}

  /**
   * Создание нового чата
   */
  onSubmit() {
    if (this.newChatFormGroup.valid) {
      this.dialogRef.close(this.newChatFormGroup.value);
    }
  }

  /**
   * Инициализация формы нового чата
   */
  initializeNewChatForm() {
    this.newChatFormGroup = this.fb.group({
      chatName: ['', [Validators.required]],
      invitedLogin: ['', [Validators.required]],
    });
  }
}
