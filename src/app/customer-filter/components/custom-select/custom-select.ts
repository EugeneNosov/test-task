import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  OnInit,
  Output,
  TemplateRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IOperatorOption } from '../../../core/interfaces/operator-option.interface';

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
export class CustomSelect implements ControlValueAccessor, OnInit {

  private host = inject(ElementRef<HTMLElement>);

  @Input() variant: 'default' | 'operator' = 'default';
  @Input() tab: 'string' | 'number' | null = null;
  @Input() searchTag!: string;
  @Input() options: ReadonlyArray<string> = [];
  @Input() operatorOptions!: IOperatorOption;
  @Input() selected: string | null = null;
  @Output() selectedChange = new EventEmitter<string | null>();
  @Input() placeholder: string = 'Select an event';
  @ContentChild('selectHeader') headerTemplate?: TemplateRef<any>;

  public open: boolean = false;
  public disabled: boolean = false;
  public searchInput: string = '';

  ngOnInit() {
    this.recalculateOptions();
  }

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

  public switchToTab(value: 'string' | 'number'): void {
    this.tab = value;
    this.recalculateOptions();
  }

  public recalculateOptions() {
    if (this.variant === 'default') {
      return;
    } else {
      if (this.tab === 'string') {
        this.options = this.operatorOptions.stringTab;
      } else {
        this.options = this.operatorOptions.numberTab;
      }
    }
  }

  private onChange: (v: string | null) => void = () => {
  };
  private onTouched: () => void = () => {
  };

}
