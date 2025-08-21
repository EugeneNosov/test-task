import { Component, ElementRef, EventEmitter, forwardRef, inject, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-select',
  standalone: false,
  templateUrl: './custom-select.html',
  styleUrl: './custom-select.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomSelect),
    multi: true,
  }],
})
export class CustomSelect implements ControlValueAccessor {

  private host = inject(ElementRef<HTMLElement>);

  @Input() searchTag!: string;
  @Input() options: ReadonlyArray<string> = [];
  @Input() selected: string | null = null;
  @Output() selectedChange = new EventEmitter<string | null>();
  @Input() placeholder: string = 'Select an event';

  public open: boolean = false;
  public disabled: boolean = false;
  public searchInput: string = '';

  public choose(opt: string): void {
    this.selected = opt;
    this.selectedChange.emit(opt);
    this.open = false;
    this.searchInput = '';
    this.onChange(opt);
    this.onTouched();
  }

  writeValue(obj: any): void {
    this.selected = obj ?? null;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  toggle() {
    this.open = !this.open;
  }

  private onChange: (v: string | null) => void = () => {
  };
  private onTouched: () => void = () => {
  };

}
