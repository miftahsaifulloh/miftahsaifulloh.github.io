/*
Ujian Tengah Semester
Nama : Miftah Saifulloh
Nim  : 0902691
Koneksi Empat
*/
var hubungan = new Array(4);
var tujuan = new Array();
var tumpukan = new Array();
var zona_input = new Array();
var buang = new Array();
var pemenang = new Array();
var menang = new Array(2);
var sel = new Array(bnyk_sel);
var sel_skrg;
var baris_skrg;
var kolom_skrg;
var pergerakan;
var berakhir;
var kedalam;
var triger = false;
var tempat = false;
var empat = 4;
var jml_baris = 6;
var jml_kolom = 7;
var level = 2; //batas max 2
var bnyk_sel = jml_baris * jml_kolom;
Array.prototype.isElementOf = pengingat;
awal_bermain();

function pengingat(koin) {
	var keluaran = false;
	for (var i = 0; i < this.length; i++) {
		if (this[i] == koin) keluaran = true;
	}
	return keluaran;
}

function sel_pemain() {
	this.pemain = new Array(2);
	this.pemain[0] = false;
	this.pemain[1] = false;
	this.pergerakan = 0;
	return this;
}

function get_baris(n) {
	return parseInt(n/jml_kolom);
}

function get_kolom(n) {
	return n%jml_kolom;
}

function get_sel(baris,kolom) {
	return kolom+(baris*jml_kolom);
}

function get_tujuan(kolom) {
	var baris = (jml_baris - 1);
	while (baris > 0 && !sel[get_sel(baris-1,kolom)].pemain[0] && !sel[get_sel(baris-1,kolom)].pemain[1]) {
		baris -= 1;
	}
	return kolom+(baris*jml_kolom);
}

// Inisialiasi Permainan

function awal_bermain() {
	if (triger) {
		for (var i=1; i<=pergerakan; i++) {
			_root["lubang"+i].unloadMovie();
		}
		kedalam = 100;
		berakhir = false;
		_root.petunjuk._visible = false;
		_root.persempit._visible = false;
	}
	for (var i=0;i<(bnyk_sel);i++) {
		sel[i] = new sel_pemain();
	}
	for (var i=0;i<jml_kolom;i++) {
		zona_input[i] = i;
	}
	pergerakan = 0;
	menang = [];
	buang = [];
	pemenang = [];
}

function ulang_permainan() {
	if (triger) {
		awal_bermain();
	} else {
		window.location.reload();
	}
}

// Kecerdasan Buatan pake Greedy

function kesempatan_baris(nomor_pemain,nomor_hubungan) { 
	var penyelesaian = 0;
	for (var j=0;j<=(jml_kolom-(nomor_hubungan+1));j++) {
		var perhitungan = 0;
		var temp_sel = -1;
		for (var i=j;i<(j+(nomor_hubungan+1));i++) {
			var lanjut_sel = i+(baris_skrg*jml_kolom);
			if (sel[lanjut_sel].pemain[nomor_pemain]) {
				perhitungan += 1;
			} else if (!sel[lanjut_sel].pemain[1-nomor_pemain]) {
				temp_sel = lanjut_sel;
			}
		}
		if (perhitungan==nomor_hubungan && (temp_sel != -1)) {
			if (nomor_pemain == 0) {
				if (nomor_hubungan < 3) {
					if (!buang.isElementOf(temp_sel)) buang.unshift(temp_sel);
				} else {
					if (!buang.isElementOf(temp_sel)) buang.push(temp_sel);
				}
			} else {
				if (nomor_hubungan < 3) {
					if (!pemenang.isElementOf(temp_sel)) pemenang.unshift(temp_sel);
				} else {
					if (!pemenang.isElementOf(temp_sel)) pemenang.push(temp_sel);
				}
			}
		}
	}
}

