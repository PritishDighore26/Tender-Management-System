package com.tms.dto;

import org.springframework.web.multipart.MultipartFile;

public class TenderRequest {

    private String type;
    private String fullName;
    private String address;
    private String city;
    private String district;
    private String state;
    private String pincode;
    private String mobile;
    private String email;

    private String licenseNumber;  // FIXED: was hasLicense
    private String gstNumber;      // FIXED: was hasGst

    private String goodsType;
    private String goodsDemand;
    private String saleRate;

    private MultipartFile photo;
    private MultipartFile aadharCopy;
    private MultipartFile panCopy;
    private MultipartFile gstCertificate;
    private MultipartFile licenseCertificate;

    private String remarks;

    // ── GETTERS & SETTERS ──

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLicenseNumber() {  // FIXED
        return licenseNumber;
    }

    public void setLicenseNumber(String licenseNumber) {  // FIXED
        this.licenseNumber = licenseNumber;
    }

    public String getGstNumber() {  // FIXED
        return gstNumber;
    }

    public void setGstNumber(String gstNumber) {  // FIXED
        this.gstNumber = gstNumber;
    }

    public String getGoodsType() {
        return goodsType;
    }

    public void setGoodsType(String goodsType) {
        this.goodsType = goodsType;
    }

    public String getGoodsDemand() {
        return goodsDemand;
    }

    public void setGoodsDemand(String goodsDemand) {
        this.goodsDemand = goodsDemand;
    }

    public String getSaleRate() {
        return saleRate;
    }

    public void setSaleRate(String saleRate) {
        this.saleRate = saleRate;
    }

    public MultipartFile getPhoto() {
        return photo;
    }

    public void setPhoto(MultipartFile photo) {
        this.photo = photo;
    }

    public MultipartFile getAadharCopy() {
        return aadharCopy;
    }

    public void setAadharCopy(MultipartFile aadharCopy) {
        this.aadharCopy = aadharCopy;
    }

    public MultipartFile getPanCopy() {
        return panCopy;
    }

    public void setPanCopy(MultipartFile panCopy) {
        this.panCopy = panCopy;
    }

    public MultipartFile getGstCertificate() {
        return gstCertificate;
    }

    public void setGstCertificate(MultipartFile gstCertificate) {
        this.gstCertificate = gstCertificate;
    }

    public MultipartFile getLicenseCertificate() {
        return licenseCertificate;
    }

    public void setLicenseCertificate(MultipartFile licenseCertificate) {
        this.licenseCertificate = licenseCertificate;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
}
