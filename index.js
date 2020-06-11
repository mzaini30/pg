ukuran = () => {
	$('.tinggi').css('height', $(window).height() - 150)
	$('.setengah-tinggi').css('height', ($(window).height() - 168) / 2)
}
ukuran()
$(window).resize(() => ukuran())
$('.form-control').attr('spellcheck', 'false')
app = new Vue({
	el: '.vue',
	data: {
		kunci: '',
		jawaban: '',
		hasil: '',
		hasil_sesungguhnya: '',
		tertinggi: 'x',
		namanya: [],
		laporan: []
	},
	methods: {
		olah(){
			kunci = this.kunci.replace(/\t/g, '').replace(/ /g, '').split('')
			panjang_kunci = kunci.length
			this.tertinggi = panjang_kunci
			jawaban = this.jawaban.replace(/\t/g, '').split('\n')
			for (n in jawaban){
				jawaban[n] = jawaban[n].split(',')
				jawaban[n][1] = jawaban[n][1].replace(/ /g, '').split('')
			}
			hasil = []
			namanya = []
			laporan = []
			for (n in jawaban){
				hasil.push(jawaban[n][0]) // nama
				namanya.push(jawaban[n][0])
				benar = 0
				jawaban_laporan = ''
				for (y in jawaban[n][1]){ // jawabannya
					if (jawaban[n][1][y].toLowerCase() == kunci[y].toLowerCase()){
						benar++ // jika benar
						jawaban_laporan += jawaban[n][1][y]
					} else {
						jawaban_laporan += `<span class='merah'>${jawaban[n][1][y]}</span>`
					}
				}
				hasil.push(benar)
				laporan.push(jawaban_laporan)
			}
			this.namanya = namanya
			this.laporan = laporan
			teks = ''
			teks_sesungguhnya = ''
			for (n in hasil){
				if (n % 2 == 0){ // nama
					if (hasil[n] != ''){
						teks += `${hasil[n]}: `
						teks_sesungguhnya += `${hasil[n]}: `
					}
				} else { // total nilai
					teks += `${hasil[n] / panjang_kunci * 100}\n`
					teks_sesungguhnya += `${hasil[n]}\n`
				}
			}
			this.hasil = teks
			this.hasil_sesungguhnya = teks_sesungguhnya
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