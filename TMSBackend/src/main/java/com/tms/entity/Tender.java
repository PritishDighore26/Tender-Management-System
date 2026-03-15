package com.tms.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tenders")
public class Tender {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    private String photo;

    private String aadharCopy;

    private String panCopy;

    private String gstCertificate;

    private String licenseCertificate;

    private String remarks;

    public Tender() {}

    // ── GETTERS & SETTERS ──

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getAadharCopy() {
        return aadharCopy;
    }

    public void setAadharCopy(String aadharCopy) {
        this.aadharCopy = aadharCopy;
    }

    public String getPanCopy() {
        return panCopy;
    }

    public void setPanCopy(String panCopy) {
        this.panCopy = panCopy;
    }

    public String getGstCertificate() {
        return gstCertificate;
    }

    public void setGstCertificate(String gstCertificate) {
        this.gstCertificate = gstCertificate;
    }

    public String getLicenseCertificate() {
        return licenseCertificate;
    }

    public void setLicenseCertificate(String licenseCertificate) {
        this.licenseCertificate = licenseCertificate;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
}
