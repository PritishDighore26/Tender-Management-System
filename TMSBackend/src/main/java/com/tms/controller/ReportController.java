package com.tms.controller;

import com.tms.service.ReportService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/report")
public class ReportController {

    @Autowired
    private ReportService reportService;


    @GetMapping("/export")
    public void exportToExcel(HttpServletResponse response) {

        reportService.exportExcel(response);
    }
}
