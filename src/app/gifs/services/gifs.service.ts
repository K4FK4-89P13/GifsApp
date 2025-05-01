import { HttpClient } from "@angular/common/http";
import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { environment } from "@environments/environment";
import type { GiphyResponse } from "../interfaces/giphy.interface";
import { Gif } from "../interfaces/gif.interface";
import { GifMapper } from "../mapper/gif.mapper";
import { map, tap } from "rxjs";


const loadFromLocalStorage = () => {
    const gifsFromLocalStorage = localStorage.getItem('gifs') ?? '{}';
    const gifs = JSON.parse(gifsFromLocalStorage);
    return gifs;
}

@Injectable({providedIn: 'root'})
export class GifsService{
    private http = inject(HttpClient);

    trendingGifs = signal<Gif[]>([]);
    trendingGifsLoading = signal(true);

    searchHistory = signal<Record<string, Gif[]>>( loadFromLocalStorage() );
    searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

    constructor() {
        this.loadTrendingGifs();
    }

    saveGifToLocalStorage = effect(() => {
        const historyString = JSON.stringify(this.searchHistory());
        localStorage.setItem('gifs', historyString);
    })

    loadTrendingGifs() {
        this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
            params: {
                api_key: environment.giphyApikey,
                limit: 20
            }
        }).subscribe(resp => {
            const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
            this.trendingGifs.set(gifs);
            this.trendingGifsLoading.set(false);
            console.log({gifs})
        })
    }

    searchGifs(query: string) {
        return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
            params: {
                api_key: environment.giphyApikey,
                q: query,
                limit: 20
            }
        }).pipe(
            map( ({ data }) => GifMapper.mapGiphyItemsToGifArray(data) ),

            //Historial
            tap(items => {
                this.searchHistory.update( history => ({
                    ...history,
                    [query.toLowerCase()]: items
                }))
            })
        )
        /* .subscribe(resp => {
            const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
            console.log({search: gifs});
            
        }) */
    }


    getHistoryGifs(query: string): Gif[] {
        return this.searchHistory()[query] ?? [];
    }
}