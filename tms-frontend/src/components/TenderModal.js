import { useState } from "react";
import "./TenderModal.css";

// ── MANDATORY FIELDS ──────────────────────────────────
const MANDATORY = [
  "type", "fullName", "address", "city", "district",
  "state", "pincode", "mobile", "email",
  "licenseNumber", "gstNumber",
  "goodsType", "goodsDemand", "saleRate",
  "photo", "aadharCopy", "panCopy"
];

const emptyTender = {
  type: "", fullName: "", address: "", city: "", district: "",
  state: "", pincode: "", mobile: "", email: "",
  licenseNumber: "", gstNumber: "",
  goodsType: "", goodsDemand: "", saleRate: "",
  photo: null, aadharCopy: null, panCopy: null,
  gstCertificate: null, licenseCertificate: null,
  remarks: ""
};

const emptyErrors = {
  type: "", fullName: "", address: "", city: "", district: "",
  state: "", pincode: "", mobile: "", email: "",
  licenseNumber: "", gstNumber: "",
  goodsType: "", goodsDemand: "", saleRate: "",
  photo: "", aadharCopy: "", panCopy: "",
  gstCertificate: "", licenseCertificate: ""
};

const FIELD_TAB = {
  type: "basic", fullName: "basic", address: "basic",
  city: "basic", district: "basic", state: "basic",
  pincode: "basic", mobile: "basic", email: "basic",
  licenseNumber: "basic", gstNumber: "basic",
  goodsType: "goods", goodsDemand: "goods", saleRate: "goods",
  photo: "documents", aadharCopy: "documents", panCopy: "documents",
  gstCertificate: "documents", licenseCertificate: "documents"
};

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png","image/pdf"];
// const MAX_SIZE = 1 * 1024 * 1024;

