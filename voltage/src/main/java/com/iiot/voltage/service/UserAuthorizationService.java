package com.iiot.voltage.service;

import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface UserAuthorizationService {

	public Object getUserDetail(String username);
	public ResponseEntity<String> save(Map parameter);
	public ResponseEntity<String> putRole(Long id, List<String> associateIdLs);
	public ResponseEntity<String> findRoleByRoleName(String roleName);
}
