import { Component, computed, inject, output } from '@angular/core';
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
}
