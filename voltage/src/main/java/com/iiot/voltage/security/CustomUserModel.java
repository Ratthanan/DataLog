package com.iiot.voltage.security;

import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;


@Component
@Scope(value = "session",proxyMode = ScopedProxyMode.TARGET_CLASS)
public class CustomUserModel {
	public static final String ATTR_CUSTOM_USER = "CUSTOM_USER";
	public static final String ATTR_CUSTOM_USER_NAME = "CUSTOM_USER_NAME";

	private Map<String,Object> mapObject = new HashMap<String,Object>();

    public void setValue(HashMap<String, Object> val) {
        this.mapObject = val;
    }
    public void addValue(String key, Object value) {
        this.mapObject.put(key, value);
    }
    public Map getValue() {
        return this.mapObject;
    }
    public Object getValue(String key) {
        return this.mapObject.get(key);
    }
}
