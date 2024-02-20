function Validation() {
    this.kiemTraRong = function (value, spanId, message) {
        getEle(spanId).style.display = "inline-block";
        if (value === "") {
            getEle(spanId).innerHTML = message;
            return false;
        }
        getEle(spanId).style.display = "none";
        getEle(spanId).innerHTML = "";
        return true;
    };


    this.kiemTraEmail = function (value, spanId, message) {
        const checkEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (value.match(checkEmail)) {
            getEle(spanId).innerHTML = "";
            return true;
        }
        getEle(spanId).style.display = "inline-block";
        getEle(spanId).innerHTML = message;
        return false;
    };

    this.kiemTraTenNV = function (value, spanId, message) {
        const checkName = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"

        if(value.match(checkName)){
            getEle(spanId).innerHTML = "";
            return true;
        }
        getEle(spanId).style.display = "inline-block";
        getEle(spanId).innerHTML = message;
        return false;


    }

    this.kiemTraLuongCB = function (value, spanId, message1, message2) {
        if (value == 0) {
            getEle(spanId).style.display = "inline-block";
            getEle(spanId).innerHTML = message1;
            return false;
        } else if (value < 0) {
            getEle(spanId).style.display = "inline-block";
            getEle(spanId).innerHTML = message2;
            return false;
        }
        getEle(spanId).style.display = "none";
        getEle(spanId).innerHTML = "";
        return true;
    };

    this.kiemTraChucVu = function (value, spanId, message) {
        if (value == "Chọn chức vụ") {
            getEle(spanId).style.display = "inline-block";
            getEle(spanId).innerHTML = message;
            return false;
        }
        getEle(spanId).style.display = "none";
        getEle(spanId).innerHTML = "";
        return true;
    };
}