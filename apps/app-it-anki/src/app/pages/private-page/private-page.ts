import { Component, inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-private-page',
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './private-page.html',
  styleUrl: './private-page.css',
})
export class PrivatePage {
  readonly usersService = inject(UsersService);
}
