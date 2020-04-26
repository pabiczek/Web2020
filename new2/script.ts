
document.addEventListener('DOMContentLoaded', function () { return Start(); });

function Start() {
     const app = new App(textbox, ndtextbox, email, select, checkbox, textarea, date);
     app.Show();
}

enum  FieldType {
    textBox = 1,
    textarea,
    date,
    email,
    select,
    checkbox
}

interface Field {
    name: string,
    label: HTMLLabelElement;
    labelValue: string,
    type: FieldType;
    render(): HTMLElement;
    getValue(): any;
}

class TextBox implements Field {
    name: string;
    type: FieldType;
    element: HTMLInputElement;
    labelValue: string;
    label: HTMLLabelElement;

    constructor(name: string, label: string) {
        this.name = name;
        this.type = FieldType.textBox;
        this.element = <HTMLInputElement>document.createElement('input');
        this.element.name = this.name;
        this.element.type = 'text';
        this.label = <HTMLLabelElement>document.createElement('label');
        this.label.innerHTML = label;
        this.label.htmlFor = name;
        this.labelValue = label;
    }

    render(): HTMLElement {
        return this.element;
    }
    
    getValue(): any {
        return this.element.value;
    }
}




   class TextAreaField implements Field {
    name: string;
    type: FieldType;
    element: HTMLTextAreaElement;
    labelValue: string;
    label: HTMLLabelElement;

    constructor(name: string, label: string) {
        this.name = name;
        this.type = FieldType.textarea;
        this.element = <HTMLTextAreaElement>document.createElement('textarea');
        this.element.name = this.name;
        this.label = <HTMLLabelElement>document.createElement('label');
        this.label.innerHTML = label;
        this.label.htmlFor = name;
        this.labelValue = label;
    }

    render(): HTMLElement {
        return this.element;
    }
    getValue() {
        return this.element.value;
    }
   }
   
   class DateField implements Field {
    name: string;
    type: FieldType;
    element: HTMLInputElement;
    labelValue: string;
    label: HTMLLabelElement;

    constructor(name: string, label: string) {
        this.name = name;
        this.type = FieldType.date;
        this.element = <HTMLInputElement>document.createElement('input');
        this.element.name = name;
        this.element.type = 'date';
        this.label = <HTMLLabelElement>document.createElement('label');
        this.label.innerHTML = label;
        this.label.htmlFor = name;
        this.labelValue = label;
    }

    render(): HTMLElement {
        return this.element;
    }
    getValue() {
        return this.element.value;
    }
   }
   

   class EmailField implements Field {
    name: string;
    type: FieldType;
    element: HTMLInputElement;
    labelValue: string;
    label: HTMLLabelElement;

    constructor(name: string, label: string) {
        this.name = name;
        this.type = FieldType.email;
        this.element = <HTMLInputElement>document.createElement('input');
        this.element.name = name;
        this.element.type = 'email';
        this.label = <HTMLLabelElement>document.createElement('label'); 
        this.label.innerHTML = label;
        this.label.htmlFor = name;
        this.labelValue = label;
    }

    render(): HTMLElement {
        return this.element;
    }
    getValue() {
        return this.element.value;
    }

}


   class SelectField implements Field {
    name: string;
    type: FieldType;
    element: HTMLSelectElement;
    labelValue: string;
    label: HTMLLabelElement;

    constructor(name: string, label: string, ...options: string[]) {
        this.name = name;
        this.type = FieldType.select;
        this.element = <HTMLSelectElement>document.createElement('select');
        options.forEach(element => {
            const opt = document.createElement('option');
            opt.value = element;
            opt.text = element;
            this.element.add(opt);
        });
        this.element.name = name;
        this.label = <HTMLLabelElement>document.createElement('label');
        this.label.innerHTML = label;
        this.label.htmlFor = name;
        this.labelValue = label;
    }

    render(): HTMLElement {
        return this.element;
    }
    getValue() {
        return this.element.value;
    }
   }

   
   class CheckboxField implements Field {
    name: string;
    type: FieldType;
    element: HTMLInputElement;
    labelValue: string;
    label: HTMLLabelElement;

    constructor(name: string, label: string) {
        this.name = name;
        this.type = FieldType.checkbox;
        this.element = <HTMLInputElement>document.createElement('input');
        this.element.name = name;
        this.element.type = 'checkbox';
        this.label = <HTMLLabelElement>document.createElement('label');
        this.label.innerHTML = label;
        this.label.htmlFor = name;
        this.labelValue = label;
    }

    render(): HTMLElement {
        return this.element;
    }
    getValue() {
        if(this.element.checked){
            return "Preferuję"
        }
        else{
            return "Nie preferuję"
        }
    }
}



class Form {
    fields: Field[];
    formElement: HTMLElement;
    valueElement: HTMLElement;

    constructor(formId: string, formVal: string) {
        this.fields = new Array();
        this.formElement = document.getElementById(formId);
        this.valueElement = document.getElementById(formVal);
    }

    render(): void {
        this.fields.forEach(element => {
            this.formElement.appendChild(element.label);
            this.formElement.appendChild(element.render());
        });
    }

    getValue(): void {
        const list = <HTMLElement>document.createElement('ul');
        list.className = "list";
        this.valueElement.appendChild(list);

        this.fields.forEach(element => {
            const li = document.createElement('li');
            li.innerText = element.labelValue + ": " + element.getValue();
            list.appendChild(li);
        });
    }
}

class App {
    form: Form;
    Buttn: HTMLElement;

    constructor(...elements: Field[]) {
        this.form = new Form('inputt', 'outputt');
        this.form.fields.push(...elements);
        this.Buttn = document.getElementById('submit');
        this.Buttn.addEventListener('click', () => this.form.getValue());
    }

    Show() {
        this.form.render();
    }
}

   const textbox = new TextBox('Name', 'Imię');
   const ndtextbox = new TextBox('Surname', 'Nazwisko');
   const email = new EmailField('Email', 'Email');
   const select = new SelectField('Select', 'Kierunek studiów', 'Informatyka', 'Psychologia', 'Prawo', 'Socjologia');
   const checkbox = new CheckboxField('Learning', 'Czy preferujesz e-learning?');
   const textarea = new TextAreaField('Comments', 'Uwagi');
   const date = new DateField('Date', 'Data');
   
   