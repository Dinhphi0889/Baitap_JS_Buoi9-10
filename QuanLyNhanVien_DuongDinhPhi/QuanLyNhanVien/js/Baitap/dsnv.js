function DSNV() {
    this.arr = [];

    this.timViTriNV = function (tkNV) {
        let index = -1;
        for (let i = 0; i < this.arr.length; i++) {
            const nv = this.arr[i];
            if (nv.tkNV === tkNV) {
                index = i;
                break;
            }
        }
        return index;
    };

    this.layThongTinNV = function (tkNV) {
        const index = this.timViTriNV(tkNV)
        if (index !== -1) {
            return this.arr[index];
        }
        return null;
    };

    this.xoaNV = function (tkNV) {
        // Tìm vị trí nhân viên trong mảng
        const index = this.timViTriNV(tkNV)
        if (index !== -1) {
            this.arr.splice(index, 1);
        }
    };

    this.themNV = function (nv) {
        this.arr.push(nv);
    };
    this.capNhatNV = function () { };

    /**
     * Cập nhật sinh viên
     * 0. Lấy thông tin sinh viên từ form
     * 1. Tìm vị trí của sinh viên trong mảng
     * 2. Cập nhật thông tin sinh viên
     */
    this.capNhatNV = function (nv) {
        const index = this.timViTriNV(nv.tkNV);
        if (index !== -1) {
            this.arr[index] = nv;
        }
    };

    /**
     * Tìm kiếm nhân viên
     */
    this.timKiemNV = function (keyword) {
        const mangTimKiem = [];
        for (let i = 0; i < this.arr.length; i++) {
            const nv = this.arr[i];
            const keywordLowercase = keyword.toLowerCase();
            const xepLoaiLowercase = nv.xepLoai.toLowerCase();
            if (xepLoaiLowercase.indexOf(keywordLowercase) !== -1) {
                mangTimKiem.push(nv);
            }
        }
        return mangTimKiem;
    };

}