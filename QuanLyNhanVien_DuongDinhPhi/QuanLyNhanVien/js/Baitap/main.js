// tạo đối tượng dsnv từ lớp đối tượng DSNV
const dsnv = new DSNV();
const validation = new Validation();

getLocalStorage();

//Dom id
function getEle(id) {
    return document.getElementById(id);
}


// Lấy thông tin nhân viên
// Hàm lấy thông tin sinh viên sử dụng nhiều lần
function layThongTinNhanVien() {
    // Lấy thông tin từ form
    const _tkNV = getEle("tknv").value;
    const _tenNV = getEle("name").value;
    const _email = getEle("email").value;
    const _matKhau = getEle("password").value;
    const _ngayLam = getEle("datepicker").value;
    const _luongCB = getEle("luongCB").value;
    const _chucVu = getEle("chucvu").value;
    const _gioLam = getEle("gioLam").value;

    // Validation (Kiểm tra tính hợp lệ của dữ liệu)
    // Kỹ thuật tạo biến flag (boolean): true: hợp lệ, false: không hợp lệ
    let isValid = true;
    // 1.kiểm tra tài khoản nhân viên
    isValid &= validation.kiemTraRong(_tkNV, "tbTKNV", "(*) TKNV không được để trống");
    // 2.kiểm tra tên nhân viên
    isValid &= validation.kiemTraRong(_tenNV, "tbTen", "(*) Tên NV không được để trống") && validation.kiemTraTenNV(_tenNV, "tbTen", "(*) Vui lòng nhập tên đúng định dạng");
    // 3.Kiểm tra email
    isValid &= validation.kiemTraRong(_email, "tbEmail", "(*) Email không được để trống") && validation.kiemTraEmail(_email, "tbEmail", "(*) Vui lòng nhập Email đúng định dạng");
    // 4.Kiểm tra mật khẩu
    isValid &= validation.kiemTraRong(_matKhau, "tbMatKhau", "(*) Mật khẩu không được để trống");
    // 5.Kiểm tra Ngày làm
    isValid &= validation.kiemTraRong(_ngayLam, "tbNgay", "(*) TKNV không được để trống");
    // 6.Kiểm tra lương cơ bản
    isValid &= validation.kiemTraLuongCB(_luongCB, "tbLuongCB", "(*) Lương CB không được bằng 0", "(*) Lương CB không được nhỏ hơn 0");
    // 7.Kiểm tra chức vụ
    isValid &= validation.kiemTraChucVu(_chucVu, "tbChucVu", "(*) Chức vụ không được để trống");
    // 8.Kiểm tra giờ làm
    isValid &= validation.kiemTraLuongCB(_gioLam, "tbGiolam", "(*) Giờ làm không được để trống", "(*) Giờ làm không được là số âm");

    if (!isValid) return null;

    // Tạo đối tượng nhân viên
    const nv = new NhanVien(_tkNV, _tenNV, _email, _matKhau, _ngayLam, _luongCB, _chucVu, _gioLam);

    nv.tinhTongLuong();
    nv.xepLoaiNV();

    return nv;
}

// Hiển thị danh sách nhân viên
/**
 * 0. Tạo biến content là rỗng để chứa thông tin hiển thị mới
 * 1. Duyêt mảng (Dùng vòng lặp for)
 *      1.1 Lấy được thông tin nhân viên
 *      1.2 Tạo thẻ tr
 *      1.3 Tạo thẻ td
 *      1.4 Nội dung của cột
 *      1.5 Cộng dồn tr vào content (+=)
 * 2. Hiển thị con tent ra ngoài giao diện
 * 
 */
function hienThiDanhSachNhanVien(data) {
    let content = "";
    for (let i = 0; i < data.length; i++) {
        const nv = data[i];
        content += `
            <tr>
                    <td>${nv.tkNV}</td>
                    <td>${nv.tenNV}</td>
                    <td>${nv.email}</td>
                    <td>${nv.ngayLam}</td>
                    <td>${nv.chucVu}</td>
                    <td>${nv.tongLuong}</td>
                    <td>${nv.xepLoai}</td>
                    <td>
                        <button data-toggle="modal" data-target="#myModal" class="btn btn-info" onclick="editNV('${nv.tkNV}')">Edit</button>
                        <button class="btn btn-danger" onclick="deleteNV('${nv.tkNV}')">Delete</button>
                    </td>
            </tr>
            `;
    }
    getEle("tableDanhSach").innerHTML = content
}

