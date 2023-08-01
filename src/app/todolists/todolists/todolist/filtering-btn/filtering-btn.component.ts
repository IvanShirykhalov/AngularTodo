import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FilterType } from 'src/app/todolists/models/todolists.model'

@Component({
  selector: 'tl-filtering-btn',
  templateUrl: './filtering-btn.component.html',
  styleUrls: ['./filtering-btn.component.scss'],
})
export class FilteringBtnComponent {
  @Input() filter!: FilterType
  @Output() changeFilterEvent = new EventEmitter<FilterType>()

  changeFilterHandler(filter: FilterType) {
    this.changeFilterEvent.emit(filter)
  }
}
