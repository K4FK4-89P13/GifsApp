import { Component, inject, signal, Signal } from '@angular/core';
import { GifsListComponent } from "../../components/gifs-list/gifs-list.component";
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifsListComponent],
  templateUrl: './search-page.component.html',
  styles: ``
})
export default class SearchPageComponent {
  
  gifs = signal<Gif[]>([]);
  gifService = inject(GifsService);

  public onSearch(query: string) {
    this.gifService.searchGifs(query).subscribe(resp => {
      this.gifs.set(resp);
    });    
  } // End method
}
