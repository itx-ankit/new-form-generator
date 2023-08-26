export interface IFormData {
  form: string;
  label: string;
  controls: IFormField[];
  submitButtonText?: string;
}

export interface IFormField {
  type: string;
  name: string;
  placeholder: string;
  required: boolean;
  regex?: RegExp | string;
  /**
   * Item parameter is of three different type,
   * IItem[] when you want to use form field of dropdown type
   * Use IItem type when you want to represent some other value(let say User friendly value) and use seprate value(some unique id which is not User friendly) to identify values
   * use stringor number type for text area or text field or some simple number filed
   */
  items: IItem[] | IItem | string | number;
}

export interface IItem {
  identity: string | number;
  value: string;
}
