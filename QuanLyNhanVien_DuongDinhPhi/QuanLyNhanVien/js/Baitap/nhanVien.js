function NhanVien(_tkNV, _tenNV, _email, _matKhau, _ngayLam, _luongCB, _chucVu, _gioLam) {
    this.tkNV = _tkNV;
    this.tenNV = _tenNV;
    this.email = _email;
    this.matKhau = _matKhau;
    this.ngayLam = _ngayLam;
    this.luongCB = _luongCB;
    this.chucVu = _chucVu;
    this.gioLam = _gioLam;
    this.tongLuong = 0;
    this.xepLoai = "";

    this.tinhTongLuong = function (){
        if (this.chucVu === "Sếp") {
            this.tongLuong = this.luongCB * 3;
        } else if (this.chucVu === "Trưởng phòng"){
            this.tongLuong = this.luongCB * 2;
        } else if (this.chucVu === "Nhân viên"){
            this.tongLuong = this.luongCB * 1;
        }
    }

    this.xepLoaiNV = function () {
        if (this.gioLam >= 192) {
            this.xepLoai = "Nhan vien xuat sac";
        } else if (176 <= this.gioLam && this.gioLam < 192){
            this.xepLoai = "Nhan vien gioi";
        } else if (160 <= this.gioLam && this.gioLam < 176){
            this.xepLoai = "Nhan vien kha";
        } else if (this.gioLam < 160){
            this.xepLoai = "Nhan vien trung binh";
        }
    }
}