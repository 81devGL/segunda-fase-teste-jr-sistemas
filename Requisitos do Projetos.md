# Yêu cầu dự án

1. [* Xong] - Tạo một trang biểu mẫu để đăng ký và chỉnh sửa một người (Sử dụng các tuyến vue để truy cập trang)

   json ví dụ để thêm một bản ghi mới

   ```
   {
      "person_type": "F", can be J or H
      "cpf_cnpj": "11111111111",
      "social_reason": "test user",
      "name": "MIlene Naianny",
      "sex": "M",
      "nationality": "",
      "marital status": "N",
      "born": "1993-02-13",
      "email": "email@email.com"
   }
   ```

2. [* Feito] - Sử dụng thành phần đầu vào biểu mẫu

   Ex.:

   ```
    <form-input-component label="CPF" v-model="pessoaDataForm.cpf" :error="pessoaDataError.cpf" :mask="###.###.###-##"></form-input-component>
   ```

3. [* Đã hoàn thành một phần - giải thích trong nhận xét trên dòng 164 của tệp register-people-page.vue] - Khi thêm/chỉnh sửa hồ sơ người, quay lại màn hình ban đầu
4. [* Feito] - Trước khi xóa bản ghi, nó hiển thị thông báo xác nhận
5. [* Feito] - Bằng cách nhấp vào liên kết "EXIT", xóa dữ liệu mã thông báo và quay lại màn hình đăng nhập
6. [* Feito] - Tìm nạp dữ liệu người dùng đã ghi để hiển thị tên trong thanh điều hướng (Sử dụng lớp PessoaAuthProvider)
