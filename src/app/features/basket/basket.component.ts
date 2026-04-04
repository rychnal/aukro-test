import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './basket.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasketComponent {}
