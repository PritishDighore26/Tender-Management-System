package com.tms.service;

import com.tms.dto.TenderRequest;
import com.tms.entity.Tender;

import java.util.List;

public interface TenderService {

	String saveTender(TenderRequest request);

    List<Tender> getAllTenders();

    Tender getTenderById(Long id); 
    Tender updateTender(Long id, Tender tender);

    void deleteTender(Long id);
}