function kesempatan_kolom(nomor_pemain,nomor_hubungan) { 
	var penyelesaian = 0;
	for (var j=0;j<=(jml_baris-(nomor_hubungan+1));j++) {
		var perhitungan = 0;
		var temp_sel = -1;
		for (var i=j;i<(j+(nomor_hubungan+1));i++) {
			var lanjut_sel = kolom_skrg+(i*jml_kolom);
			if (sel[lanjut_sel].pemain[nomor_pemain]) {
				perhitungan += 1;
			} else if (!sel[lanjut_sel].pemain[1-nomor_pemain]) {
				temp_sel = lanjut_sel;
			}
		}
		if (perhitungan==nomor_hubungan && (temp_sel != -1)) {
			if (nomor_pemain == 0) {
				if (nomor_hubungan < 3) {
					if (!buang.isElementOf(temp_sel)) buang.unshift(temp_sel);
				} else {
					if (!buang.isElementOf(temp_sel)) buang.push(temp_sel);
				}
			} else {
				if (nomor_hubungan < 3) {
					if (!pemenang.isElementOf(temp_sel)) pemenang.unshift(temp_sel);
				} else {
					if (!pemenang.isElementOf(temp_sel)) pemenang.push(temp_sel);
				}
			}
		}
	}
}

function kesempatan_purning(nomor_pemain,nomor_hubungan) { 
	var penyelesaian = 0;
	var iPurning = 1;
	var nomor_purning;
	var tes_sel = sel_skrg;
	var sel_awal;

	while (
		(get_baris(tes_sel)-1) >= 0 &&
		(get_kolom(tes_sel)-1) >= 0
	) {
		tes_sel -= (jml_kolom+1);
	}
	sel_awal = tes_sel;

	while (
		(get_baris(tes_sel)+1) < jml_baris &&
		(get_kolom(tes_sel)+1) < jml_kolom
	) {
		iPurning += 1;
		tes_sel += (jml_kolom+1);
	}
	nomor_purning = Math.max(0,iPurning-(nomor_hubungan));
	if (nomor_purning > 0) {
		for (var j=0;j<nomor_purning;j++) {
			var perhitungan = 0;
			var temp_sel = -1;
			for (var i=j;i<(j+(nomor_hubungan+1));i++) {
				var lanjut_sel = sel_awal + i*(jml_kolom+1);
				if (sel[lanjut_sel].pemain[nomor_pemain]) {
					perhitungan += 1;
				} else if (!sel[lanjut_sel].pemain[1-nomor_pemain]) {
					temp_sel = lanjut_sel;
				}
			}
			if (perhitungan==nomor_hubungan && (temp_sel != -1)) {
				if (nomor_pemain == 0) {
					if (nomor_hubungan < 3) {
						if (!buang.isElementOf(temp_sel)) buang.unshift(temp_sel);
					} else {
						if (!buang.isElementOf(temp_sel)) buang.push(temp_sel);
					}
				} else {
					if (nomor_hubungan < 3) {
						if (!pemenang.isElementOf(temp_sel)) pemenang.unshift(temp_sel);
					} else {
						if (!pemenang.isElementOf(temp_sel)) pemenang.push(temp_sel);
					}
				}
			}
		}
	}
}

function kesempatan_akhir(nomor_pemain,nomor_hubungan) { 
	var penyelesaian = 0;
	var akhir_purning = 1;
	var nAkhir_purning;
	var tes_sel = sel_skrg;
	var sel_awal;

	while (
		(get_baris(tes_sel)-1) >= 0 &&
		(get_kolom(tes_sel)+1) < jml_kolom
	) {
		tes_sel -= (jml_kolom-1);
	}
	sel_awal = tes_sel;

	while (
		(get_baris(tes_sel)+1) < jml_baris &&
		(get_kolom(tes_sel)-1) >= 0
	) {
		akhir_purning += 1;
		tes_sel += (jml_kolom-1);
	}
	nAkhir_purning = Math.max(0,akhir_purning-(empat-1));
	
	if (nAkhir_purning > 0) {
		for (var j=0;j<nAkhir_purning;j++) {
			var perhitungan = 0;
			var temp_sel = -1;
			for (var i=j;i<(j+(nomor_hubungan+1));i++) {
				var lanjut_sel = sel_awal + i*(jml_kolom-1);
				if (sel[lanjut_sel].pemain[nomor_pemain]) {
					perhitungan += 1;
				} else if (!sel[lanjut_sel].pemain[1-nomor_pemain]) {
					temp_sel = lanjut_sel;
				}
			}
			if (perhitungan==nomor_hubungan && (temp_sel != -1)) {
				if (nomor_pemain == 0) {
					if (nomor_hubungan < 3) {
						if (!buang.isElementOf(temp_sel)) buang.unshift(temp_sel);
					} else {
						if (!buang.isElementOf(temp_sel)) buang.push(temp_sel);
					}
				} else {
					if (nomor_hubungan < 3) {
						if (!pemenang.isElementOf(temp_sel)) pemenang.unshift(temp_sel);
					} else {
						if (!pemenang.isElementOf(temp_sel)) pemenang.push(temp_sel);
					}
				}
			}
		}
	}
}


