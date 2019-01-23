package com.iiot.voltage.controller;

/**
 * Created by ratthanan-w on 16/1/2562.
 */


import com.iiot.voltage.domain.DataLog;
import com.iiot.voltage.repository.DataLogRepository;
import com.iiot.voltage.service.DataLogService;
import flexjson.JSONSerializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
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
        ResponseEntity<String>  responseEntity = new ResponseEntity<String>(new JSONSerializer().deepSerialize(dataLogService.findDataLogByCriteriaSize(startDate,endDate)),headers,HttpStatus.OK);
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


    @GetMapping("/index")
    public String indexPage(){

        return "index";
    }



}
