package com.iiot.voltage.service.impl;

import com.iiot.voltage.domain.DataLog;
import com.iiot.voltage.repository.DataLogRepository;
import com.iiot.voltage.service.DataLogService;
import flexjson.JSONSerializer;
import org.bson.types.ObjectId;
import org.hibernate.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Date;
import java.util.List;
import java.util.Map;

import static org.springframework.data.domain.Sort.Direction.*;

@Service("DataLogService")
public class DataLogServiceImpl  implements DataLogService {

	static final Logger LOGGER = LoggerFactory.getLogger(DataLogServiceImpl.class);

	@Autowired
	DataLogRepository dataLogRepository;

	@Autowired
	MongoTemplate mongoTemplate;

	@PersistenceContext
	private EntityManager entityManager;


	@Override
	public List<DataLog> findDataLogByCriteria(String startDate, String endDate, int firtResult, int maxResult) {
		try{
			LOGGER.info(" ### DataLogServiceImpl[findDataLogByCriteria] Data [{}, {}, {}, {}] ### ",startDate,endDate,firtResult,maxResult);
			Query query = new Query();
			if((!"".equals(startDate) && startDate != null) && (!"".equals(endDate) && endDate != null)){
                query.addCriteria(Criteria.where("createDate").gt(Double.valueOf(startDate)).lt(Double.valueOf(endDate)));
				query.with(new Sort(DESC,"createDate"));
			}
			query.skip(firtResult);
			query.limit(maxResult);
			List<DataLog> dataLogList = mongoTemplate.find(query,DataLog.class);

			return dataLogList;
		}catch (Exception e){
			LOGGER.error(" ### DataLogService[findDataLogByCriteria] Msg : Exception");
			e.printStackTrace();
			throw new RuntimeException();
		}
	}

	@Override
	public List<DataLog>  findDataLogByCriteriaSize(String startDate, String endDate) {
		try{
			LOGGER.info(" ### DataLogServiceImpl[findDataLogByCriteriaSize] Data [{}, {}] ### ",startDate,endDate);

			Query query = new Query();
			if((!"".equals(startDate) && startDate != null) && (!"".equals(endDate) && endDate != null)){
//				query.addCriteria(Criteria.where("createdDate").lte((new Date(Long.valueOf(endDate)).getTime())).gte(new Date(Long.valueOf(endDate)).getTime()));
                query.addCriteria(Criteria.where("createDate").gt(Double.valueOf(startDate)).lt(Double.valueOf(endDate)));
			}
			List<DataLog> dataLogList = mongoTemplate.find(query,DataLog.class);
			return  dataLogList;
		}catch (Exception e){
			LOGGER.error(" ### DataLogService[findDataLogByCriteriaSize] Msg : Exception");
			e.printStackTrace();
			throw new RuntimeException();
		}
	}




	@Override
	public ResponseEntity<String> findById(String id) {
		LOGGER.info(" #### In DataLogService[ findById | id = [{}] ####",id);
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Type", "application/json; charset=utf-8");
		try{
			LOGGER.info(" #### Out DataLogService[findAll] :  Msg : Success!!! ####");
			return    new ResponseEntity<String>(new JSONSerializer().deepSerialize(dataLogRepository.findBy_id(id)),headers, HttpStatus.OK)  ;
		}catch (Exception e){
			LOGGER.error(" #### Out DataLogService[findAll] :  Msg : Error!!! ####");
			e.printStackTrace();
			return    new ResponseEntity<String>(new JSONSerializer().deepSerialize("ERROR"),headers, HttpStatus.INTERNAL_SERVER_ERROR)  ;

		}
	}


	@Override
	public List<DataLog> findAll() {

		try{
			Query query = new Query();

			query.skip(1);
			query.limit(2);
			List<DataLog> dataLogList = mongoTemplate.find(query,DataLog.class);

			return dataLogList;
		}catch (Exception e){
			LOGGER.error(" ### DataLogService[findAll] Msg : Exception");
			e.printStackTrace();
			throw new RuntimeException();
		}

	}

}