// Mengecek Pemenang

function cek_baris(nomor_pemain) { 
	var penyelesaian = 0;
	var temp = new Array(5);
	for (var j=0;j<=(jml_kolom-empat);j++) {
		var perhitungan = 0;
		for (var i=j;i<(j+empat);i++) {
			var lanjut_sel = i+(baris_skrg*jml_kolom);
			if (sel[lanjut_sel].pemain[nomor_pemain]) {
				perhitungan += 1;
				temp[perhitungan] = lanjut_sel;
			}
		}
		if (perhitungan > penyelesaian) penyelesaian = perhitungan;
		if (perhitungan == empat) {
			hubungan = [temp[1], temp[2], temp[3], temp[4]];
		}
	}
	return penyelesaian;
}

function cek_kolom(nomor_pemain) {
	var penyelesaian = 0;
	var temp = new Array(5);
	for (var j=0;j<=(jml_baris-empat);j++) {
		var perhitungan = 0;
		for (var i=j;i<(j+empat);i++) {
			var lanjut_sel = kolom_skrg+(i*jml_kolom);
			if (sel[lanjut_sel].pemain[nomor_pemain]) {
				perhitungan += 1;
				temp[perhitungan] = lanjut_sel;
			}
		}
		if (perhitungan > penyelesaian) penyelesaian = perhitungan;
		if (perhitungan == empat) {
			hubungan = [temp[1], temp[2], temp[3], temp[4]];
		}
	}
	return penyelesaian;
}

function cek_purning(nomor_pemain) {
	var penyelesaian = 0;
	var temp = new Array(5);
	var iPurning = 1;
	var nomor_purning;
	var tes_sel = sel_skrg;
	var sel_awal;

	while (
		(get_baris(tes_sel)-1) >= 0 &&
		(get_kolom(tes_sel)-1) >= 0
	) {
		tes_sel -= (jml_kolom+1);
	}
	sel_awal = tes_sel;

	while (
		(get_baris(tes_sel)+1) < jml_baris &&
		(get_kolom(tes_sel)+1) < jml_kolom
	) {
		iPurning += 1;
		tes_sel += (jml_kolom+1);
	}
	nomor_purning = Math.max(0,iPurning-(empat-1));
	
	if (nomor_purning > 0) {
		for (var j=0;j<nomor_purning;j++) {
			var perhitungan = 0;
			var lanjut_sel;
			for (var i=j;i<(j+empat);i++) {
				lanjut_sel = sel_awal + i*(jml_kolom+1);
				if (sel[lanjut_sel].pemain[nomor_pemain]) {
					perhitungan += 1;
				temp[perhitungan] = lanjut_sel;
				}
			}
			if (perhitungan > penyelesaian) penyelesaian = perhitungan;
		if (perhitungan == empat) {
			hubungan = [temp[1], temp[2], temp[3], temp[4]];
		}
		}
	}
	return penyelesaian;
}

function cek_aPurning(nomor_pemain) {
	var penyelesaian = 0;
	var temp = new Array(5);
	var akhir_purning = 1;
	var nAkhir_purning;
	var tes_sel = sel_skrg;
	var sel_awal;

	while (
		(get_baris(tes_sel)-1) >= 0 &&
		(get_kolom(tes_sel)+1) < jml_kolom
	) {
		tes_sel -= (jml_kolom-1);
	}
	sel_awal = tes_sel;

	while (
		(get_baris(tes_sel)+1) < jml_baris &&
		(get_kolom(tes_sel)-1) >= 0
	) {
		akhir_purning += 1;
		tes_sel += (jml_kolom-1);
	}
	nAkhir_purning = Math.max(0,akhir_purning-(empat-1));
	
	if (nAkhir_purning > 0) {
		for (var j=0;j<nAkhir_purning;j++) {
			var perhitungan = 0;
			var lanjut_sel;
			for (var i=j;i<(j+empat);i++) {
				lanjut_sel = sel_awal + i*(jml_kolom-1);
				if (sel[lanjut_sel].pemain[nomor_pemain]) {
					perhitungan += 1;
				temp[perhitungan] = lanjut_sel;
				}
			}
			if (perhitungan > penyelesaian) penyelesaian = perhitungan;
		if (perhitungan == empat) {
			hubungan = [temp[1], temp[2], temp[3], temp[4]];
		}
		}
	}
	return penyelesaian;
}