export default function TenderModal({ tender, onSave, onClose }) {

  const [form, setForm] = useState(tender || emptyTender);
  const [errors, setErrors] = useState(emptyErrors);
  const [tab, setTab] = useState("basic");
  const [fileNames, setFileNames] = useState({
    photo: tender?.photo || "",
    aadharCopy: tender?.aadharCopy || "",
    panCopy: tender?.panCopy || "",
    gstCertificate: tender?.gstCertificate || "",
    licenseCertificate: tender?.licenseCertificate || ""
  });

  // ── FIELD VALIDATORS ────────────────────────────────
  const validateTextField = (key, value) => {
    if (MANDATORY.includes(key) && !value) return "This field is required";
    if (key === "mobile" && value && !/^\d{10}$/.test(value)) return "Must be exactly 10 digits";
    if (key === "pincode" && value && !/^\d{6}$/.test(value)) return "Must be exactly 6 digits";
    if (key === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email address";
    return "";
  };

  const validateFileField = (key, file) => {
    if (!file) return MANDATORY.includes(key) ? "This file is required" : "";
    if (!ALLOWED_TYPES.includes(file.type)) return "Only JPG, PNG and PDF allowed";
    // if (file.size > MAX_SIZE) return "File must be under 1 MB";
    return "";
  };

  // ── CHANGE HANDLER ───────────────────────────────────
  const set = (key) => (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0] || null;
      setErrors(prev => ({ ...prev, [key]: validateFileField(key, file) }));
      setForm(prev => ({ ...prev, [key]: file }));
      setFileNames(prev => ({ ...prev, [key]: file ? file.name : "" }));
    } else {
      const value = e.target.value;
      setErrors(prev => ({ ...prev, [key]: validateTextField(key, value) }));
      setForm(prev => ({ ...prev, [key]: value }));
    }
  };

  // ── VALIDATE ALL ON SUBMIT ───────────────────────────
  const validateAll = () => {
    const newErrors = { ...emptyErrors };
    let firstErrorTab = null;
    let hasError = false;

    const textFields = [
      "type","fullName","address","city","district","state",
      "pincode","mobile","email","licenseNumber","gstNumber",
      "goodsType","goodsDemand","saleRate"
    ];
    textFields.forEach(key => {
      const err = validateTextField(key, form[key]);
      if (err) { newErrors[key] = err; hasError = true; if (!firstErrorTab) firstErrorTab = FIELD_TAB[key]; }
    });

    ["photo","aadharCopy","panCopy","gstCertificate","licenseCertificate"].forEach(key => {
      const err = validateFileField(key, form[key]);
      if (err) { newErrors[key] = err; hasError = true; if (!firstErrorTab) firstErrorTab = FIELD_TAB[key]; }
    });

    setErrors(newErrors);
    if (firstErrorTab) setTab(firstErrorTab);
    return !hasError;
  };

  // ── SUBMIT ───────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    const formData = new FormData();
    Object.keys(form).forEach(key => {
      if (form[key] !== null && form[key] !== undefined && form[key] !== "") {
        formData.append(key, form[key]);
      }
    });

    onSave(formData, !!tender);
  };

  // ── HELPERS ──────────────────────────────────────────
  const Lbl = ({ children, req }) => (
    <label>{children}{req && <span className="required-star"> *</span>}</label>
  );

  const Err = ({ field }) =>
    errors[field] ? <span className="field-error">⚠ {errors[field]}</span> : null;

  const tabHasError = (t) =>
    Object.keys(errors).some(k => errors[k] && FIELD_TAB[k] === t);

  // ── RENDER ───────────────────────────────────────────
  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">

        {/* ── HEADER ── */}
        <div className="modal-header">
          <div className="modal-header-left">
            <h2>{tender ? "Edit Tender" : "New Tender Application"}</h2>
            <p className="modal-subtitle">
              Fields marked <span className="required-star">*</span> are mandatory
            </p>
          </div>
          <button className="modal-close" type="button" onClick={onClose}>✕</button>
        </div>

        {/* ── TABS ── */}
        <div className="modal-tabs">
          {[
            { key: "basic",     label: "Basic Info" },
            { key: "goods",     label: "Goods & Rates" },
            { key: "documents", label: "Documents" }
          ].map(t => (
            <button
              key={t.key}
              type="button"
              className={`tab-btn ${tab === t.key ? "active" : ""} ${tabHasError(t.key) ? "tab-has-error" : ""}`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
              {tabHasError(t.key) && <span className="tab-err-badge">!</span>}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="modal-body">

            {/* ══════════ BASIC INFO TAB ══════════ */}
            {tab === "basic" && (
              <div className="tab-content">

                <div className={`form-group ${errors.type ? "has-error" : ""}`}>
                  <Lbl req>Tender Type</Lbl>
                  <select value={form.type} onChange={set("type")}>
                    <option value="">-- Select Type --</option>
                    <option value="Broker">Broker</option>
                    <option value="Purchaser">Purchaser</option>
                    <option value="Wholesaler">Wholesaler</option>
                  </select>
                  <Err field="type" />
                </div>

                <div className={`form-group ${errors.fullName ? "has-error" : ""}`}>
                  <Lbl req>Full Name</Lbl>
                  <input
                    type="text"
                    placeholder="Enter full legal name"
                    value={form.fullName}
                    onChange={set("fullName")}
                  />
                  <Err field="fullName" />
                </div>

                <div className={`form-group ${errors.address ? "has-error" : ""}`}>
                  <Lbl req>Address</Lbl>
                  <textarea
                    rows={2}
                    placeholder="Street / building address"
                    value={form.address}
                    onChange={set("address")}
                  />
                  <Err field="address" />
                </div>

                <div className="form-grid-2">
                  <div className={`form-group ${errors.city ? "has-error" : ""}`}>
                    <Lbl req>City</Lbl>
                    <input type="text" placeholder="City" value={form.city} onChange={set("city")} />
                    <Err field="city" />
                  </div>
                  <div className={`form-group ${errors.district ? "has-error" : ""}`}>
                    <Lbl req>District</Lbl>
                    <input type="text" placeholder="District" value={form.district} onChange={set("district")} />
                    <Err field="district" />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className={`form-group ${errors.state ? "has-error" : ""}`}>
                    <Lbl req>State</Lbl>
                    <input type="text" placeholder="State" value={form.state} onChange={set("state")} />
                    <Err field="state" />
                  </div>
                  <div className={`form-group ${errors.pincode ? "has-error" : ""}`}>
                    <Lbl req>Pincode</Lbl>
                    <input
                      type="text"
                      placeholder="6-digit pincode"
                      maxLength={6}
                      value={form.pincode}
                      onChange={set("pincode")}
                    />
                    <Err field="pincode" />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className={`form-group ${errors.mobile ? "has-error" : ""}`}>
                    <Lbl req>Mobile</Lbl>
                    <input
                      type="tel"
                      placeholder="10-digit number"
                      maxLength={10}
                      value={form.mobile}
                      onChange={set("mobile")}
                    />
                    <Err field="mobile" />
                  </div>
                  <div className={`form-group ${errors.email ? "has-error" : ""}`}>
                    <Lbl req>Email</Lbl>
                    <input
                      type="email"
                      placeholder="example@mail.com"
                      value={form.email}
                      onChange={set("email")}
                    />
                    <Err field="email" />
                  </div>
                </div>

                {/* License Number YES/NO */}
                <div className={`form-group ${errors.licenseNumber ? "has-error" : ""}`}>
                  <Lbl req>License Number</Lbl>
                  <div className="radio-group">
                    {["YES", "NO"].map(opt => (
                      <label key={opt} className="radio-option">
                        <input
                          type="radio"
                          name="licenseNumber"
                          value={opt}
                          checked={form.licenseNumber === opt}
                          onChange={set("licenseNumber")}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                  <Err field="licenseNumber" />
                </div>

                {/* GST Number YES/NO */}
                <div className={`form-group ${errors.gstNumber ? "has-error" : ""}`}>
                  <Lbl req>GST Number</Lbl>
                  <div className="radio-group">
                    {["YES", "NO"].map(opt => (
                      <label key={opt} className="radio-option">
                        <input
                          type="radio"
                          name="gstNumber"
                          value={opt}
                          checked={form.gstNumber === opt}
                          onChange={set("gstNumber")}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                  <Err field="gstNumber" />
                </div>

              </div>
            )}

            {/* ══════════ GOODS & RATES TAB ══════════ */}
            {tab === "goods" && (
              <div className="tab-content">

                <div className={`form-group ${errors.goodsType ? "has-error" : ""}`}>
                  <Lbl req>Goods Type</Lbl>
                  <select value={form.goodsType} onChange={set("goodsType")}>
                    <option value="">-- Select Goods --</option>
                    <option value="Ash">Ash</option>
                    <option value="Ethanol">Ethanol</option>
                    <option value="Fusel Oil">Fusel Oil</option>
                    <option value="Pressmud">Pressmud</option>
                    <option value="Sugar">Sugar</option>
                  </select>
                  <Err field="goodsType" />
                </div>

                <div className={`form-group ${errors.goodsDemand ? "has-error" : ""}`}>
                  <Lbl req>Goods Demand</Lbl>
                  <input
                    type="text"
                    placeholder="e.g. 1000 Ton"
                    value={form.goodsDemand}
                    onChange={set("goodsDemand")}
                  />
                  <Err field="goodsDemand" />
                </div>

                <div className={`form-group ${errors.saleRate ? "has-error" : ""}`}>
                  <Lbl req>Sale Rate</Lbl>
                  <input
                    type="text"
                    placeholder="e.g. 3800 per Ton"
                    value={form.saleRate}
                    onChange={set("saleRate")}
                  />
                  <Err field="saleRate" />
                </div>

                <div className="form-group">
                  <Lbl>Remarks</Lbl>
                  <textarea
                    rows={3}
                    placeholder="Any additional notes..."
                    value={form.remarks}
                    onChange={set("remarks")}
                  />
                </div>

              </div>
            )}

            {/* ══════════ DOCUMENTS TAB ══════════ */}
            {tab === "documents" && (
              <div className="tab-content">

                <div className="doc-note">
                  Accepted: JPG, PNG, PDF &mdash; max <strong>1 MB</strong> each.
                  Fields marked <span className="required-star">*</span> are mandatory.
                </div>

                {[
                  { key: "photo",              label: "Passport Photo",      accept: ".jpg,.jpeg,.png",        req: true  },
                  { key: "aadharCopy",         label: "Aadhar Copy",         accept: ".jpg,.jpeg,.png,.pdf",   req: true  },
                  { key: "panCopy",            label: "PAN Copy",            accept: ".jpg,.jpeg,.png,.pdf",   req: true  },
                  { key: "gstCertificate",     label: "GST Certificate",     accept: ".jpg,.jpeg,.png,.pdf",   req: false },
                  { key: "licenseCertificate", label: "License Certificate", accept: ".jpg,.jpeg,.png,.pdf",   req: false }
                ].map(({ key, label, accept, req }) => (
                  <div key={key} className={`form-group ${errors[key] ? "has-error" : ""}`}>
                    <Lbl req={req}>{label}</Lbl>
                    <label className={`file-upload-box ${fileNames[key] ? "file-selected" : ""}`}>
                      <input
                        type="file"
                        accept={accept}
                        onChange={set(key)}
                        className="file-input-hidden"
                      />
                      <span className="file-icon">📎</span>
                      <span className="file-text">
                        {fileNames[key] ? fileNames[key] : "Click to upload file"}
                      </span>
                      {fileNames[key] && <span className="file-check">✓</span>}
                    </label>
                    <Err field={key} />
                  </div>
                ))}

              </div>
            )}

          </div>

          {/* ── FOOTER ── */}
          <div className="modal-footer">
            <button type="button" className="btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">
              {tender ? "Update Tender" : "Save Tender"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}