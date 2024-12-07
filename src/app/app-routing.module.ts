import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MovesComponent } from './pages/moves/moves.component';
import { ItensComponent } from './pages/itens/itens.component';
import { BerriesComponent } from './pages/berries/berries.component';
import { LocationComponent } from './pages/location/location.component';
import { GameComponent } from './pages/game/game.component';
import { GameMemoryComponent } from './pages/game-memory/game-memory.component';
import { GameCatchComponent } from './pages/game-catch/game-catch.component';
import { GameCardsComponent } from './pages/game-cards/game-cards.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'moves', component: MovesComponent},
  { path: 'itens', component: ItensComponent},
  { path: 'berries', component: BerriesComponent},
  { path: 'location', component: LocationComponent},
  { path: 'game', component: GameComponent},
  { path: 'game-memory', component: GameMemoryComponent},
  { path: 'game-catch', component: GameCatchComponent},
  { path: 'game-cards', component: GameCardsComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }