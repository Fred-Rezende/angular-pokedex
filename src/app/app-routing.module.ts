import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MovesComponent } from './pages/moves/moves.component';
import { ItensComponent } from './pages/itens/itens.component';
import { BerriesComponent } from './pages/berries/berries.component';
import { LocationComponent } from './pages/location/location.component';
import { MemoryGameComponent } from './components/memorygame/memorygame.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'moves', component: MovesComponent},
  { path: 'itens', component: ItensComponent},
  { path: 'berries', component: BerriesComponent},
  { path: 'location', component: LocationComponent},
  { path: 'memorygame', component: MemoryGameComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }