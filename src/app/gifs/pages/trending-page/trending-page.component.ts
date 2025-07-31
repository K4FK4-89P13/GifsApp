import { Component, computed, ElementRef, inject, output, viewChild } from '@angular/core';
import { GifsListComponent } from "../../components/gifs-list/gifs-list.component";
import { GifsService } from '../../services/gifs.service';


@Component({
  selector: 'app-trending-page',
  imports: [GifsListComponent],
  templateUrl: './trending-page.component.html',
  styles: ``
})
export default class TrendingPageComponent {
  
  gifService = inject(GifsService);

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  public onScroll(event: Event){
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if(!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;

    // console.log({scrollTop, clientHeight});
    const isABottom = scrollTop + clientHeight + 300 >= scrollHeight;
    //console.log({isABottom});
    
    if (isABottom) {
      this.gifService.loadTrendingGifs();
    }    
  }
}
