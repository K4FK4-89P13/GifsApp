import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { GifsService } from '../../services/gifs.service';
import { GifsListComponent } from "../../components/gifs-list/gifs-list.component";

@Component({
  selector: 'gif-history',
  imports: [GifsListComponent],
  templateUrl: './gif-history.component.html',
  styles: ``
})
export default class GifHistoryComponent {

  /* query = inject(ActivatedRoute).params.subscribe(params => {
    console.log(params['key']);
  }); */
  gifService = inject(GifsService);

  query = toSignal( inject(ActivatedRoute).params.pipe(map(params => params['key'])) );

  gifsByKey = computed(() => this.gifService.getHistoryGifs(this.query()));
}
