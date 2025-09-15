import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { JsonPipe } from '@angular/common';
import { PostDto } from 'shared-types';

@Component({
  imports: [RouterModule, JsonPipe],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.less',
})
export class App {
  protected title = 'app-it-anki';

  private readonly http = inject(HttpClient);

  responseBackend = toSignal(this.http.get<Array<PostDto>>('http://localhost:3000/api/posts'));
}
