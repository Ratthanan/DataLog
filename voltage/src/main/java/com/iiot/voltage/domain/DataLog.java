package com.iiot.voltage.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import java.sql.Timestamp;
import java.util.Date;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class DataLog {

    @Id
    public ObjectId _id;
    public String PE;
    public String UID;
    public String MAC;
    public String TIM;
    public String ai0;
    public String ai1;
    public String ai2;
    public String ai3;
    public String do0;
    public String do1;
    public String msg;
    public Double createDate;

    // ObjectId needs to be converted to string
    public String get_id() { return _id.toHexString(); }
    public void set_id(ObjectId _id) { this._id = _id; }

}
