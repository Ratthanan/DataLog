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


    public String getPE() {
        return PE;
    }

    public void setPE(String PE) {
        this.PE = PE;
    }

    public String getUID() {
        return UID;
    }

    public void setUID(String UID) {
        this.UID = UID;
    }

    public String getMAC() {
        return MAC;
    }

    public void setMAC(String MAC) {
        this.MAC = MAC;
    }

    public String getTIM() {
        return TIM;
    }

    public void setTIM(String TIM) {
        this.TIM = TIM;
    }

    public String getAi0() {
        return ai0;
    }

    public void setAi0(String ai0) {
        this.ai0 = ai0;
    }

    public String getAi1() {
        return ai1;
    }

    public void setAi1(String ai1) {
        this.ai1 = ai1;
    }

    public String getAi2() {
        return ai2;
    }

    public void setAi2(String ai2) {
        this.ai2 = ai2;
    }

    public String getAi3() {
        return ai3;
    }

    public void setAi3(String ai3) {
        this.ai3 = ai3;
    }

    public String getDo0() {
        return do0;
    }

    public void setDo0(String do0) {
        this.do0 = do0;
    }

    public String getDo1() {
        return do1;
    }

    public void setDo1(String do1) {
        this.do1 = do1;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }


    public Double getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Double createDate) {
        this.createDate = createDate;
    }
}
