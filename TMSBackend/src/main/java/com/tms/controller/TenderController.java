package com.tms.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import com.tms.dto.TenderRequest;
import com.tms.entity.Tender;
import com.tms.service.TenderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tender")
@CrossOrigin(origins = "http://localhost:3000")
public class TenderController {

    @Autowired
    private TenderService tenderService;

    // Save Tender
    @PostMapping(value="/save", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> saveTender(@ModelAttribute TenderRequest request){
        try {
            String message = tenderService.saveTender(request);
            return ResponseEntity.ok(message);
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    // Get All
    @GetMapping("/all")
    public List<Tender> getAllTenders(){
        return tenderService.getAllTenders();
    }

    // Get Single Tender (VERY IMPORTANT FOR EDIT)
    @GetMapping("/{id}")
    public Tender getTenderById(@PathVariable Long id){
        return tenderService.getTenderById(id);
    }

    // Update
    @PutMapping("/update/{id}")
    public Tender updateTender(@PathVariable Long id,
                               @RequestBody Tender tender){
        return tenderService.updateTender(id,tender);
    }

    // Delete
    @DeleteMapping("/delete/{id}")
    public String deleteTender(@PathVariable Long id){
        tenderService.deleteTender(id);
        return "Tender Deleted Successfully";
    }
}