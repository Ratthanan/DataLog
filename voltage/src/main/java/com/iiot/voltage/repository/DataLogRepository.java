package com.iiot.voltage.repository;

import com.iiot.voltage.domain.DataLog;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import java.util.List;
import java.util.Optional;


public interface DataLogRepository extends MongoRepository<DataLog, String> {

    DataLog findBy_id(String _id);
    List<DataLog> findByTIMBetween(String start, String end);


}
