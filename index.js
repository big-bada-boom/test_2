class Form {

    constructor() {
        this.fio = document.getElementsByName('fio')[0];
        this.email = document.getElementsByName('email')[0];
        this.phone = document.getElementsByName('phone')[0];
        this.to_validate = { isValid: false, errorFields: [] };
        this.data = { fio: null, email: null, phone: null };
    };

    submit() {
        if (this.fioValid(this.fio) === false) {
            return false;
        }
        if (this.emailValid(this.email) === false) {
            return false;
        }
        if (this.phoneValid(this.phone) === false) {
            return false;
        }
        return false
    };

    validate() {
        return this.to_validate
    }

    setData(n) {
        for (let i in n) {
            if (i === 'fio') {
                this.fio.value = n[i];
            } else if (i === 'email') {
                this.email.value = n[i];
            } else if (i === 'phone') {
                this.phone.value = n[i];
            };
        }
    }

    getData() {
        return this.data
    }

    fioValid(i) {
        if (i.value.split(' ').length != 3) {
            i.className = 'error'
            i.style.border = "1px solid red";
            this.to_validate.errorFields.push('fio')
            return false;
        } else {
            i.style.border = null;
            this.data['fio'] = this.fio.value
        };
    };

    emailValid(i) {
        if (i.value.includes('yandex.ru') === true || 
            i.value.includes('mail.ru') === true || 
            i.value.includes('gmail.com') === true ) {
            i.style.border = null;
            this.data['email'] = this.email.value  
        } else {
            i.className = 'error'
            i.style.border = "1px solid red";
            this.to_validate.errorFields.push('email')
            return false;
        };
    };
    
    phoneValid(i) {
        let regexp = /^\+\d{1,3}\s?\(\d{3}\)\s?\d{3}(-\d{2}){2}$/;
        if (i.value.match(regexp) != null) {
            regexp = /\d/g;
            let item = i.value.match(regexp);
            let sum = 0;
            for (let n of item) {
                sum += Number(n);
            };
            if (sum < 30) {
                i.style.border = null;
                let button = document.getElementById('submitButton')
                button.disabled = true
                this.to_validate.isValid = true
                this.data['phone'] = this.phone.value  
                this.ajax()
            } else {
                i.className = 'error'
                i.style.border = "1px solid red";
                this.to_validate.errorFields.push('phone')    //  тут
                return false;
            };
        } else {
            i.className = 'error'
            i.style.border = "1px solid red";
            this.to_validate.errorFields.push('phone')    //  тут
            return false;
        };
    };

    ajax() {
        let url = document.getElementById('myForm').action
        fetch(url)
        .then(response => response.json())
        .then(result => this.ajaxOption(result))
      };
    
    ajaxOption(n) {
        let resaultContainer = document.getElementById('resultContainer');
        if (n['status'] === 'success') {
            resaultContainer.className = 'success';
            console.log(resaultContainer.className)
            resaultContainer.innerHTML = 'Success';
            console.log(resaultContainer.innerHTML)
        } else if (n['status'] === 'error') {
            resaultContainer.className = 'error';
            resaultContainer.innerHTML = n['reason'];       
        } else if (n['status'] === 'progress') {
            resaultContainer.className = 'progress';
            window.setTimeout(this.ajax(n), n['timeout']); 
        };
    };
}


let MyForm = new Form()