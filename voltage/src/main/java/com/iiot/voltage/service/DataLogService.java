package com.iiot.voltage.service;

import com.iiot.voltage.domain.DataLog;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface DataLogService {

    public List<DataLog> findDataLogByCriteria(String startDate, String endDate, int firtResult,int maxResult);
    public Long findDataLogByCriteriaSize(String startDate, String endDate);
    public List<DataLog> findAll();
    public ResponseEntity<String> findById(String id);
}
