package com.tms.util;

import com.tms.entity.Tender;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;

import java.util.List;

public class ExcelExporter {

    private List<Tender> tenderList;

    public ExcelExporter(List<Tender> tenderList) {
        this.tenderList = tenderList;
    }

    public void export(HttpServletResponse response) throws Exception {

        // Set correct response headers
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=tenders.xlsx");

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Tender Report");

        // Create header row
        Row headerRow = sheet.createRow(0);

        headerRow.createCell(0).setCellValue("ID");
        headerRow.createCell(1).setCellValue("Full Name");
        headerRow.createCell(2).setCellValue("Mobile");
        headerRow.createCell(3).setCellValue("Email");
        headerRow.createCell(4).setCellValue("Goods Type");

        int rowCount = 1;

        // Fill data rows
        for (Tender tender : tenderList) {

            Row row = sheet.createRow(rowCount++);

            row.createCell(0).setCellValue(tender.getId());
            row.createCell(1).setCellValue(tender.getFullName());
            row.createCell(2).setCellValue(tender.getMobile());
            row.createCell(3).setCellValue(tender.getEmail());
            row.createCell(4).setCellValue(tender.getGoodsType());
        }

        // Auto size columns (optional but nice)
        for (int i = 0; i < 5; i++) {
            sheet.autoSizeColumn(i);
        }

        // Write to response output stream
        ServletOutputStream outputStream = response.getOutputStream();

        workbook.write(outputStream);
        workbook.close();

        outputStream.flush();
        outputStream.close();
    }
}