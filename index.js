ukuran = () => {
	$('.tinggi').css('height', $(window).height() - 150)
}
ukuran()
$(window).resize(() => ukuran())
$('.form-control').attr('spellcheck', 'false')
app = new Vue({
	el: '.vue',
	data: {
		kunci: '',
		jawaban: '',
		hasil: ''
	},
	methods: {
		olah(){
			kunci = this.kunci.replace(/\t/g, '').replace(/ /g, '').split('')
			jawaban = this.jawaban.replace(/\t/g, '').split('\n')
			for (n in jawaban){
				jawaban[n] = jawaban[n].split(',')
				jawaban[n][1] = jawaban[n][1].replace(/ /g, '').split('')
			}
			hasil = []
			for (n in jawaban){
				hasil.push(jawaban[n][0])
				benar = 0
				for (y in jawaban[n][1]){
					if (jawaban[n][1][y] == kunci[y]){
						benar++
					}
				}
				hasil.push(benar)
			}
			panjang_kunci = kunci.length
			teks = ''
			for (n in hasil){
				if (n % 2 == 0){
					if (hasil[n] != ''){
						teks += `${hasil[n]}: `
					}
				} else {
					teks += `${hasil[n] / panjang_kunci * 100}\n`
				}
			}
			this.hasil = teks
		}
	},
	watch: {
		kunci(){
			this.olah()
		},
		jawaban(){
			this.olah()
		}
	}
})