function melihat_pemenang(nomor_pemain) {
	menang[nomor_pemain] = (cek_baris(nomor_pemain)==empat);
	menang[nomor_pemain] = (menang[nomor_pemain] || (cek_kolom(nomor_pemain)==empat));
	menang[nomor_pemain] = (menang[nomor_pemain] || (cek_purning(nomor_pemain)==empat));
	menang[nomor_pemain] = (menang[nomor_pemain] || (cek_aPurning(nomor_pemain)==empat));
	if (menang[0]) {
		if (triger) {
			_root.petunjuk._visible = true;
			_root.petunjuk.gotoAndPlay(1);
			berakhir = true;
			timer = setInterval(melunturkan,50);
		} else {
			alert("Kamu Menang! \nby miftah saifulloh");
			ulang_permainan();
		}
	} else if (menang[1]) {
		if (triger) {
			_root.persempit._visible = true;
			_root.persempit.gotoAndPlay(1);
			berakhir = true;
			timer = setInterval(melunturkan,50);
		} else {
			alert("Kamu Kalah! \nby miftah saifulloh");
			ulang_permainan();
		}
	} else if (nomor_pemain==0) {
		pencocokan();
	} else if (pergerakan == bnyk_sel) {
		if (triger) {
			berakhir = true;
		} else {
			alert("Permainan Seri! \nby miftah saifulloh");
			ulang_permainan();
		}
	} else {}
}

function melunturkan() {
	if (kedalam > 25) {
		for (var i=0; i<=pergerakan; i++) {
			if (
				i != sel[hubungan[0]].pergerakan &&
				i != sel[hubungan[1]].pergerakan &&
				i != sel[hubungan[2]].pergerakan &&
				i != sel[hubungan[3]].pergerakan
			) {
				_root["lubang"+i]._alpha -= 5;
			}
		}
		kedalam -= 5;
	} else {
		clearInterval(timer);
	}
}


// Eleminasi objek

function perbaharui_zona(sel_skrg) {
	var temp_sel;
	while (zona_input[0] != sel_skrg) {
		temp_sel = zona_input.shift();
		zona_input.push(temp_sel);
	}
	temp_sel = zona_input.shift();
	if ((sel_skrg+jml_kolom) < bnyk_sel) zona_input.push(sel_skrg+jml_kolom);
}

function perbaharui_pembuangan(sel_skrg) {
	if (buang.length > 0) {
		for (var i=0; i<buang.length; i++) {
			if (sel_skrg == buang[i]) {
				buang.splice(i,1);
			}
		}
	}
}

function perbaharui_pemenang(sel_skrg) {
	if (pemenang.length > 0) {
		for (var i=0; i<pemenang.length; i++) {
			if (sel_skrg == pemenang[i]) {
				pemenang.splice(i,1);
			}
		}
	}
}

function berjatuhan(jatuh_kolom) {
	var jatuh = false;
	for (var i=0;i<jml_baris;i++) {
		tes_sel = jatuh_kolom+(i*jml_kolom);
		if (zona_input.isElementOf(tes_sel)) {
			jatuh = true;
		}
	}
	return jatuh;
}

function pilihan_baris() {
	var tes_baris;
	var tes_sel;
	var lacak_tujuan = false;
	var kIndex = buang.length;
	var mIndex = pemenang.length;
	while (!lacak_tujuan && kIndex > 0) { 
		kIndex -= 1;
		if (zona_input.isElementOf(buang[kIndex])) {
			tes_baris  = get_kolom(buang[kIndex]);
			lacak_tujuan = true;
		}
	}
	
	while (!lacak_tujuan && mIndex > 0) { 
		mIndex -= 1;
		if (zona_input.isElementOf(pemenang[mIndex])) {
			tes_baris  = get_kolom(pemenang[mIndex]);
			lacak_tujuan = true;
		}
	}
	
	if (!lacak_tujuan) {
		tes_baris = get_kolom(Math.floor(Math.random() * bnyk_sel));
		while (!berjatuhan(tes_baris)) {
			tes_baris = get_kolom(Math.floor(Math.random() * bnyk_sel));
		}
	}
	return tes_baris;
}

