import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { PokeCardComponent } from './components/poke-card/poke-card.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { MovesComponent } from './pages/moves/moves.component';
import { ItensComponent } from './pages/itens/itens.component';
import { BerriesComponent } from './pages/berries/berries.component';
import { LocationComponent } from './pages/location/location.component';
import { PokemonDetailsComponent } from './pages/pokemon-details/pokemon-details.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { MemoryGameComponent } from './components/memorygame/memorygame.component';
import { MoveCardComponent } from './components/move-card/move-card.component';
import { GameComponent } from './pages/game/game.component';
import { MenuGameComponent } from './components/menu-game/menu-game.component';
import { CatchgameComponent } from './components/catchgame/catchgame.component';
import { CardsgameComponent } from './components/cardsgame/cardsgame.component';
import { GameCardComponent } from './components/game-card/game-card.component';
import { GameCardsComponent } from './pages/game-cards/game-cards.component';
import { GameCatchComponent } from './pages/game-catch/game-catch.component';
import { GameMemoryComponent } from './pages/game-memory/game-memory.component';


@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    MenuBarComponent,
    PokeCardComponent,
    HomeComponent,
    MovesComponent,
    ItensComponent,
    BerriesComponent,
    LocationComponent,
    PokemonDetailsComponent,
    ItemCardComponent,
    MemoryGameComponent,
    MoveCardComponent,
    GameComponent,
    MenuGameComponent,
    CatchgameComponent,
    CardsgameComponent,
    GameCardComponent,
    GameCardsComponent,
    GameCatchComponent,
    GameMemoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
