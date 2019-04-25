Vue.directive('phone', {
	bind(el) {  
		el.oninput = function(e) {
			if (!e.isTrusted) {
				return;
			}
			let x = this.value.replace(/[^0-9+]/g, '').match(/([0-9+]{0,2})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
			this.value = !x[2] ? x[1] : x[1] + '(' + x[2] + ')' + (x[3] ? '-' + x[3] : '') + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
			el.dispatchEvent(new Event('input'));
		}
	}
});

new Vue({
	el: '#about-form',
	data: {
		errors: [],
		name: null,
		email: null,
		phone: null,
		activity: null
	},
	methods: {
		
		submit: function (e) {

			this.errors = [];

			if (!this.name) {
				this.errors.push('Требуется указать ваше Имя и Фамилию.');
			}

			if (!this.email) {
				this.errors.push('Требуется указать почтовый адрес.');
			} else if (!this.validEmail(this.email)) {
				this.errors.push('Укажите корректный адрес электронной почты.');
			}

			if (!this.phone) {
				this.errors.push('Требуется указать номер телефона.');
			} else if (!this.validPhone(this.phone)) {
				this.errors.push('Укажите корректный номер телефона.');
			}

			if (!this.activity) {
				this.errors.push('Требуется указать вид деятельности.');
			}

			e.preventDefault();
		},

		validEmail: function (email) {
			var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		},

		validPhone: function (phone) {
			var re = /^[0-9+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
			return re.test(phone);
		}

	}
})