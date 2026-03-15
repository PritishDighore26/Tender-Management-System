package com.tms.service.impl;


import com.tms.entity.Tender;
import com.tms.repository.TenderRepository;
import com.tms.service.ReportService;
import com.tms.util.ExcelExporter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletResponse;

import java.util.List;

@Service
public class ReportServiceImpl implements ReportService {

    @Autowired
    private TenderRepository tenderRepository;

    @Override
    public void exportExcel(HttpServletResponse response) {

    	try {

            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

            response.setHeader("Content-Disposition",
                    "attachment; filename=tenders.xlsx");

            List<Tender> tenders = tenderRepository.findAll();

            ExcelExporter exporter = new ExcelExporter(tenders);

            exporter.export(response);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