/**
 * Lưu dữ liệu vào localStorage
 */
function setlocalStorege() {
    //Chuyển dữ liệu từ dạng JSON thành dạng chuỗi
    const arrString = JSON.stringify(dsnv.arr);
    // Lưu xuống laocalStorage
    localStorage.setItem("DSNV", arrString);
}

/**
 * Lấy mảng sinh viên từ localStorage
 */
function getLocalStorage() {
    // Đặt điều kiện để khi user sử dụng không báo lỗi do chưa tạo localstorage
    if (!localStorage.getItem("DSNV")) return;
    // Lấy mảng sinh viên từ localStorage
    const arrString = localStorage.getItem("DSNV");
    // chuển mảng sinh viên từ chuỗi => JSON
    const arrJSON = JSON.parse(arrString);
    // Phục hồi data cho dssv.arr
    dsnv.arr = arrJSON;
    // Hiển thị danh sách sinh viên
    hienThiDanhSachNhanVien(dsnv.arr);
}

/**
 * Sửa sinh viên
 */
function editNV(id) {
    // console.log(123);
    const nv = dsnv.layThongTinNV(id);
    if (nv) {
        //Ẩn nút thêm
        getEle("btnThemNV").style.display = "none";
        // Hiển thị nút cập nhật
        getEle("btnCapNhat").style.display = "inline-block";
        // Hiển thị thông tin sinh viên lên form
        getEle("tknv").value = nv.tkNV;
        getEle("tknv").disabled = true;
        getEle("name").value = nv.tenNV;
        getEle("email").value = nv.email;
        getEle("password").value = nv.matKhau;
        getEle("datepicker").value = nv.ngayLam;
        getEle("luongCB").value = nv.luongCB;
        getEle("chucvu").value = nv.chucVu;
        getEle("gioLam").value = nv.gioLam;
    }

}

/**
 * Xóa sinh viên
 */
function deleteNV(id) {
    dsnv.xoaNV(id);
    console.log(dsnv.arr)
    hienThiDanhSachNhanVien(dsnv.arr);
    setlocalStorege();
}

/**
 * Resetform
 */
function resetForm() {
    //Ẩn nút thêm
    getEle("btnThemNV").style.display = "inline-block";
    // Hiển thị nút cập nhật
    getEle("btnCapNhat").style.display = "none";
    // Hiển thị thông tin sinh viên lên form
    getEle("tknv").value = "";
    getEle("tknv").disabled = false;
    getEle("name").value = "";
    getEle("email").value = "";
    getEle("password").value = "";
    getEle("datepicker").value = "";
    getEle("luongCB").value = 0;
    getEle("chucvu").value = "Chọn chức vụ";
    getEle("gioLam").value = 0;
}

/**
 * Thêm nhân viên vào mảng
 */
function themNV() {
    const nv = layThongTinNhanVien();
    if (!nv) return;

    dsnv.themNV(nv);
    hienThiDanhSachNhanVien(dsnv.arr);
    setlocalStorege();
}

/**
 * Cập nhật nhân viên
 */
function updateNV() {
    const nv = layThongTinNhanVien();

    dsnv.capNhatNV(nv);
    hienThiDanhSachNhanVien(dsnv.arr);
    setlocalStorege();
}

/**Tìm kiếm sinh viên
 * callback function: hàm có tham số , tham số là 1 hàm khác
 */
getEle("searchName").addEventListener("keyup", function () {
    // Lấy từ khóa tìm kiếm
    const keyword = getEle("searchName").value;
    // console.log(keyword);
    const mangTimKiem = dsnv.timKiemNV(keyword);
    // console.log(mangTimKiem);
    hienThiDanhSachNhanVien(mangTimKiem);
})

