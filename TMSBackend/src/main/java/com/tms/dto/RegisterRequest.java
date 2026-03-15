package com.tms.dto;

import org.springframework.web.multipart.MultipartFile;

public class RegisterRequest {

    private String firstName;
    private String middleName;
    private String lastName;
    private String mobile;
    private String email;
    private String password;
    private String confirmPassword;

    private MultipartFile photo;

    public RegisterRequest() {}

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getMiddleName() { return middleName; }
    public void setMiddleName(String middleName) { this.middleName = middleName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getMobile() { return mobile; }
    public void setMobile(String mobile) { this.mobile = mobile; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getConfirmPassword() { return confirmPassword; }
    public void setConfirmPassword(String confirmPassword) { this.confirmPassword = confirmPassword; }

    public MultipartFile getPhoto() { return photo; }
    public void setPhoto(MultipartFile photo) { this.photo = photo; }
}