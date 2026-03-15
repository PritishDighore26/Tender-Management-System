package com.tms.service;

import jakarta.servlet.http.HttpServletResponse;

public interface ReportService {

    void exportExcel(HttpServletResponse response);
}
