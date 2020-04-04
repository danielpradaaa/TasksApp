import { NgModule } from '@angular/core';
import { FilferCompletedPipe } from './filfer-completed.pipe';



@NgModule({
  declarations: [FilferCompletedPipe],
  exports: [FilferCompletedPipe]
})
export class PipesModule { }
