package com.tms.service.impl;

import com.tms.dto.TenderRequest;
import com.tms.entity.Tender;
import com.tms.repository.TenderRepository;
import com.tms.service.TenderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TenderServiceImpl implements TenderService {

    @Autowired
    private TenderRepository tenderRepository;

    private final String uploadDir = System.getProperty("user.dir") + "/documents/";

    @Override
    public String saveTender(TenderRequest request) {
        try {
            // Ensure directory exists
            Path root = Paths.get(uploadDir);
            if (!Files.exists(root)) {
                Files.createDirectories(root);
            }

            Tender tender = new Tender();
            // ... (Mapping basic fields same as before)
            tender.setType(request.getType());
            tender.setFullName(request.getFullName());
            tender.setAddress(request.getAddress());
            tender.setCity(request.getCity());
            tender.setDistrict(request.getDistrict());
            tender.setState(request.getState());
            tender.setPincode(request.getPincode());
            tender.setMobile(request.getMobile());
            tender.setEmail(request.getEmail());
            tender.setLicenseNumber(request.getLicenseNumber());
            tender.setGstNumber(request.getGstNumber());
            tender.setGoodsType(request.getGoodsType());
            tender.setGoodsDemand(request.getGoodsDemand());
            tender.setSaleRate(request.getSaleRate());
            tender.setRemarks(request.getRemarks());

            // Save Files using a robust method
            tender.setPhoto(saveFile(request.getPhoto()));
            tender.setAadharCopy(saveFile(request.getAadharCopy()));
            tender.setPanCopy(saveFile(request.getPanCopy()));
            tender.setGstCertificate(saveFile(request.getGstCertificate()));
            tender.setLicenseCertificate(saveFile(request.getLicenseCertificate()));

            tenderRepository.save(tender);
            return "Tender Saved Successfully";

        } catch (Exception e) {
            e.printStackTrace();
            // Throwing a RuntimeException ensures the caller (Controller) can return 500
            throw new RuntimeException("Failed to save tender: " + e.getMessage());
        }
    }

    private String saveFile(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) return null;
        
        // Clean filename to prevent path traversal
        String originalFileName = file.getOriginalFilename();
        String extension = "";
        if (originalFileName != null && originalFileName.contains(".")) {
            extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        }
        
        String fileName = UUID.randomUUID().toString() + "_" + System.currentTimeMillis() + extension;
        Path filePath = Paths.get(uploadDir).resolve(fileName);
        
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        return fileName;
    }

    @Override
    public List<Tender> getAllTenders() {
        return tenderRepository.findAll();
    }

    @Override
    public Tender updateTender(Long id, Tender tender) {

        Optional<Tender> existing = tenderRepository.findById(id);

        if (existing.isPresent()) {

            Tender t = existing.get();

            t.setType(tender.getType());
            t.setFullName(tender.getFullName());
            t.setAddress(tender.getAddress());
            t.setCity(tender.getCity());
            t.setDistrict(tender.getDistrict());
            t.setState(tender.getState());
            t.setPincode(tender.getPincode());
            t.setMobile(tender.getMobile());
            t.setEmail(tender.getEmail());
            t.setLicenseNumber(tender.getLicenseNumber());  // FIXED
            t.setGstNumber(tender.getGstNumber());          // FIXED
            t.setGoodsType(tender.getGoodsType());
            t.setGoodsDemand(tender.getGoodsDemand());
            t.setSaleRate(tender.getSaleRate());
            t.setRemarks(tender.getRemarks());

            return tenderRepository.save(t);
        }

        return null;
    }

    @Override
    public void deleteTender(Long id) {
        tenderRepository.deleteById(id);
    }

    @Override
    public Tender getTenderById(Long id) {
        return tenderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tender not found"));
    }
}