function pencocokan() {
	if (level == 2) {
		kesempatan_purning(0,3);
		kesempatan_akhir(0,3);
		kesempatan_baris(0,3);
		kesempatan_kolom(0,3);
		kesempatan_baris(0,2);
		kesempatan_kolom(0,2);
	} else if (level == 1) {
		kesempatan_baris(0,3);
		kesempatan_kolom(0,3);
	}

	sel_skrg = -1;
	baris_skrg = -1;
	kolom_skrg = -1;
	var ruang = false;
	kolom_skrg = pilihan_baris();
	for (var i=0;i<jml_baris;i++) {
		if (!ruang) {
			var tes_sel = kolom_skrg+(i*jml_kolom);
			if (!sel[tes_sel].pemain[0] && !sel[tes_sel].pemain[1]) {
				sel_skrg = tes_sel;
				perbaharui_zona(sel_skrg);
				perbaharui_pembuangan(sel_skrg);
				perbaharui_pemenang(sel_skrg);
				baris_skrg = get_baris(sel_skrg);
				kolom_skrg = get_kolom(sel_skrg);
				sel[sel_skrg].pemain[1] = true;
				pergerakan += 1;
				sel[sel_skrg].pergerakan = pergerakan;
				tempat_bermain(pergerakan, baris_skrg, kolom_skrg, 1);
				ruang = true;
			}
		}
	}

	if (level == 2) {
		kesempatan_purning(1,3);
		kesempatan_akhir(1,3);
		kesempatan_baris(1,3);
		kesempatan_kolom(1,3);
		kesempatan_baris(1,2);
		kesempatan_kolom(1,2);
	} else if (level == 1) {
		kesempatan_baris(1,3);
		kesempatan_kolom(1,3);
	}
}

function pilihan(mouse) { 
	sel_skrg = -1;
	baris_skrg = -1;
	kolom_skrg = -1;
	var ruang = false;
	kolom_skrg = mouse;
	for (var i=0;i<jml_baris;i++) {
		if (!ruang) {
			var tes_sel = kolom_skrg+(i*jml_kolom);
			if (!sel[tes_sel].pemain[0] && !sel[tes_sel].pemain[1]) {
				sel_skrg = tes_sel;
				perbaharui_zona(sel_skrg);
				perbaharui_pembuangan(sel_skrg);
				perbaharui_pemenang(sel_skrg);
				baris_skrg = get_baris(sel_skrg);
				kolom_skrg = get_kolom(sel_skrg);
				sel[sel_skrg].pemain[0] = true;
				pergerakan += 1;
				sel[sel_skrg].pergerakan = pergerakan;
				tempat_bermain(pergerakan, baris_skrg, kolom_skrg, 0);
				ruang = true;
			}
		}
	}
}

function tempat_bermain(i, baris_skrg, kolom_skrg, nomor_pemain) {
	if (triger) {
		tempat = true;
		perkiraan = 25 + 25 + (kolom_skrg * 50) - 15 - 100;
		tujuan[i] = (jml_baris - baris_skrg) * 50 + 25 - 15 - 100;
		tumpukan[i] = false;
		_root.createEmptyMovieClip("lubang"+i, 100+i);
		_root["lubang"+i].lineStyle(2, 0x000000, 100);
		if (nomor_pemain == 0) {
			_root["lubang"+i].beginFill(0x00FF00, 100);
		} else {
 			_root["lubang"+i].beginFill(0xFF0000, 100);
		}
		_root["lubang"+i].moveTo( 115, 100 );
		_root["lubang"+i].curveTo( 130, 100, 130, 115);
		_root["lubang"+i].curveTo( 130, 130, 115, 130 );
		_root["lubang"+i].curveTo( 100, 130, 100, 115 );
		_root["lubang"+i].curveTo( 100, 100, 115, 100 );
		_root["lubang"+i].endFill();
		_root["lubang"+i]._x= perkiraan;
		_root["lubang"+i]._y= 10 - 100;
		_root["lubang"+i].onEnterFrame=function() {
			if (_root["lubang"+i]._y < tujuan[i]) {
				_root["lubang"+i]._y += 10;
			} else if (!tumpukan[i]) {
				tumpukan[i] = true;
				tempat = false;
				melihat_pemenang(nomor_pemain);
			}
		}
	} else {
		if (nomor_pemain == 0) {
			document.getElementById("cell"+get_sel(baris_skrg, kolom_skrg)).style.backgroundColor = "blue";
		} else {
			document.getElementById("cell"+get_sel(baris_skrg, kolom_skrg)).style.backgroundColor = "yellow";
		}
		melihat_pemenang(nomor_pemain);
	}
}
