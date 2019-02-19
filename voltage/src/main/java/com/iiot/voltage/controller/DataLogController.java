package com.iiot.voltage.controller;

/**
 * Created by ratthanan-w on 16/1/2562.
 */


import com.iiot.voltage.domain.DataLog;
import com.iiot.voltage.repository.DataLogRepository;
import com.iiot.voltage.service.DataLogService;
import com.iiot.voltage.util.GetValueFromExcelUtil;
import flexjson.JSONSerializer;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.security.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/dataLog")
public class DataLogController {

    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

     @Autowired
     DataLogRepository dataLogRepository;

     @Autowired
    DataLogService dataLogService;


    @GetMapping(value="/findDataLogByCriteria",produces="application/json", headers = "Accept=application/json")
    @ResponseBody
    public ResponseEntity<String>  findByCriteria(@RequestParam(value = "startDate", required = false) String startDate,
                                                  @RequestParam(value = "endDate", required = false) String endDate,
                                                  @RequestParam(value = "firstResult", required = false) int firstResult,
                                                  @RequestParam(value = "maxResult", required = false) int maxResult
                                                 ) {
        LOGGER.info(" #### DataLogController[findDataLogByCriteria] Data[ {}, {}, {}, {} ] ####  ",startDate,endDate,firstResult,maxResult);

        Map<String, Object> objectMap = new HashMap<String, Object>();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        ResponseEntity<String>  responseEntity = new ResponseEntity<String>(new JSONSerializer().deepSerialize(dataLogService.findDataLogByCriteria(startDate,endDate,firstResult,maxResult)),headers,HttpStatus.OK);
        return new ResponseEntity<String>(responseEntity.getBody(), headers, HttpStatus.OK);

    }

    @GetMapping(value="/findDataLogByCriteriaSize",produces="application/json")
    @ResponseBody
    public ResponseEntity<String>  findItemSize(@RequestParam(value = "startDate", required = false) String startDate,
                                                @RequestParam(value = "endDate", required = false) String endDate
                                               ) {
        LOGGER.info(" #### DataLogController[findDataLogByCriteriaSize] Data[ {}, {}, {}, {} ] ####  ",startDate,endDate);


        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");
        Map<String,Object> size = new HashMap<>();
        ResponseEntity<String>  responseEntity = new ResponseEntity<String>(new JSONSerializer().deepSerialize(dataLogService.findDataLogByCriteriaSize(startDate,endDate).size()),headers,HttpStatus.OK);
        size.put("size",responseEntity.getBody());
        return new ResponseEntity<String>(new JSONSerializer().deepSerialize(size), headers, HttpStatus.OK);
    }






    @GetMapping( "/findAll")
    public ResponseEntity<String> findAll() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");

        return new ResponseEntity<String>(new JSONSerializer().deepSerialize(dataLogRepository.findAll()),headers,HttpStatus.OK);
    }

    @GetMapping( "/findById")
    public ResponseEntity<String> findById(@RequestParam(value = "id" , required = true)String id) {
        LOGGER.info("#### IN dataLogController[ findById ==> id : [{}]   ] ####",id);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");

        try {
            headers.add("statusValidate","1");
            LOGGER.info("#### OUT dataLogController[ findById ] Success ####",id);
            return new ResponseEntity<String>(new JSONSerializer().deepSerialize(dataLogRepository.findBy_id(id)),headers,HttpStatus.OK);

        }catch (Exception e){
            headers.add("statusValidate","-1");
            LOGGER.error("#### OUT dataLogController[ findById ] Error ####",id);
            e.printStackTrace();
            return new ResponseEntity<String>(new JSONSerializer().deepSerialize(""),headers,HttpStatus.OK);

        }

    }


    @GetMapping( "/findByTIMBetween")
    public ResponseEntity<String> findByTIMBetween(@RequestParam(value = "start")String start,@RequestParam(value = "end")String end) {
        LOGGER.info("#### IN dataLogController[ findByTIMBetween | start : [{}], end : [{}]  ] ####",start,end);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");

        try {
            headers.add("statusValidate","1");
            LOGGER.info("#### OUT dataLogController[ findByTIMBetween ] Success ####");
            return new ResponseEntity<String>(new JSONSerializer().deepSerialize(dataLogRepository.findByTIMBetween(start, end)),headers,HttpStatus.OK);

        }catch (Exception e){
            headers.add("statusValidate","-1");
            LOGGER.error("#### OUT dataLogController[ findByTIMBetween ] Error ####");
            e.printStackTrace();
            return new ResponseEntity<String>(new JSONSerializer().deepSerialize(""),headers,HttpStatus.OK);

        }

    }






    @RequestMapping(value = "/downloadHistory", method = RequestMethod.GET)
    public void downloadTemplatExcel(@RequestParam("startDate")String startDate,@RequestParam("endDate")String endDate,      HttpServletResponse response) throws IOException {


        HttpHeaders headers = new HttpHeaders();
        response.setHeader("Content-disposition", "attachment; filename=VoltageHistory.xlsx");
        headers.add("Content-Type","application/vnd.ms-excel;charset=utf-8");
        try {

            Workbook workbook = new XSSFWorkbook();
            Sheet sheet = workbook.createSheet("History");
            CreationHelper createHelper = workbook.getCreationHelper();
            Font headerFont = workbook.createFont();
            headerFont.setFontHeightInPoints((short) 14);
            headerFont.setColor(IndexedColors.RED.getIndex());

            List<DataLog> logLst =  dataLogService.findDataLogByCriteriaSize(startDate,endDate);

            Row headerColumn_0 = sheet.createRow(0);
            Cell cellHeaderColumn_0 = headerColumn_0.createCell(0);
            cellHeaderColumn_0.setCellValue("Device");

            Row headerColumn_1 = sheet.createRow(0);
            Cell cellHeaderColumn_1 = headerColumn_1.createCell(0);
            cellHeaderColumn_1.setCellValue("Device Name");

            if(logLst.size() > 0){
                    for(int i =0; i<logLst.size(); i++){

                        Row colume0 = sheet.createRow(i+1);
                        Cell cell = colume0.createCell(0);
                        String device = logLst.get(i).getUID();
                        cell.setCellValue(device);

                        Cell cell_1 = colume0.createCell(0+1);
                        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
                        BigDecimal bigDecimal  = new BigDecimal(String.valueOf(logLst.get(i).getCreateDate()));
//                        Double numConvert = Double.parseDouble(bigDecimal.toString());
//                        String myDateStr = new SimpleDateFormat("dd-MM-yyyy").format(Long.valueOf(numConvert.toString()));
//                        cell_1.setCellValue(myDateStr);

                    }




            }


            sheet.autoSizeColumn(0);
            sheet.autoSizeColumn(1);
            sheet.autoSizeColumn(2);
            sheet.autoSizeColumn(3);
            sheet.autoSizeColumn(4);

            workbook.write(response.getOutputStream());
        } catch (IOException ex) {
            throw new RuntimeException("### IOError writing file to output stream ###");
        }

    }


    @GetMapping("/history")
    public String indexPage(){

        return "history";
    }


    @GetMapping("/generateExcel")
    public String generateExcel(){

        return "excelReport";
    }


    @GetMapping("/monitoring")
    public String monitoring(){

        return "grafanaDashboard";
    }



}
